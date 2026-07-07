import api from "./api";

export const getFavorites = async () => {
  const response = await api.get("/favorites");
  return response.data;
};

export const addFavorite = async (payload) => {
  const response = await api.post("/favorites", payload);
  return response.data;
};

export const removeFavorite = async (id) => {
  const response = await api.delete(`/favorites/${id}`);
  return response.data;
};
