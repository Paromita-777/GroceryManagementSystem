import { useState, useEffect } from "react";

interface Product {
  sku: string;
  name: string;
  price: number;
  quantity?: number;
}

interface Props {
  show: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  editProduct?: Product | null;
}

export default function ProductModal({
  show,
  onClose,
  onSave,
  editProduct
}: Props) {

  const [form, setForm] = useState<Product>({
    sku: "",
    name: "",
    price: 0,
    quantity: 0
  });

  useEffect(() => {
    if (editProduct) {
      setForm(editProduct);
    } else {
      setForm({ sku: "", name: "", price: 0, quantity: 0 });
    }
  }, [editProduct]);

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content p-3">

          <h4>{editProduct ? "Edit Product" : "Add Product"}</h4>

          <input
            className="form-control mb-2"
            placeholder="SKU"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: +e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
          />

          <div className="d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-success"
              onClick={() => onSave(form)}
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}