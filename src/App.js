import { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Navbar from "./Compenents/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./Compenents/Pages/SignIn";
import SignUp from "./Compenents/Pages/SignUp";
import Home from "./Compenents/Pages/Home";
import { auth } from "./Firebase";
import "./App.css";
import Sidebar from "./Compenents/Sidebar";
import Stocks from "./Compenents/Pages/Stocks/Index";
import Crypto from "./Compenents/Pages/Crypto/index";

import About from "./Compenents/Pages/About";

function App() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        navigate("/Home");
      }
    });

    return () => {
      listen();
    };
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {" "}
      <div className="App">
        <Navbar authUser={authUser} userSignOut={userSignOut} />
        <div className="flex-change">
          <Sidebar />
          <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Stocks" element={<Stocks />} />
            <Route path="/Crypto" element={<Crypto />} />

            <Route path="/AboutUs" element={<About />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
