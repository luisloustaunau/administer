import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import CreateEvent from "./Components/Events/CreateEvent";
import ViewUsers from "./Components/Users/ViewUsers";
import AdministerEvent from "./Components/Events/AdministerEvent";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const authorizeChecker = () => {
    if (
      localStorage.getItem("username") === process.env.REACT_APP_USERNAME &&
      localStorage.getItem("password") === process.env.REACT_APP_PASSWORD
    ) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    authorizeChecker();
  }, []);

  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Home */}
      <Route
        path="/"
        element={
          authenticated ? (
            <Home />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )
        }
      />

      {/* View users  */}
      <Route
        path="/users"
        element={
          authenticated ? (
            <ViewUsers />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )
        }
      />

      {/* View events */}
      <Route
        path="/create-event"
        element={
          authenticated ? (
            <CreateEvent />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )
        }
      />
      <Route
        path="/events"
        element={
          authenticated ? (
            <AdministerEvent />
          ) : (
            <Login setAuthenticated={setAuthenticated} />
          )
        }
      />
    </Routes>
  );
}

export default App;
