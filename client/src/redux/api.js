import axios from "axios";
const API = axios.create({baseURL:'http://localhost:5000',headers:{
  "Access-Control-Allow-Origin": "*"
}
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
})


export const signIn = (formData) => API.post("/auth/sign-in", formData);
export const signUp = (formData) => API.post("/auth/sign-up", formData);
export const fetchUser = (userId) => API.get(`/user/${userId}`);


export const fetchAllPosts = () => API.get("/post");
export const searchPost = (searchTitle) => API.get(`/post/search?searchQuery=${searchTitle}`);
export const fetchPostId = (id) => API.get(`/post/${id}`);
export const fetchUserPosts = (userName) => API.get(`/post/dashboard/${userName}`);
export const createPost = (postData) => API.post("/post",postData);
export const updatePost = (postId,postData) => API.patch(`/post/${postId}`,postData);
export const deletePost = (id) => API.delete(`/post/${id}`);
export const likeDislikePost = (id,userId) => API.patch(`/post/likeDislike/${id}`,{currentUser:userId});
export const commentPost = (postId,userId,text) => API.patch(`/post/comment/${postId}`,{userId:userId,text:text});
export const similairPosts = (postId) => API.get(`/post/similair/${postId}`);



