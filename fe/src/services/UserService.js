import axiosInstance from "./axios.service";

const loginAPI = async (email, password) => {
    const res = await axiosInstance.post("auth/sign-in ",{email, password})

    return res.data.data
}

const forgotAPI = async (email) => {
    const res = await axiosInstance.post("auth/forgot-password ",{email})

    return res.data.data
}

const resetAPI = async (token, password, confirmPassword) => {
    const res = await axiosInstance.put("auth/reset-password ",{token, password, confirmPassword})

    return res.data.data
}

const serviceAPI = async (name, description, minPrice, maxPrice) => {
    const res = await axiosInstance.post("/services ",{name, description, minPrice, maxPrice})

    return res.data.data
}

const getserviceAPI = async (name, description, minPrice, maxPrice) => {
    const res = await axiosInstance.get("/services ",{name, description, minPrice, maxPrice})

    return res.data.data
}
 export {loginAPI, serviceAPI, forgotAPI, resetAPI, getserviceAPI };


