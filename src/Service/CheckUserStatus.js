export const checkIfLoggedIn = () => {
   const tokenKey =
      localStorage.getItem("token") != null ? JSON.parse(localStorage.getItem("token")).token : "";
   return tokenKey ? [true, tokenKey] : [false, ""];
};
