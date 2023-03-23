import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";
const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

// const API = axios.create({
//     baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
// });
const API = axios.create({baseURL: `${REACT_APP_DEV_API}`})

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

// User
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const getUsers = () => API.get(`/users/users`);
export const createUser = (userData) => API.post("/users", userData);
export const deleteUser = (id) => API.delete(`/users/${id}`);
export const updateUser = (updatedUserData, id) =>
    API.patch(`/users/${id}`, updatedUserData);
export const changePassword = (updatedUserData, id) =>
    API.patch(`/users/changePassword/${id}`, updatedUserData);

// Tour
export const createTour = (tourData) => API.post("/tour", tourData);
export const getTours = (page) => API.get(`/tour?page=${page}`);
export const getAllTours = () => API.get(`/tour/allTours`);
export const getTour = (id) => API.get(`/tour/${id}`);
export const deleteTour = (id) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData, id) =>
    API.patch(`/tour/${id}`, updatedTourData);

export const getToursBySearch = (searchQuery) =>
    API.get(`/tour/search?searchQuery=${searchQuery}`);

export const getTagTours = (tag) => API.get(`/tour/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tour/relatedTours`, tags);
export const likeTour = (id) => API.patch(`/tour/like/${id}`);

// Room
export const createRoom = (roomData) => API.post("/room", roomData);
export const getRoom = (id) => API.get(`/room/${id}`);
export const getAllRooms = () => API.get(`/room/allRooms`);
export const deleteRoom = (id) => API.delete(`/room/${id}`);
export const updateRoom = (updatedRoomData, id) =>
    API.patch(`/room/${id}`, updatedRoomData);
export const getTagRooms = (tag) => API.get(`/room/tag/${tag}`);
export const getRooms = (page) => API.get(`/room?page=${page}`);
export const getRelatedRooms = (tags) => API.post(`/room/relatedRooms`, tags);
export const likeRoom = (id) => API.patch(`/room/like/${id}`);

// Room Bill
export const createRoomBill = (roomBillData) =>
    API.post("/roomBill", roomBillData);
export const getRoomsByUser = (userId) =>
    API.get(`/roomBill/userRoomBills/${userId}`);
export const getRoomBills = () => API.get("/roomBill/allRoomBills");

// Tour Bill
export const createTourBill = (tourBillData) =>
    API.post("/tourBill", tourBillData);
export const getToursByUser = (userId) =>
    API.get(`/tourBill/userTourBills/${userId}`);
export const getTourBills = () => API.get("/tourBill/allTourBills");

// Comment
export const createComment = (commentData) => API.post("/comment", commentData);
export const getCommentsByService = (serviceId) =>
    API.get(`/comment/${serviceId}`);
export const getCommentsById = (id) => API.get(`/comment/getComment/${id}`);
export const deleteComment = (id) => API.delete(`/comment/${id}`);
export const updateComment = (updatedCommentData, id) =>
    API.patch(`/comment/${id}`, updatedCommentData);
