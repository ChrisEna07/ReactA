const API_URL = "http://localhost:3001/products"; // Cambia la URL según tu backend

export const fetchProducts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error("Error al crear producto:", error);
    throw new Error(error);
  }
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};