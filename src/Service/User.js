import axios from "axios";
import { checkIfLoggedIn } from "./CheckUserStatus";
const serverURL = "http://localhost:8000/";

export const getProfileData = async () => {
   const [, token] = checkIfLoggedIn();
   const response = await axios.get(serverURL + "api/users/getUser", {
      headers: {
         Authorization: "Token " + token,
      },
   });
   return response.data.data;
};

export const getAllPosts = async () => {
   const [, token] = checkIfLoggedIn();
   const response = await axios.get(serverURL + "api/posts/myPosts", {
      headers: {
         Authorization: "Token " + token,
      },
   });
   // console.log(response);
   return response.data;
};
export const getMessages = async (username) => {
   const [, token] = checkIfLoggedIn();
   const response = await axios.get(serverURL + "api/users/getConversation/" + username, {
      headers: {
         Authorization: "Token " + token,
      },
   });
   return response.data.Messages;
};

export const sendMessage = async (username, message) => {
   const [, token] = checkIfLoggedIn();

   const body = {
      message: message,
   };
   const response = await axios.post(serverURL + "api/users/sendMessage/" + username, body, {
      headers: {
         Authorization: "Token " + token,
      },
   });
};

export const getOtherUserData = async (userName) => {
   const [, token] = checkIfLoggedIn();
   const response = await axios.get(serverURL + "api/users/getUser/" + userName, {
      headers: {
         Authorization: "Token " + token,
      },
   });
   return response.data.data;
};

export const friendshipStatus = async (status, username) => {
   const [, token] = checkIfLoggedIn();
   let path = "";

   const body = {
      friend: username,
   };
   if (status === "Strangers") path = "api/users/addRequest/" + username;
   else path = "api/users/rejectRequest";

   const response = await axios.post(serverURL + path, body, {
      headers: {
         Authorization: "Token " + token,
      },
   });
};

export const acceptFriendRequest = async (username) => {
   const [, token] = checkIfLoggedIn();

   const body = {
      friend: username,
   };

   const response = await axios.post(serverURL + "api/users/acceptRequest", body, {
      headers: {
         Authorization: "Token " + token,
      },
   });
};

export const getFriendList = async () => {
   const [, token] = checkIfLoggedIn();

   const response = await axios.get(serverURL + "api/users/ListRequests", {
      headers: {
         Authorization: "Token " + token,
      },
   });
   return response.data.data;
};

export const getOtherUserPosts = async (username) => {
   const [, token] = checkIfLoggedIn();

   const response = await axios.get(serverURL + "api/posts/profile/posts/" + username, {
      headers: {
         Authorization: "Token " + token,
      },
   });
   return response.data;
};

export const getAllUsers = async () => {
   const [, token] = checkIfLoggedIn();

   const response = await axios.get(serverURL + "api/users/getUsers", {
      headers: {
         Authorization: "Token " + token,
      },
   });
   // console.log(response.data);
   return response.data.data;
};
