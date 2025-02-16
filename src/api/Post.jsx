import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Get all posts
export const getPost = () => api.get("/posts");

// Delete a post by ID
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Add a new post
export const addPost = (data) => api.post("/posts", data);

export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
