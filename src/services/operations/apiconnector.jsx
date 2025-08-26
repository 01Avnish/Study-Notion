import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true, // ✅ important for CORS/cookie-based auth
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData || null,
    headers: headers || null,
    params: params || null,
  });
};
