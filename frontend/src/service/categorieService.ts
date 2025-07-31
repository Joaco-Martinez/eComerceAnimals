import api from "./apiService";



export const getAllCategories = async () => {
  const res = await api.get("/categories");
  return res;
};

export const postCategory = async (data: FormData) =>
  await api.post("/categories", data, true, true, true, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  export const updateCategory = async (id: string, data: FormData) =>
  await api.put(`/categories/${id}`, data, true, true, true, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  export const deleteCategory = async (id: string) =>
  await api.del(`/categories/${id}`, true, true, true)