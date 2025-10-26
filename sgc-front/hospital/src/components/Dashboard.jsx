// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MapPopup from "./MapPopup";
// import { getActiveTrips, getAllTrips } from "../utils/Api";
// import "../App.css";

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   const [showMap, setShowMap] = useState(false);
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [activeTrips, setActiveTrips] = useState([]);
//   const [allTrips, setAllTrips] = useState([]);

//   useEffect(() => {
//     const hospitalUser = JSON.parse(localStorage.getItem("hospitalUser"));
//     if (!hospitalUser) navigate("/");
//     else {
//       setUser(hospitalUser);
//       fetchTrips(hospitalUser.hospitalId);
//     }
//   }, [navigate]);

//   async function fetchTrips(hospitalId) {
//     const [active, all] = await Promise.all([
//       getActiveTrips(hospitalId),
//       getAllTrips(hospitalId),
//     ]);
//     setActiveTrips(active);
//     setAllTrips(all);
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("hospitalUser");
//     navigate("/");
//   };

//   const handleCardClick = (trip) => {
//     setSelectedTrip(trip);
//     setShowMap(true);
//   };

//   return (
//     <div className="dashboard-page">
//       {/* Header */}
//       <header className="dashboard-header">
//         <h1>🏥 Smart Green Corridor</h1>
//         <div className="dashboard-user">
//           <span>{user?.name || user?.hospitalId}</span>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       </header>

//       <main className="dashboard-content">
//         {activeTrips.length === 0 ? (
//           <div className="dashboard-card gradient-orange">
//             <h3>No Active Trips</h3>
//             <p>Waiting for ambulance dispatch...</p>
//           </div>
//         ) : (
//           activeTrips.map((trip) => (
//             <div
//               key={trip.tripId}
//               className="dashboard-card gradient-blue"
//               onClick={() => handleCardClick(trip)}
//             >
//               <h3>🚑 Ambulance: {trip.ambulanceId}</h3>
//               <p><b>Status:</b> {trip.status}</p>
//               <p>
//                 <b>Current:</b>{" "}
//                 {trip.currentLocation
//                   ? `${trip.currentLocation.latitude.toFixed(4)}, ${trip.currentLocation.longitude.toFixed(4)}`
//                   : "Location updating..."}
//               </p>
//             </div>
//           ))
//         )}

//         <div className="dashboard-card gradient-purple">
//           <h3>Total Trips: {allTrips.length}</h3>
//           <p>Last update: {new Date().toLocaleTimeString()}</p>
//         </div>
//       </main>

//       {/* Map Popup */}
//       {showMap && selectedTrip?.currentLocation && (
//         <div className="map-modal">
//           <div className="map-modal-content">
//             <h3>{selectedTrip.ambulanceId} - Live Location</h3>
//             <MapPopup
//               latitude={selectedTrip.currentLocation.latitude}
//               longitude={selectedTrip.currentLocation.longitude}
//               ambulanceName={selectedTrip.ambulanceId}
//             />
//             <button onClick={() => setShowMap(false)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;















// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import { getActiveTrips, getAllTrips } from "../utils/Api";
// import "leaflet/dist/leaflet.css";
// import "../App.css";

// // Custom ambulance icon
// const ambulanceIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/2966/2966327.png",
//   iconSize: [40, 40],
//   iconAnchor: [20, 40],
//   popupAnchor: [0, -40],
// });

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [activeTrips, setActiveTrips] = useState([]);
//   const [allTrips, setAllTrips] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const hospitalUser = JSON.parse(localStorage.getItem("hospitalUser"));
//     if (!hospitalUser) navigate("/");
//     else {
//       setUser(hospitalUser);
//       fetchTrips(hospitalUser.hospitalId);

//       const interval = setInterval(() => {
//         fetchTrips(hospitalUser.hospitalId);
//       }, 5000);

//       return () => clearInterval(interval);
//     }
//   }, [navigate]);

//   const fetchTrips = async (hospitalId) => {
//     const [active, all] = await Promise.all([
//       getActiveTrips(hospitalId),
//       getAllTrips(hospitalId),
//     ]);
//     setActiveTrips(active);
//     setAllTrips(all);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("hospitalUser");
//     navigate("/");
//   };

//   return (
//     <div className="dashboard-page" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* Header */}
//       <header className="dashboard-header" style={{ display: "flex", justifyContent: "space-between", padding: "10px 20px", background: "#1e3a8a", color: "#fff", alignItems: "center" }}>
//         <h1 style={{ margin: 0, fontSize: "1.5rem" }}>🏥 Smart Green Corridor</h1>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <span>{user?.name || user?.hospitalId}</span>
//           <button onClick={handleLogout} style={{ padding: "5px 10px", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
//         </div>
//       </header>

