import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Routes>
            <Route path="/register" Component={RegisterForm} />
            <Route path="/login" Component={LoginForm} />
            <Route path="/logout" Component={Logout} />
            <Route
              path="/movies/:id"
              element={<ProtectedRoute Component={MovieForm} />}
            />
            <Route path="/movies" element={<Movies user={user} />} />
            <Route path="/customers" Component={Customers} />
            <Route path="/rentals" Component={Rentals} />
            <Route
              path="/"
              element={<Navigate from="/" exact to="/movies" />}
            />
            <Route path="*" Component={NotFound} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
