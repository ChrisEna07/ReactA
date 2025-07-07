// Dashboard completo con diseño estético y funcionalidades completas
import React, { useState, useEffect } from 'react';
import '../../../shared/styles/Dashboard.css';
import Modal from 'react-modal';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../services/productApi';

Modal.setAppElement('#root');

const FAKESTORE_API = "https://fakestoreapi.com/products";

const Dashboard = () => {
  // Estados principales
  const [products, setProducts] = useState([]);
  const [fakeStoreProducts, setFakeStoreProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all', 'search', 'deleted'
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Estadísticas
  const [stats, setStats] = useState({
    totalVentas: 35130,
    productosVendidos: 3,
    errores: 0,
    visitas: 1307,
    clientes: 34
  });

  // Modales
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        const localProducts = await fetchProducts();
        setProducts(localProducts);
        
        const fakeStoreResponse = await fetch(FAKESTORE_API);
        const fakeStoreData = await fakeStoreResponse.json();
        setFakeStoreProducts(fakeStoreData);
      } catch (error) {
        console.error("Error loading data:", error);
        setStats(prev => ({...prev, errores: prev.errores + 1}));
      }
    };
    
    loadData();
  }, []);

  // Funciones de manejo de productos
  const handleCreate = async () => {
    if (!form.name || !form.price || !form.image) {
      setAlert('Todos los campos son obligatorios');
      return;
    }
    try {
      const newProduct = await createProduct(form);
      setProducts(prev => [...prev, newProduct]);
      setForm({ name: '', price: '', image: '' });
      setShowCreateModal(false);
      setAlert('Producto creado exitosamente');
    } catch (err) {
      setAlert('Error al crear producto');
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setCurrentProduct(product);
    setForm({ name: product.name || product.title || '', price: product.price, image: product.image || '' });
    setShowEditModal(true);
    setAlert('');
  };

  const handleUpdate = async () => {
    if (!form.name || !form.price || !form.image) {
      setAlert('Todos los campos son obligatorios');
      return;
    }
    try {
      const updated = await updateProduct(editingId, form);
      setProducts(prev => prev.map(p => p.id === editingId ? updated : p));
      setEditingId(null);
      setForm({ name: '', price: '', image: '' });
      setShowEditModal(false);
      setAlert('Producto actualizado');
    } catch (err) {
      setAlert('Error al actualizar producto');
    }
  };

  const handleDelete = (product) => {
    setCurrentProduct(product);
    setConfirmDelete({ show: true, id: product.id });
  };

  const confirmDeleteAction = async () => {
    try {
      const product = products.find(p => p.id === confirmDelete.id);
      await deleteProduct(confirmDelete.id);
      setProducts(prev => prev.filter(p => p.id !== confirmDelete.id));
      setDeletedProducts(prev => [...prev, product]);
      setAlert('Producto eliminado');
    } catch (err) {
      setAlert('Error al eliminar producto');
    }
    setConfirmDelete({ show: false, id: null });
  };

  const restoreProduct = (product) => {
    setProducts(prev => [...prev, product]);
    setDeletedProducts(prev => prev.filter(p => p.id !== product.id));
    setAlert('Producto restaurado');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  // Combinar y filtrar productos
  const allProducts = [
    ...products.map(p => ({ ...p, source: 'local' })),
    ...fakeStoreProducts.map(p => ({ ...p, source: 'fakeStore' }))
  ];

  let displayedProducts = [];
  if (viewMode === 'deleted') {
    displayedProducts = deletedProducts;
  } else {
    displayedProducts = allProducts.filter(product => 
      (viewMode !== 'search' || 
      (product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
       product.name?.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }

  // Paginación
  const productsPerPage = 5;
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const currentProducts = displayedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h3>Menú Admin</h3>
        <button onClick={() => window.location.href = "/"}>Volver al inicio</button>
        <button onClick={() => setAlert('¡Función de reporte próximamente!')}>Reportes</button>
        <button onClick={() => setAlert('¡Función de configuración próximamente!')}>Configuración</button>
        <button onClick={() => setShowCreateModal(true)}>Crear Producto</button>
        <button 
          onClick={() => {
            setViewMode(viewMode === 'search' ? 'all' : 'search');
            setSearchTerm('');
            setCurrentPage(1);
          }}
        >
          {viewMode === 'search' ? 'Ver todos' : 'Buscar'}
        </button>
        <button 
          onClick={() => {
            setViewMode(viewMode === 'deleted' ? 'all' : 'deleted');
            setCurrentPage(1);
          }}
        >
          {viewMode === 'deleted' ? 'Ver todos' : 'Objetos eliminados'}
        </button>
      </aside>

      <div className="main">
        <h2>Dashboard de Productos</h2>
        
        {/* Estadísticas */}
        <div className="stats">
          <div><strong>Ventas simuladas:</strong> ${stats.totalVentas}</div>
          <div><strong>Productos vendidos:</strong> {stats.productosVendidos}</div>
          <div><strong>Errores:</strong> {stats.errores}</div>
          <div><strong>Visitas:</strong> {stats.visitas}</div>
          <div><strong>Clientes:</strong> {stats.clientes}</div>
        </div>

        {/* Barra de búsqueda */}
        {viewMode === 'search' && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        )}

        {/* Mensaje de alerta */}
        {alert && <div className="alert">{alert}</div>}

        {/* Lista de productos */}
        <div className="products">
          {viewMode === 'deleted' && deletedProducts.length === 0 ? (
            <p>No hay productos eliminados</p>
          ) : currentProducts.length === 0 ? (
            <p>No se encontraron productos</p>
          ) : (
            currentProducts.map(p => (
              <div key={`${p.id}-${p.source}`} className="product-card">
                {p.image && <img src={p.image} alt={p.name || p.title} />}
                <h4>{p.name || p.title}</h4>
                <p>${p.price}</p>
                
                {/* Botones de acción según el modo */}
                {viewMode !== 'deleted' && p.source === 'local' && (
                  <div className="product-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEdit(p)}
                    >
                      Editar
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDelete(p)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
                
                {viewMode === 'deleted' && p.source === 'local' && (
                  <button 
                    className="restore-btn"
                    onClick={() => restoreProduct(p)}
                  >
                    Restaurar
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal para crear producto */}
      <Modal
        isOpen={showCreateModal}
        onRequestClose={() => setShowCreateModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Crear Nuevo Producto</h3>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio:</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        {form.image && (
          <img 
            src={form.image} 
            alt="Preview" 
            className="image-preview"
            style={{
              maxWidth: '100%',
              maxHeight: '200px',
              display: 'block',
              margin: '10px auto',
              objectFit: 'contain'
            }}
          />
        )}
        <div className="modal-buttons">
          <button onClick={handleCreate}>Crear Producto</button>
          <button onClick={() => setShowCreateModal(false)}>Cancelar</button>
        </div>
      </Modal>

      {/* Modal de edición */}
      <Modal
        isOpen={showEditModal}
        onRequestClose={() => setShowEditModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Editar Producto</h3>
        {currentProduct && (
          <>
            <div className="form-group">
              <label>Nombre:</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Imagen:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            {form.image && (
              <img 
                src={form.image} 
                alt="Preview" 
                className="image-preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  display: 'block',
                  margin: '10px auto',
                  objectFit: 'contain'
                }}
              />
            )}
            <div className="modal-buttons">
              <button onClick={handleUpdate}>Guardar Cambios</button>
              <button onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </>
        )}
      </Modal>

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={confirmDelete.show}
        onRequestClose={() => setConfirmDelete({ show: false, id: null })}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h3>Confirmar Eliminación</h3>
        {currentProduct && (
          <>
            <p>¿Estás seguro que deseas eliminar el producto "{currentProduct.name || currentProduct.title}"?</p>
            <div className="modal-buttons">
              <button onClick={confirmDeleteAction} className="danger">Eliminar</button>
              <button onClick={() => setConfirmDelete({ show: false, id: null })}>Cancelar</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;