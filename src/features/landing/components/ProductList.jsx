import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../../shared/styles/ProductList.css";

// Simple estilos para modal
const modalStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000
};
const modalContentStyle = {
  background: "#fff",
  borderRadius: 8,
  padding: 24,
  minWidth: 320,
  maxWidth: 400,
  boxShadow: "0 2px 16px #0002"
};

const ProductList = ({ products = [], dispatch = () => {}, cart = [], onProductsChange }) => {
  // Obtener si el usuario es admin desde Redux
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Estado local para la lista de productos administrados (solo para admins)
  const [adminProducts, setAdminProducts] = useState(() => {
    // Si hay productos en localStorage, úsalos; si no, usa los pasados por props
    const stored = JSON.parse(localStorage.getItem("products"));
    return stored && Array.isArray(stored) && stored.length > 0 ? stored : products;
  });

  // Estados para el formulario de producto (solo admin)
  const [form, setForm] = useState({ title: "", price: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState("");
  // Estado para mostrar/ocultar modal de edición o creación
  const [showEditModal, setShowEditModal] = useState(false);
  // Estado para mostrar/ocultar confirmación de eliminación
  const [deleteId, setDeleteId] = useState(null);

  // Crear o actualizar producto (modal)
  // Si editingId existe, actualiza; si no, crea uno nuevo
  const handleSave = () => {
    if (!form.title || !form.price || !form.image) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    let updatedProducts;
    if (editingId) {
      // Editar producto existente
      updatedProducts = adminProducts.map(p =>
        p.id === editingId ? { ...p, ...form } : p
      );
      setAlert("Producto actualizado");
    } else {
      // Crear nuevo producto
      const newProduct = {
        ...form,
        id: Date.now(),
      };
      updatedProducts = [...adminProducts, newProduct];
      setAlert("Producto creado exitosamente");
    }
    setAdminProducts(updatedProducts);
    setForm({ title: "", price: "", image: "" });
    setEditingId(null);
    setShowEditModal(false);
    if (onProductsChange) onProductsChange(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Preparar formulario para editar y mostrar modal
  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({ title: product.title, price: product.price, image: product.image });
    setShowEditModal(true);
    setAlert("");
  };

  // Mostrar modal para crear producto
  const handleShowCreate = () => {
    setEditingId(null);
    setForm({ title: "", price: "", image: "" });
    setShowEditModal(true);
    setAlert("");
  };

  // Eliminar producto tras confirmación
  const handleDelete = (id) => {
    setDeleteId(id); // Muestra el modal de confirmación
  };

  // Confirmar eliminación
  const confirmDelete = () => {
    const updatedProducts = adminProducts.filter(p => p.id !== deleteId);
    setAdminProducts(updatedProducts);
    if (onProductsChange) onProductsChange(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setAlert("Producto eliminado");
    setForm({ title: "", price: "", image: "" });
    setEditingId(null);
    setDeleteId(null); // Cierra el modal de confirmación
  };

  // Cancelar edición o eliminación
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", price: "", image: "" });
    setShowEditModal(false);
    setAlert("");
  };
  const handleCancelDelete = () => setDeleteId(null);

  // Manejar carga de imagen desde archivo local y convertir a base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Mostrar productos: si es admin, muestra adminProducts, si no, muestra los de props
  const productsToShow = isAdmin ? adminProducts : products;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Menú vertical izquierdo para admin */}
      {isAdmin && (
        <aside style={{
          width: 220,
          background: "#f3f3f3",
          padding: 24,
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: "100vh"
        }}>
          <h3 style={{ textAlign: "center", marginBottom: 24 }}>Menú Admin</h3>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <button
              style={{
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                padding: "0.5rem 1rem",
                cursor: "pointer",
                width: "100%",
                marginBottom: 8
              }}
            >
              Ir al Dashboard
            </button>
          </Link>
          {/* Botón para mostrar el modal de crear producto */}
          <button
            style={{
              background: "#43a047",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "0.5rem 1rem",
              cursor: "pointer",
              width: "100%"
            }}
            onClick={handleShowCreate}
          >
            Crear nuevo producto
          </button>
        </aside>
      )}

      {/* Contenido principal */}
      <section id="productos" className="product-list" style={{ flex: 1, padding: 24 }}>
        <h2 style={{ textAlign: "center" }}>Productos</h2>

        {/* Modal de creación/edición de producto */}
        {showEditModal && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h3>{editingId ? "Editar producto" : "Crear nuevo producto"}</h3>
              <input
                type="text"
                placeholder="Nombre"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
              />
              <input
                type="number"
                placeholder="Precio"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
              />
              {/* Campo para subir imagen desde archivo */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {/* Vista previa de la imagen seleccionada */}
              {form.image && (
                <img src={form.image} alt="Vista previa" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 4 }} />
              )}
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button onClick={handleSave}>
                  {editingId ? "Actualizar" : "Crear"}
                </button>
                <button onClick={handleCancelEdit}>
                  Cancelar
                </button>
              </div>
              {alert && <div className="alert">{alert}</div>}
            </div>
          </div>
        )}

        {/* Modal de confirmación de eliminación */}
        {deleteId && (
          <div style={modalStyle}>
            <div style={modalContentStyle}>
              <h3>¿Eliminar producto?</h3>
              <p>¿Estás seguro de que deseas eliminar este producto?</p>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button style={{ background: "#e53935", color: "#fff" }} onClick={confirmDelete}>Eliminar</button>
                <button onClick={handleCancelDelete}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de productos */}
        <div className="products-grid">
          {productsToShow.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const qty = cartItem ? cartItem.qty : 0;
            return (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <div className="price">${product.price}</div>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() =>
                      qty > 0
                        ? dispatch({ type: "DECREMENT_QTY", payload: product.id })
                        : null
                    }
                    disabled={qty === 0}
                  >
                    -
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() =>
                      qty > 0
                        ? dispatch({ type: "INCREMENT_QTY", payload: product.id })
                        : dispatch({ type: "ADD_TO_CART", payload: product })
                    }
                  >
                    +
                  </button>
                </div>
                <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
                  Agregar al carrito
                </button>
                {/* Botones de editar/eliminar solo para admin */}
                {isAdmin && (
                  <div className="admin-actions">
                    <button onClick={() => handleEdit(product)}>Editar</button>
                    <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductList;

