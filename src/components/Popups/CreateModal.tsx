"use client";

import React, { useState } from "react";
import { Products } from "../../../types/product";
import { useCreateProduct } from "@/features/product/useCreateProduct";

interface modalProps {
  CreateisOpen: boolean;
  CreateonClose: () => void;
}

const CreateModal: React.FC<modalProps> = ({ CreateisOpen, CreateonClose }) => {
  const [formData, setFormData] = useState<Products>({
    id: "",
    price: 0,
    title: "",
    description: "",
    image: "",
  });

  const { mutate } = useCreateProduct()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await mutate(formData)
    console.log(response)
  }

  if (!CreateisOpen) return null;
  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 max-sm:p-4">
        <div className="bg-white p-6 rounded shadow-lg w-full pl-1.5 mb-3 max-w-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Create Products
          </h2>
          <div>
            <label className="block mb-2">Title :</label>
            <input
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              type="text"
              className="border w-full mb-2 p-1 focus:outline-blue-500 border-gray-500"
            />
            <label className="block mb-2">Price :</label>
            <input
              value={formData.price}
              onChange={(event) => setFormData({ ...formData, price: parseInt(event.target.value) })}
              type="text"
              className="border w-full mb-2 p-1 focus:outline-blue-500 border-gray-500"
            />
            <label className="block mb-2">Description :</label>
            <input
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              type="text"
              className="border w-full mb-2 p-1 focus:outline-blue-500 border-gray-500"
            />
            <label className="block mb-2">Image :</label>
            <input
              value={formData.image}
              onChange={(event) => setFormData({ ...formData, image: event.target.value })}
              type="text"
              className="border w-full mb-2 p-1 focus:outline-blue-500 border-gray-500"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-red-500 px-4 py-2 rounded-md text-white"
              onClick={CreateonClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
            >
              Create
            </button>
          </div>
      </form>
        </div>
    </div>
  );
};

export default CreateModal;
