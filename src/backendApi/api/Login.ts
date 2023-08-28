import axios, { AxiosResponse } from "axios";
import { currentConfig } from "../Config";

export const login = async (
  email: string,
  password: string,
): Promise<AxiosResponse<any, any>> => {
  const config = currentConfig();
  const url = config.api.baseUrl + config.api.login;
  const body = {
    email: email,
    password: password,
  };

  const json = JSON.stringify(body);

  let response = {} as AxiosResponse<any, any>;

  console.log("requesting login with axios url: " + url + " and body: " + json);

  try {
    response = await axios.post(url, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response status: " + response.status, "response data: ");
    console.log(response.data.message);
  } catch (error) {
    console.log("Error in login: " + error);
  }
  return response;
};

export const loginResponseData = (loginrResponse: any) => {
  const data = loginrResponse.data.data;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  };
};
