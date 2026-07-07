import api from "./api";

export const getContacts = async () => {
  const response = await api.get("/contacts");
  return response.data;
};

export const addContact = async (payload) => {
  const response = await api.post("/contacts", payload);
  return response.data;
};

export const updateContact = async (id, payload) => {
  const response = await api.put(`/contacts/${id}`, payload);
  return response.data;
};

export const removeContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};
