import { useEffect, useState } from "react";
import API from "../services/api";

function MyBooking() {
  const [bookings, setBookings] = useState([]);

  // 🔥 fetch function outside useEffect
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(`/bookings/cancel/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 🔥 instant remove
      setBookings((prev) => prev.filter((b) => b._id !== id));

    } catch (error) {
      alert("Cancel Failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              background: "white",
              padding: "20px",
              margin: "20px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              color: "black",
            }}
          >
            <h3>{booking.bike?.name}</h3>

            <p><strong>Brand:</strong> {booking.bike?.brand}</p>

            <p>
              <strong>Start Date:</strong>{" "}
              {new Date(booking.startDate).toDateString()}
            </p>

            <p>
              <strong>End Date:</strong>{" "}
              {new Date(booking.endDate).toDateString()}
            </p>

            <p>
              <strong>Total Rent:</strong> ₹{booking.totalAmount}
            </p>

            <p>
              <strong>Status:</strong> {booking.status}
            </p>
            {booking.status === "Booked" && (
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={booking.status == "Cancelled"}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px"
                }}
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyBooking;