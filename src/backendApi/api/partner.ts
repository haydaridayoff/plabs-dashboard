import apiService from "../services/apiService";

interface PartnerData {
  id: number;
  guid: string;
  name: string;
  image: string;
}

interface GetAllPartnerResponseData {
  data: PartnerData[];
  error: string;
  message: string;
  paginate: {
    current_page: number;
    limit: number;
    total_page: number;
    total_data: number;
  };
}

export const getAllPartner = async (): Promise<GetAllPartnerResponseData> => {
  try {
    const response = await apiService.get<GetAllPartnerResponseData>(
      "/partner",
    );
    return response;
  } catch (error) {
    throw error;
  }
};
