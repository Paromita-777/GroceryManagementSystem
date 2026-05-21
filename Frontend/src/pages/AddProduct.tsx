import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../services/productServices";

export default function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await addProduct({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });

      alert("Product added successfully");

      navigate("/products");

    } catch (error) {

      console.error(error);
      alert("Failed to add product");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          className="form-control mb-3"
          value={product.sku}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="form-control mb-3"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="form-control mb-3"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          className="form-control mb-3"
          value={product.quantity}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>

      </form>
    </div>
  );
}