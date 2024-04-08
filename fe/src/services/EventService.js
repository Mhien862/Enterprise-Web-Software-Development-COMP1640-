import axiosInstance from "./axios.service";

const loginAPI = async (email, password) => {
    const res = await axiosInstance.post("logins ", { email, password })

    return res.data
}

const forgotAPI = async (email) => {
    const res = await axiosInstance.post("auth/forgot-passwords ", { email })

    return res.data.data
}

const resetAPI = async (token, password, confirmPassword) => {
    const res = await axiosInstance.put("auth/reset-passwords ", { token, password, confirmPassword })

    return res.data.data
}


const eventAPI = async (eventname, fristClosureDate, finalClosureDate, academicYear, faculty) => {
    const res = await axiosInstance.post("event", { eventname, fristClosureDate, finalClosureDate, academicYear, faculty })

    return res.data.data
}

const uploadAPI = async (event, faculty, originalname, filename) => {
    const res = await axiosInstance.post("uploads ", { event, faculty, originalname, filename })

    return res.data.data
}

const getserviceAPI = async (name, description, minPrice, maxPrice) => {
    const res = await axiosInstance.get("/servicess ", { name, description, minPrice, maxPrice })

    return res.data.data
}

const updateEvent = async (url, data) => {
    const res = await axiosInstance.put(url, data)

    return res.data.data
}

export { loginAPI, eventAPI, forgotAPI, resetAPI, getserviceAPI, updateEvent, uploadAPI };


