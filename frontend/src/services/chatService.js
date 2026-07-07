import api from "./api";

export const getChat = async () => {
  const response = await api.get("/chat");
  return response.data;
};

export const saveMessage = async (payload) => {
  const response = await api.post("/chat", payload);
  return response.data;
};

export const clearChat = async () => {
  const response = await api.delete("/chat");
  return response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/chat/${id}`);
  return response.data;
};
