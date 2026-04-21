import { useEffect, useState } from "react";
import API from "../services/api";

function Admin() {
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    API.get("/bikes").then(res => setBikes(res.data));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/bikes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    alert("Bike deleted");
    window.location.reload();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Admin Panel</h2>

      {bikes.map(bike => (
        <div key={bike._id}>
          <h3>{bike.name}</h3>
          <button onClick={() => handleDelete(bike._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;