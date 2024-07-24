'use client'

import { useEffect, useState } from "react";
import React from "react";
import { Products } from "../../../types/product";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Products | null;
  editProduct: (id: string, updatedProduct: Products) => void
}

const Modal: React.FC<modalProps> = ({ isOpen, onClose, product, editProduct }) => {
  const [formData, setFormData] = useState<Products>({
    id: "",
    title: "",
    price: 0,
    description: "",
    image: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'price') {
      setFormData(prevstate => ({
        ...prevstate,
        [name]: Number(value)
      }))
    } else {
      setFormData(prevstate => ({
        ...prevstate,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(!product) return
    editProduct(product.id, formData)
    onClose()
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-sm:p-4">
      <div className="bg-white p-6 rounded shadow-lg w-full pl-1.5 mb-3 max-w-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Edit Product
        </h2>
        <form onSubmit={handleSubmit}>
        {product ? (
          <div className="text-gray-600 text-lg">
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <p>Image: {product.image}</p>
          </div>
        ) : null}
        <div className="mt-4">
          <div>
              <label className="block mb-1">Title: </label>
              <input
                name="title"
                type="text"
                onChange={handleChange}
                value={formData.title}
                className="border border-gray-400 focus:border-blue-500 hover:outline-none outline-none w-full pl-1.5 mb-3"
              />
              <label className="block mb-1">Price: </label>
              <input
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                className="border border-gray-400 focus:border-blue-500 hover:outline-none outline-none w-full pl-1.5 mb-3"
              />
              <label className="block mb-1">Description: </label>
              <input
                name="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                className="border border-gray-400 focus:border-blue-500 hover:outline-none outline-none w-full pl-1.5 mb-3"
              />
              <label className="block mb-1">Image: </label>
              <input
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                className="border border-gray-400 focus:border-blue-500 hover:outline-none outline-none w-full pl-1.5 mb-3"
                />
          </div>
          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded"
              >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              >
              Update
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
