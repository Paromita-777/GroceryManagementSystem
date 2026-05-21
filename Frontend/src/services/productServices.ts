
import api from "../api/axios";
import type { Product } from "../types/Product";

// get all products
export const getProducts = async () =>{
  const response = await api.get ("/products")
  return response.data;
}

// create products
export const addProduct = async (product: Product) =>{
  const response = await api.post ("/products", product)
  return response.data
}

// UPDATE product
export const updateProduct = async (sku: string, product: any) => {
  const res = await api.put(`/products/${sku}`, product);
  return res.data;
};

// DELETE product
export const deleteProduct = async (sku: string) =>{
  const response = await api.delete (`/products/${sku}`)
  return response.data
}