import { useEffect, useState } from "react";
import API from "../services/api";

function Bikes() {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBook = async (bikeId) => {
    if (!startDate || !endDate) {
      alert("Please select start and end date");
      return;
    }
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          bikeId,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Bike Booked Successfully 🚀");
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data);
      alert("Booking Failed");
    }
  };

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await API.get("/bikes");
        setBikes(res.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchBikes();
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Available Bikes</h2>

      {bikes.map((bike) => (
        <div
          key={bike._id}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "20px",
            margin: "20px auto",
            width: "400px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.3)"
          }}
        >
          <h3>{bike.name}</h3>

          <p><strong>Brand:</strong> {bike.brand}</p>

          <p><strong>Price per Day:</strong> ₹{bike.pricePerDay}</p>

          <p>
            <strong>Status:</strong>{" "}
            {bike.status === "Available" ? "Available ✅" : "Booked ❌"}
          </p>

          <div style={{ marginBottom: "10px" }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ marginRight: "10px" }}
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button onClick={() => handleBook(bike._id)}
            style={{
              padding: "8px 15px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Bikes;


