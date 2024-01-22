import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.VUE_APP_API_SERVER,
});

baseAPI.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("access_token");
    if (token) req.headers["Authorization"] = `Bearer ${token}`;
    return req;
  },
  (err) => {
    return err;
  }
);

baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 && window.location.pathname !== "/") {
      window.location.assign("/");
      return Promise.reject(error);
    } else if (error?.response?.status === 403) {
      window.location.assign("/");
      return Promise.reject(error);
    }
    return error;
  }
);

export default baseAPI;
