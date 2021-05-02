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
   //    console.log(response);
   return response.data.data;
};
