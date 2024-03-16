import axios from "axios";
import { getPreferenceValues } from "@raycast/api";

export const initAxiosInstance = () => {
  return axios.create({
    baseURL: "https://api.clockify.me/api",
    timeout: 1000,
    headers: { "x-api-key": getPreferenceValues().apikey },
  });
};
