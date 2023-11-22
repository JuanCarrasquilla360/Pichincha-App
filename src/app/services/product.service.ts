import { ProductsModel } from "../models/products.model";
import axios from "axios";

const baseUrl = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products"
const authorId = "010"

export const getProducts = async(): Promise<ProductsModel[]> => {
    const res = await axios.get(baseUrl, { headers: { authorId } })
    return res.data
}

export const validateProduct = async(id: string): Promise<boolean> => {
    const res = await axios.get(`${baseUrl}/verification?id=${id}`)
    return res.data
}

export const sendProduct = async(body: any): Promise<ProductsModel> => {
    const res = await axios.post(baseUrl, body, { headers: { authorId }})
    return res.data
}
export const editProduct = async(body: any): Promise<ProductsModel> => {
    const res = await axios.put(baseUrl, body, { headers: { authorId }})
    return res.data
}
export const deleteProduct = async(id: string): Promise<any> => {
    const res = await axios.delete(`${baseUrl}?id=${id}`, { headers: { authorId }})
    return res.data
}