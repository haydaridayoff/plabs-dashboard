import { stat } from "fs";
import axios, { AxiosResponse } from "axios";
import { status } from "../../api/Job";
import { currentConfig } from "../Config";
import { getHeader, loadHeader } from "../Header";

export const logout = async (): Promise<AxiosResponse<any, any>> => {
  const { baseUrl, logout } = currentConfig().api;

  let response: AxiosResponse<any, any> = Object.create(null);
  const accessToken = getHeader().AccessToken;

  if (accessToken === "") {
    console.log("Error in logout: accessToken is empty");
    return response;
  }

  let url = baseUrl + logout;

  console.log("requesting logout with axios url: " + url);
  try {
    response = await axios.post(url,{}, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + accessToken,
      },
    });
  } catch (error) {
    console.log("Error in logout: " + error);
  }
  return response;
};
