import { ProductsModel } from "../models/products.model";
import axios from "axios";

const baseUrl = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products"
const authorId = "010"

export const getProducts = async (): Promise<ProductsModel[]> => {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl, { headers: { authorId } })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}

export const validateProduct = async (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/verification?id=${id}`)
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}

export const sendProduct = async (body: any): Promise<ProductsModel> => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl, body, { headers: { authorId } })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}
export const editProduct = async (body: any): Promise<ProductsModel> => {
    return new Promise((resolve, reject) => {
        axios.put(baseUrl, body, { headers: { authorId } })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err))
    })
}
export const deleteProduct = async (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.delete(`${baseUrl}?id=${id}`, { headers: { authorId } })
            .then((res) => resolve(true))
            .catch((err) => reject(err))
    })
}