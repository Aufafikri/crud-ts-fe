"use client";

import React, { useState } from "react";
import { Products } from "../../types/product"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { TrashSimple, PencilSimpleLine } from "@phosphor-icons/react";
import { Toaster } from "react-hot-toast";
import EditModal from "@/components/Popups/EditModal";
import CreateModal from "@/components/Popups/CreateModal"
import { useFetchProducts, useCreateProduct, useDeleteProduct, useEditProduct } from "@/features";

const page = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false)
  const [selectedProducts, setSelectedProducts] = useState<Products | null>(null)

  const { data } = useFetchProducts()
  const {mutate: deleteProduct} = useDeleteProduct()
  const {mutate: editProduct} = useEditProduct()

  const { mutate } = useCreateProduct()

  const handleEdit = (product: Products) => {
    setSelectedProducts(product)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedProducts(null)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
  }

  const createProduct = () => {
    setCreateModalOpen(true)
  }

  const handleEditProduct = (id: string, updatedProduct: Products) => {
    editProduct({ id, updatedProduct })
  }
  console.log(data);
  return (
    <div className="min-h-screen">
      <h1 className="text-center text-3xl font-semibold my-4">
        Fullstack Crud Tanstack Query Prisma
      </h1>
      <div className="flex justify-center items-center">
        <Card className="w-[700px] max-sm:w-[350px]">
          <Table className="text-center ">
            <TableHeader className="w-full">
              <TableRow className="">
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Price</TableHead>
                <TableHead className="text-center">Description</TableHead>
                <TableHead className="text-center">Image</TableHead>
                <TableHead className="text-center w-[120px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((product: Products) => {
                return (
                  <TableRow key={product.id}>
                      <TableCell> {product.title} </TableCell>
                      <TableCell> {product.price} </TableCell>
                      <TableCell> {product.description} </TableCell>
                      <TableCell> {product.image} </TableCell>
                      <TableCell className="flex gap-4 items-center justify-center">
                        <button onClick={() => handleEdit(product)}>
                          <PencilSimpleLine
                            size={24}
                            color="#21810e"
                            weight="fill"
                            />
                        </button>
                        <button onClick={() => deleteProduct(product.id)}>
                          <TrashSimple
                            size={24}
                            color="#b30000"
                            weight="fill"
                            />
                          <Toaster />
                        </button>
                      </TableCell>
                    </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
        <EditModal isOpen={modalOpen} onClose={closeModal} product={selectedProducts} editProduct={handleEditProduct} />
        <CreateModal CreateisOpen={createModalOpen} CreateonClose={closeCreateModal} /> 
      </div>
        <div className="flex justify-center items-center mt-3">
          <button onClick={() => createProduct()} className="py-2 px-4 bg-blue-500 text-white rounded-md"> Tambah Data </button>
        </div>
    </div>
  );
};

export default page;
