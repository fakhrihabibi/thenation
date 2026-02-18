import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export const getEvents = async () => {
    const res = await api.get("/events");
    return res.data;
};

export const getEventById = async (id) => {
    const res = await api.get(`/events/${id}`);
    return res.data;
};

export const getServices = async () => {
    const res = await api.get("/services");
    return res.data;
};

export const getTestimonials = async () => {
    const res = await api.get("/testimonials");
    return res.data;
};

export const getPartners = async () => {
    const res = await api.get("/partners");
    return res.data;
};

export const getGallery = async () => {
    const res = await api.get("/galleries");
    return res.data;
};

export const submitBooking = async (bookingData) => {
    const res = await api.post("/bookings", bookingData);
    return res.data;
};

export const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
};

export const register = async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
};

export default api;
