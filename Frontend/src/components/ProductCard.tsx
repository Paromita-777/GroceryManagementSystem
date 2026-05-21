interface Product {
  sku: string;
  name: string;
  price: number;
  quantity?: number;
}

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (sku: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="card shadow-sm mb-3 border-0">

      <div className="card-body">

        {/* Product Name */}
        <h5 className="card-title">{product.name}</h5>

        {/* SKU */}
        <p className="text-muted mb-1">
          SKU: {product.sku}
        </p>

        {/* Price */}
        <h6 className="text-success">
          ${product.price}
        </h6>

        {/* Stock */}
        <p>
          Stock: {product.quantity ?? "-"}
        </p>

        {/* Buttons */}
        <div className="d-flex gap-2">

          <button
            className="btn btn-warning btn-sm"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(product.sku)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}