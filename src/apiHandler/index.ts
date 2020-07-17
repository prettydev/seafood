import React from "react";
import axios from "axios";
import { hostName } from "../environment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

if (!!localStorage.getItem("jwtToken")) {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwtToken")}`;
  let Lastclear =
    Number(localStorage.getItem("lastclear")) || new Date().getTime();
  let Time_now = Number(new Date().getTime());
  if (Time_now - Lastclear > 1000 * 60 * 60 * 24) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("lastclear");
    localStorage.removeItem("user");
  }
} else {
  axios.defaults.headers.common["Authorization"] = ``;
}

export async function callApi(endpoint: string, options?: any) {
  return await axios
    .get(hostName + endpoint, options)
    .then(({ data }) => data)
    .catch((e) => {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: e.response ? e.response.data.message : undefined,
      });
    });
}

export async function postApi(endpoint: string, options?: any, headers?: any) {
  return await axios
    .post(hostName + endpoint, options, headers)
    .then(({ data }) => data)
    .catch((e) => {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: e.response ? e.response.data.message : undefined,
      });
    });
}

export async function putApi(endpoint: string, options?: any) {
  return await axios
    .put(hostName + endpoint, options)
    .then(({ data }) => data)
    .catch((e) => {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: e.response ? e.response.data.message : undefined,
      });
    });
}

export async function postWithImageUpload(formData: any) {
  return await axios
    .post(hostName + "/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(({ data }) => data)
    .catch((e) => {
      MySwal.fire({
        title: "Error",
        icon: "error",
        text: e.response ? e.response.data.message : undefined,
      });
    });
}

export default callApi;
