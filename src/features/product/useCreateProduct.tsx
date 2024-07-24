import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Products } from "../../../types/product"
import toast from "react-hot-toast"

export const useCreateProduct = () => {    
    return useMutation({
        mutationFn: async (body: Products) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_APP_BASE_URL}`, body)
            return response.data
        },
        onSuccess: () => {
            setTimeout(() => {
                window.location.reload()
            }, 1000);
            toast.success("add product success!")
        },
        onError: () => {
            toast.error("error to create product!")
        },
    })
}