import axios, { AxiosResponse } from "axios";
import { currentConfig } from "../../Config";
import { getHeader } from "../../Header";

export const getAllContacts = async () => {
  const { baseUrl, contact } = currentConfig().api;
  const url = baseUrl + contact;

  const accessToken = getHeader().AccessToken;
  let response: AxiosResponse<any, any> = Object.create(null);

  if (accessToken === "") {
    console.log("Error in getAllContacts: accessToken is empty");
    return response;
  }

  console.log(
    "requesting getAllContacts with axios url: " +
      url +
      " and accessToken: " +
      accessToken,
  );

  try {
    response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
    console.log("response status: " + response.status, "response data: ");
  } catch (error) {
    console.log("Error in getAllContacts: " + error);
  }

  return response;
};
