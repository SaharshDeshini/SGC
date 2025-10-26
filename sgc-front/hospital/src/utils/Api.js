// const BACKEND_URL = "http://localhost:5000"; // adjust if deployed

// // 🔐 Hospital Login
// export async function loginHospital(username) {
//   try {
//     // For now we just match hospitalId == username (password optional)
//     const res = await fetch(`${BACKEND_URL}/hospital/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ hospitalId: username }),
//     });

//     if (!res.ok) return null;
//     const data = await res.json();
//     return data.hospital;
//   } catch (err) {
//     console.error("Login failed:", err);
//     return null;
//   }
// }

// // 🚑 Get Active Trips
// export async function getActiveTrips(hospitalCode) {
//   try {
//     // 1️⃣ Fetch all hospitals
//     const hospitals = await fetch(`${BACKEND_URL}/hospital/all`).then(r => r.json());

//     // 2️⃣ Find hospital ID from code
//     const hospital = hospitals.find(h => h.code === hospitalCode);
//     if (!hospital) {
//       console.error(`Hospital with code ${hospitalCode} not found`);
//       return [];
//     }
//     const hospitalId = hospital.id;

//     // 3️⃣ Fetch active trips using Firestore ID
//     const res = await fetch(`${BACKEND_URL}/hospital/trips/active/${hospitalId}`);
//     if (!res.ok) return [];

//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching active trips:", err);
//     return [];
//   }
// }

// // 🕒 Get All Trips (History)
// export async function getAllTrips(hospitalId) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/hospital/trips/all/${hospitalId}`);
//     if (!res.ok) return [];
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching all trips:", err);
//     return [];
//   }
// }













const BACKEND_URL = "http://localhost:5000"; // adjust if deployed

// 🔐 Hospital Login
// export async function loginHospital(hospitalId) {
//   try {
//     const res = await fetch(`${BACKEND_URL}/hospital/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ hospitalId }),
//     });

//     if (!res.ok) return null;
//     const data = await res.json();
//     return data.hospital;
//   } catch (err) {
//     console.error("Login failed:", err);
//     return null;
//   }
// }
export async function loginHospital(hospitalId) {
  try {
    const res = await fetch(`${BACKEND_URL}/hospital/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hospitalId }),
    });

    if (!res.ok) return null;

    const data = await res.json();

    // Store the full hospital object (including location) in localStorage
    localStorage.setItem("hospitalUser", JSON.stringify(data.hospital));

    return data.hospital;
  } catch (err) {
    console.error("Login failed:", err);
    return null;
  }
}

// Helper: Get Firestore ID from hospitalId
async function getHospitalIdFromCode(hospitalId) {
  try {
    const res = await fetch(`${BACKEND_URL}/hospital/all`);
    if (!res.ok) throw new Error("Failed to fetch hospitals list");
    const hospitals = await res.json();

    const hospital = hospitals.find(h => h.hospitalId === hospitalId);
    if (!hospital) throw new Error(`Hospital with id "${hospitalId}" not found`);

    return hospital.id; // Firestore document ID
  } catch (err) {
    console.error("Error fetching hospital ID:", err);
    throw err;
  }
}

// 🚑 Get Active Trips
export async function getActiveTrips(hospitalId) {
  try {
    const firestoreId = await getHospitalIdFromCode(hospitalId);
    const res = await fetch(`${BACKEND_URL}/hospital/trips/active/${firestoreId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Error fetching active trips:", err);
    return [];
  }
}

// 🕒 Get All Trips (History)
export async function getAllTrips(hospitalId) {
  try {
    const firestoreId = await getHospitalIdFromCode(hospitalId);
    const res = await fetch(`${BACKEND_URL}/hospital/trips/all/${firestoreId}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (err) {
    console.error("Error fetching all trips:", err);
    return [];
  }
}
