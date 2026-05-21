import { useEffect, useState } from "react";
import {
  getProducts,
  deleteProduct,
  addProduct,
  updateProduct
} from "../services/productServices";

import ProductModal from "../components/ProductModal";
import Toast from "../components/Toast";

interface Product {
  sku: string;
  name: string;
  price: number;
  quantity?: number;
}

export default function Products() {

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [view, setView] = useState<"table" | "card">("table");
  const [toast, setToast] = useState<string>("");

  // GET PRODUCTS
  const fetchProducts = async () => {
    const res = await getProducts();
     console.log("PRODUCT API RESPONSE:", res);
     setProducts(res?.data || res || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE
  const handleDelete = async (sku: string) => {
    await deleteProduct(sku);
    setToast("Product deleted successfully");
    fetchProducts();
  };

  // ADD / UPDATE
  const handleSave = async (product: Product) => {

    if (editProduct) {
      await updateProduct(product.sku, product);
      setToast("Product updated successfully");
    } else {
      await addProduct(product);
      setToast("Product added successfully");
    }

    setShowModal(false);
    setEditProduct(null);
    fetchProducts();
  };

  // SEARCH FILTER
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      {/* TOP BAR */}
      <div className="d-flex justify-content-between mb-3">

        <input
          className="form-control w-25"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="d-flex gap-2">

          <button
            className="btn btn-outline-dark"
            onClick={() => setView(view === "table" ? "card" : "table")}
          >
            Toggle View
          </button>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditProduct(null);
              setShowModal(true);
            }}
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* TOAST */}
      {toast && <Toast message={toast} type="success" />}

      {/* TABLE VIEW */}
      {view === "table" ? (
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>SKU</th>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(p => (
              <tr key={p.sku}>
                <td>{p.sku}</td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.quantity ?? "-"}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => {
                      setEditProduct(p);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.sku)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="row">
          {filtered.map(p => (
            <div className="col-md-4" key={p.sku}>
              <div className="card p-3 shadow-sm">
                <h5>{p.name}</h5>
                <p>${p.price}</p>
                <p>Qty: {p.quantity ?? "-"}</p>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setEditProduct(p);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.sku)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <ProductModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editProduct={editProduct}
      />

    </div>
  );
}