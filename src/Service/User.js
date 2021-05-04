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
