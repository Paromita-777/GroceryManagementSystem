import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProducts,
  updateProduct
} from "../services/productServices";

export default function EditProduct() {

  const { sku } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    sku: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const res = await getProducts();

        const found = (res?.data || []).find(
          (p: any) => p.sku === sku
        );

        if (found) {
          setProduct(found);
        }

      } catch (error) {

        console.error(error);
      }
    };

    fetchProduct();

  }, [sku]);

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

      await updateProduct(product.sku, {
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity),
      });

      alert("Product updated successfully");

      navigate("/products");

    } catch (error) {

      console.error(error);
      alert("Failed to update product");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="sku"
          className="form-control mb-3"
          value={product.sku}
          disabled
        />

        <input
          type="text"
          name="name"
          className="form-control mb-3"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="quantity"
          className="form-control mb-3"
          value={product.quantity}
          onChange={handleChange}
        />

        <button
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>

      </form>
    </div>
  );
}