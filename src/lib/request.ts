import axios from "axios";
import { api } from "@/lib/constants";

export default ({ url, options }) => {
  return axios(api[process.env.API || "dev"] + "/api" + url, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {});
};
