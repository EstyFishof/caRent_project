import axios from "axios";

let baseUrl="http://localhost:5000/api/products";

export const getAllProducts=()=>{
    return axios.get(baseUrl);
}

export const getProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}
export const addProduct = (product) => {
    return axios.post(`${baseUrl}`, product);
}
export const deleteProductById=(idProduct,token)=>{
    return axios.delete(`${baseUrl}/${idProduct}`,{
    headers: {
        "access-token": token,
      }, 
    });
}
export const updateProduct= (product,id)=>{
    return axios.put(`${baseUrl}/${id}`,product);
}


