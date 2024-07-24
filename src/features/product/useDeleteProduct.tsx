import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const productResponse = await axios.delete(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/${id}`)
            return productResponse.data
        },
        onSuccess: () => {
            setTimeout(() => {
              window.location.reload()
            }, 1000)
            
            toast.error("delete success!")
          },
        onError: () => {
          toast.error("error to delete product!")
        }
    })
}