import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetchProducts = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const products = await axios.get(`${process.env.NEXT_PUBLIC_APP_BASE_URL}`)
            return products.data
        }
    })
}