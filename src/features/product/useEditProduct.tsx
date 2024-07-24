import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../../../types/product"
import toast, { Toaster } from "react-hot-toast"

interface EditProductParams {
    id: string,
    updatedProduct: Products
}

export const useEditProduct = () => {
    return useMutation({
        mutationFn: async ({ id, updatedProduct }: EditProductParams) => {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${id}`, updatedProduct)
            console.log(response)
            return response.data
        },
        onSuccess: () => {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            toast.success("product success updated")
        },
        onError: () => {
            toast.error("error to edit product!")
        }
    })
}