import apiService from "../services/apiService";

interface ServiceData {
  // "id": 0,
  //         "guid": "a7155003-02b3-4116-a7ff-f6a05a177534",
  //         "title": "ti1taaaaaale",
  //         "description": "description",
  //         "file": "",
  id: number;
  guid: string;
  title: string;
  description: string;
  file: string;
}

interface GetAllServiceResponseData {
  data: ServiceData[];
  error: string;
  message: string;
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

export const getAllService = async (): Promise<GetAllServiceResponseData> => {
  try {
    const response = await apiService.get<GetAllServiceResponseData>(
      "/service",
    );
    return response;
  } catch (error) {
    throw error;
  }
};
