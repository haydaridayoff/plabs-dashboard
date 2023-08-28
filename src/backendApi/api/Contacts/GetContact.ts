import { AxiosResponse } from "axios";
import { currentConfig } from "../../Config";
import { getHeader } from "../../Header";

const getContact = async (guid: string) => {
  const { baseUrl, contact } = currentConfig().api;

  const url = baseUrl + contact + "/" + guid;

  const accessToken = getHeader().AccessToken;

  if (accessToken === "") {
    console.log("Error in getContact: accessToken is empty");
    return null;
  }

  let response: AxiosResponse<any, any> = Object.create(null);
};

export default getContact;
