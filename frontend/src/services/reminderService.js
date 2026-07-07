import api from "./api";

export const getReminders = async () => {
  const response = await api.get("/reminders");
  return response.data;
};

export const createReminder = async (payload) => {
  const response = await api.post("/reminders", payload);
  return response.data;
};

export const updateReminder = async (id, payload) => {
  const response = await api.put(`/reminders/${id}`, payload);
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await api.delete(`/reminders/${id}`);
  return response.data;
};
