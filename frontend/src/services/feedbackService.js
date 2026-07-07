import api from "./api";

export const getFeedback = async () => {
  const response = await api.get("/feedback");
  return response.data;
};

export const submitFeedback = async (payload) => {
  const response = await api.post("/feedback", payload);
  return response.data;
};
