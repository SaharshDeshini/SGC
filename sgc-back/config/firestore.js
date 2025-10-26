const admin = require("firebase-admin");
const serviceAccount = require("../sg-c-88977-firebase-adminsdk.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = db;