//       {/* Main content: split layout */}
//       <div className="dashboard-main" style={{ display: "flex", flex: 1, gap: "10px", padding: "10px" }}>
//         {/* Left: Trips list */}
//         <div className="trips-list-panel" style={{ width: "40%", overflowY: "auto", padding: "10px", background: "#f0f4f8", borderRadius: "10px" }}>
//           <h2 style={{ textAlign: "center" }}>Active Trips</h2>
//           {activeTrips.length === 0 ? (
//             <div style={{ padding: "20px", background: "#ffedd5", borderRadius: "10px", marginBottom: "10px", textAlign: "center" }}>
//               <h3>No Active Trips</h3>
//               <p>Waiting for ambulance dispatch...</p>
//             </div>
//           ) : (
//             activeTrips.map((trip) => (
//               <div key={trip.tripId} style={{ padding: "15px", background: "#dbeafe", borderRadius: "10px", marginBottom: "10px", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
//                 <h3>🚑 Ambulance: {trip.ambulanceId}</h3>
//                 <p><b>Status:</b> {trip.status}</p>
//                 {trip.currentLocation && (
//                   <p>
//                     <b>Current:</b>{" "}
//                     {`${trip.currentLocation.latitude.toFixed(4)}, ${trip.currentLocation.longitude.toFixed(4)}`}
//                   </p>
//                 )}
//                 <p><b>Destination:</b> {trip.destination || "N/A"}</p>
//               </div>
//             ))
//           )}

//           <div style={{ padding: "15px", background: "#e9d5ff", borderRadius: "10px", marginTop: "10px", textAlign: "center" }}>
//             <h3>Total Trips: {allTrips.length}</h3>
//             <p>Last update: {new Date().toLocaleTimeString()}</p>
//           </div>
//         </div>

//         {/* Right: Map */}
//         <div className="map-panel" style={{ width: "60%", height: "100%", borderRadius: "10px", overflow: "hidden" }}>
//           <MapContainer
//             center={
//               activeTrips[0]?.currentLocation
//                 ? [activeTrips[0].currentLocation.latitude, activeTrips[0].currentLocation.longitude]
//                 : [20.5937, 78.9629] // default to India center
//             }
//             zoom={13}
//             style={{ height: "100%", width: "100%" }}
//           >
//             <TileLayer
//               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
//             />
//             {activeTrips.map((trip) =>
//               trip.currentLocation ? (
//                 <Marker
//                   key={trip.tripId}
//                   position={[trip.currentLocation.latitude, trip.currentLocation.longitude]}
//                   icon={ambulanceIcon}
//                 >
//                   <Popup>
//                     <b>{trip.ambulanceId}</b> 🚑<br />
//                     {trip.status}
//                   </Popup>
//                 </Marker>
//               ) : null
//             )}
//           </MapContainer>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;








// components/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPopup from "./MapPopup";
import { getActiveTrips, getAllTrips } from "../utils/Api";
import "../App.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeTrips, setActiveTrips] = useState([]);
  const [allTrips, setAllTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const hospitalUser = JSON.parse(localStorage.getItem("hospitalUser"));
    if (!hospitalUser) navigate("/");
    else {
      setUser(hospitalUser);
      fetchTrips(hospitalUser.hospitalId);
    }
  }, [navigate]);

  async function fetchTrips(hospitalId) {
    const [active, all] = await Promise.all([
      getActiveTrips(hospitalId),
      getAllTrips(hospitalId),
    ]);
    setActiveTrips(active);
    setAllTrips(all);
  }

  const handleLogout = () => {
    localStorage.removeItem("hospitalUser");
    navigate("/");
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {/* Left: Trip list */}
      <div style={{ flex: 1 }}>
        <header style={{ marginBottom: "20px" }}>
          <h1>🏥 Smart Green Corridor</h1>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <span>{user?.name || user?.hospitalId}</span>
            <button onClick={handleLogout} style={{ padding: "8px 15px", borderRadius: "5px", cursor: "pointer", border: "none", background: "#ef4444", color: "white" }}>Logout</button>
          </div>
        </header>

        <h2>Active Trips</h2>
        {activeTrips.length === 0 ? (
          <div className="dashboard-card gradient-orange">
            <h3>No Active Trips</h3>
            <p>Waiting for ambulance dispatch...</p>
          </div>
        ) : (
          activeTrips.map((trip) => (
            <div key={trip.tripId} className="dashboard-card gradient-blue" style={{ marginBottom: "10px" }}>
              <h3>🚑 Ambulance: {trip.ambulanceId}</h3>
              <p><b>Status:</b> {trip.status}</p>
              <p>
                <b>Current:</b>{" "}
                {trip.currentLocation
                  ? `${trip.currentLocation.latitude.toFixed(4)}, ${trip.currentLocation.longitude.toFixed(4)}`
                  : "Location updating..."}
              </p>
              <p>
                <b>Start:</b>{" "}
                {trip.startLocation
                  ? `${trip.startLocation.latitude.toFixed(4)}, ${trip.startLocation.longitude.toFixed(4)}`
                  : "N/A"}
              </p>
              <p><b>Created At:</b> {new Date(trip.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}

        <div className="dashboard-card gradient-purple" style={{ marginTop: "20px" }}>
          <h3>Total Trips: {allTrips.length}</h3>
          <p>Last update: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>

      {/* Right: Map */}
      <div style={{ flex: 1, marginTop: "170px" }}>
        {user && <MapPopup hospital={user} trips={activeTrips} />}
      </div>
    </div>
  );
}

export default Dashboard;
