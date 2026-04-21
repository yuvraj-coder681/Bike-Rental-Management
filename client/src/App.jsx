import { BrowserRouter as Router, Routes, Route }
  from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MyBookings from "./pages/MyBooking";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Bikes from "./pages/Bikes";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route
            path="/bikes"
            element={
              <ProtectedRoute>
                <Bikes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;