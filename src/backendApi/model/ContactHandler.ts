import { contactType } from "../../api/Contact";
import { getAllContacts } from "../api/Contacts/GetAllContacts";

export const getAllContactsHandler = async (): Promise<contactType[]> => {
  let response = await getAllContacts();
  let data: contactType[] = [];
  if (response === Object.create(null)) {
    console.log("Server error in getAllContacts");
    return [];
  }

  if (response.status === 200 && response.data.error === "") {
    console.log("getAllContacts successful");
    let responseData = response.data.data;
    responseData.map((item: any) => {
      data.push({
        id: item.guid,
        name: item.name,
        email: item.email,
        date: new Date(item.date),
        message: item.messages,
      });
    });
  } else {
    console.log("Error in getAllContacts: ");
    return [];
  }
  return data;
};
