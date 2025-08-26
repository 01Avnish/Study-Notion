import "./App.css";
import {Route, Routes } from "react-router-dom";
import Home from "./pages/Home"

import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auths/OpenRoute"
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auths/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/core/Dashboard/Sidebar";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import  AddCourse  from "./components/core/Dashboard/AddCourse";

function App() {
  console.log("App component rendered");
  const { user } = useSelector((state) => state.profile);
  console.log("User in App.jsx:", user);
  if(user) {
  console.log("account type is ", user.accountType);
  }

  return (
   <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            if(user && user.accountType === "student") 
              {
                <>
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  <Route path="dashboard/cart" element={<Cart />} />
                </>
              }
              if(user && user.accountType === "instructor")
              {
                <Route path="dashboard/add-course" element={<AddCourse />} />
              }
        </Route>
        
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
    </Routes>

    
    

   </div>
  );
}

export default App;
