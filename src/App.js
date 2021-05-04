import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import CreatePost from "./components/CreatePost/CreatePost";
import NewsFeed from "./components/NewsFeed/NewsFeed";
import Footer from "./components/Footer/Footer";
import { checkIfLoggedIn } from "./Service/CheckUserStatus";
class App extends React.Component {
   constructor() {
      super();
      this.state = {
         isLoggedIn: false,
         token: "",
      };
   }

   componentDidMount() {
      const [loginStatus, loginToken] = checkIfLoggedIn();
      this.setState({
         isLoggedIn: loginStatus,
         token: loginToken,
      });
   }

   render() {
      return (
         <>
            <div className="container"><br/>
            
               <NewsFeed />
               {/* <div class="fixed"> */}
               <CreatePost />
            {/* </div> */}
            </div>
            <br/>
            <Footer />
         </>
      );
      /* if (!this.state.isLoggedIn) {
         return (
            <>
               
               <div className="container">
                  <br />
               </div>
               <Footer />
            </>
         );
      } else {
         ; */
      /*   return (
          <Router>
               <Header />
               <div className="container">
                  <br />
                  <Switch>
                     <Route path="/login" component={Login} />
                     <Route path="/signup" component={Signup} />
                     <Route path="/">
                        <UpdatePost />
                        <NewsFeed />
                     </Route>
                  </Switch>
               </div>
               <Footer />
            </Router> 
         );
         */
   }
   // }
}

export default App;
