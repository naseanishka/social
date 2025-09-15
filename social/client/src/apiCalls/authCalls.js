import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // always send cookies/credentials
});

// Sign Up
export const signUp = async (userData) => {
  try {

    const response = await api.post("/api/auth/signup", userData);
    return response.data;
  } catch (error) {
    // Provide a fallback if error.response or error.response.data is undefined
    throw (error.response && error.response.data) ? error.response.data : { message: error.message || "Unknown error" };
  }
}

export const getCurrentUser = async (userData) => {
  try {

    const response = await api.post("/api/users/currenyUser", userData);
    return response.data;
  } catch (error) {
    // Provide a fallback if error.response or error.response.data is undefined
    throw (error.response && error.response.data) ? error.response.data : { message: error.message || "Unknown error" };
  }
}

export const signIn = async (userData) => {
  try {
    const response = await api.post("/api/auth/signin", userData);
    return response.data;
  } catch (error) {
    // Provide a fallback if error.response or error.response.data is undefined
    throw (error.response && error.response.data) ? error.response.data : { message: error.message || "Unknown error" };
  }
}

// How do u create a custom hook ?
// Imp interview question



