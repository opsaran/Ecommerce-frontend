import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

//since I'm no longer using headers, instead suing cookies

// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.headers.Authorization) {
//       localStorage.setItem("accessToken", response.headers.Authorization);
//     } else if (response.headers["x-refresh"]) {
//       localStorage.setItem("refreshToken", response.headers["x-refresh"]);
//     }

//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (accessToken && refreshToken) {
//       console.log("in request");
//       config.headers = {
//         Authorization: `Bearer ${accessToken}`,
//         "x-refresh": `${refreshToken}`,
//       };
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
