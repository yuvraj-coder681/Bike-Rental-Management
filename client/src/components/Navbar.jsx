import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  {user?.role === "admin" && (
  <Link
    to="/admin"
    style={{ marginRight: "15px", color: "white" }}
  >
    Admin
  </Link>
)}
  
  return (
    <div style={{ padding: "15px", background: "#111", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>Home</Link>

      {user && (
        <Link to="/my-bookings" style={{ marginRight: "15px", color: "white" }}>
          My Bookings
        </Link>
      )}

      {!user ? (
        <>
          <Link to="/login" style={{ marginRight: "15px", color: "white" }}>
            Login
          </Link>
          <Link to="/register" style={{ color: "white" }}>
            Register
          </Link>
        </>
      ) : (
        <>
          <span style={{ marginRight: "15px" }}>
            Welcome, {user.name}
          </span>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}
export default Navbar;