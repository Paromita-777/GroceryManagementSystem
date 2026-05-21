interface Props {
  message: string;
  type: "success" | "error";
}

export default function Toast({ message, type }: Props) {
  return (
    <div className={`alert alert-${type === "success" ? "success" : "danger"}`}>
      {message}
    </div>
  );
}