// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD93cfWXxiioGy_HZLqPDJGXSeQCRvGtBg",
    authDomain: "food-687dc.firebaseapp.com",
    databaseURL: "https://food-687dc-default-rtdb.firebaseio.com",
    projectId: "food-687dc",
    storageBucket: "food-687dc.appspot.com",
    messagingSenderId: "571085490806",
    appId: "1:571085490806:web:c27da2b3d13296f6426d57"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.getElementById("consumption-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Get the power consumption value
    const power = document.getElementById("power").value;
    
    // Get the current date and time
    const now = new Date();
    
    // Format the date and time as "day/month hrs:mins:secs AM/PM"
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    const formattedTime = `${day}/${month} ${hours}:${minutes}:${seconds} ${ampm}`;

    // Send the data to Firebase Realtime Database
    database.ref('electricityConsumption/' + now.getTime()).set({
        power: power,
        timestamp: formattedTime
    }, (error) => {
        if (error) {
            console.error("Error saving data:", error);
        } else {
            console.log("Data saved successfully!");
            alert("Data saved successfully!");
            document.getElementById("consumption-form").reset();
        }
    });
});