import axios from "axios";
import { checkIfLoggedIn } from "./CheckUserStatus";
export const getAllPosts = async () => {
   const [, token] = checkIfLoggedIn();
   const response = await axios.get("http://localhost:8000/api/posts/", {
      headers: {
         Authorization: "Token " + token, //the token is a variable which holds the token
      },
   });
   return response.data;
};
