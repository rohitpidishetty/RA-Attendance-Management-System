import React from "react";
import "./Stylesheet3.css";
import { getDatabase, child, ref, get } from "firebase/database";
// Firebase initialization.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdm7hOT1A4aESIEADlBwMfMdzspoUh8ek",
    authDomain: "ams-vap.firebaseapp.com",
    projectId: "ams-vap",
    storageBucket: "ams-vap.appspot.com",
    messagingSenderId: "891049989013",
    appId: "1:891049989013:web:e2b0523b26b86c3418dc9c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase();
const dbRef = ref(db);
var overAllPercentage = 0;
var oP = 0;


// students roll number list.
var sList = [
    "18RJ1A05D1",
    "18RJ1A05D2",
    "18RJ1A05D3",
    "18RJ1A05D4",
    "18RJ1A05D5",
    "18RJ1A05D6",
    "18RJ1A05D7",
    "18RJ1A05D8",
    "18RJ1A05D9",
    "18RJ1A05E0",
    "18RJ1A05E1",
    "18RJ1A05E2",
    "18RJ1A05E3",
    "18RJ1A05E4",
    "18RJ1A05E5",
    "18RJ1A05E6",
    "18RJ1A05E7",
    "18RJ1A05E8",
    "18RJ1A05E9",
    "18RJ1A05F0",
    "18RJ1A05F1",
    "18RJ1A05F2",
    "18RJ1A05F3",
    "18RJ1A05F4",
    "18RJ1A05F5",
    "18RJ1A05F6",
    "18RJ1A05F7",
    "18RJ1A05F8",
    "18RJ1A05F9",
    "18RJ1A05G0",
    "18RJ1A05G1",
    "18RJ1A05G2",
    "18RJ1A05G3",
    "18RJ1A05G4",
    "18RJ1A05G5",
    "18RJ1A05G6",
    "18RJ1A05G7",
    "18RJ1A05G8",
    "18RJ1A05G9",
    "18RJ1A05H0",
    "18RJ1A05H1",
    "18RJ1A05H2",
    "18RJ1A05H3",
    "18RJ1A05H4",
    "18RJ1A05H5",
    "18RJ1A05H6",
    "18RJ1A05H7",
    "18RJ1A05H8",
    "18RJ1A05H9",
    "18RJ1A05J0",
    "18RJ1A05J1",
    "18RJ1A05J2",
    "18RJ1A05J3",
    "18RJ1A05J4",
    "18RJ1A05J5",
    "18RJ1A05J6",
    "18RJ1A05J7",
    "18RJ1A05J8",
    "18RJ1A05J9",
    "18RJ1A05K0",
    "18RJ1A05K1",
    "18RJ1A05K2",
    "18RJ1A05K3",
    "18RJ1A05K4",
    "18RJ1A05K5",
    "18RJ1A05K6",
    "18RJ1A05K7",
    "18RJ1A05K8",
    "18RJ1A05K9",
    "18RJ1A05L0"
];

// students names list.
var sNames = [
    "Amarendar Reddy",
    "Hemanth Kumar",
    "Pravalika",
    "Rahul",
    "Sindhu",
    "Tulasi gayatri",
    "Bhargavi",
    "Harini",
    "Prathap",
    "Jai kishan",
    "Vijay",
    "Vaishnav",
    "18RJ1A05E3",
    "18RJ1A05E4",
    "Sindhu",
    "Deepa",
    "Hrishikesh",
    "Jeevan",
    "Sai",
    "Rajeshwari",
    "Anil",
    "Sai krishna",
    "Sravan",
    "Malik",
    "Muskan",
    "Abhilash",
    "Bharath",
    "Bhargav",
    "18RJ1A05F9",
    "Akhila",
    "Sri Harsha",
    "Bhumika",
    "Srujan",
    "Praney",
    "Akash",
    "Rohit Vishwakarma",
    "Suvarna",
    "Priyanka",
    "Pushkar",
    "Nandhu",
    "Navya",
    "Nishitha",
    "Prince",
    "T Sujay",
    "T Bhargavi",
    "Vinay",
    "Kavya",
    "Shiva",
    "Sai vamshi",
    "Sathanna",
    "Shiva",
    "Bayi lavanya",
    "Sowmya",
    "Adarsh",
    "Vaishnavi",
    "Lokesh",
    "Sai Keerthi",
    "18RJ1A05J8",
    "Janak",
    "Himaja",
    "Saichowdary",
    "Prathyusha",
    "Srinitha",
    "Amulya",
    "Lokesh",
    "Rakshitha",
    "Mani shankar",
    "Khushi",
    "Kavitha Rana",
    "Loukitha"
];


function getPercentage(rollNumber) {
    get(child(dbRef, "data")).then((data) => {
        if (data.exists()) {
            var totalNumberOfDays = data.val().length;
            console.log(totalNumberOfDays);
            document.getElementById("reportFor").innerHTML = `AMS Report for ${totalNumberOfDays} working days`;
            var collection = data.val();
            // console.log(collection[n])
            for (var i = 0; i < totalNumberOfDays; i++) {
                for (var j = 0; j < 70; j++) {
                    if (JSON.parse(collection[i]).Students[j].id == rollNumber) {
                        if (JSON.parse(collection[i]).Students[j].is == "present") {
                            overAllPercentage++;
                        }
                    }
                }
            }
            for (var i = 0; i < sList.length; i++) {
                if (rollNumber == sList[i]) {
                    document.getElementById("percentage").innerHTML = ` <p>Department of <br /> Computer Science & Engineering <br />
                    <img src="https://mrit-599e7.web.app/cseicon.jpg" width="20%" /> <br />
                    Section : C</p>
                    <table id="vap_id">
                    <tr>
                    <td id="studentData"><p>Roll Number</p></td> 
                    <td id="studentData"><p>${sList[i]}</p></td>
                    </tr>
                    <tr>
                    <td id="studentData"><p>Name</p></td> 
                    <td id="studentData"><p>${sNames[i]}</p></td>
                    </tr>
                    <tr>
                    <td id="studentData"><p>Percentage</p></td> 
                    <td id="studentData"><p> ${Math.round((overAllPercentage / totalNumberOfDays) * 100)}%</p></td>
                    </tr>
                    <tr>
                    <td id="studentData"><p>Frequency</p></td> 
                    <td id="studentData"><p>${overAllPercentage} / ${totalNumberOfDays}</p></td>
                    </tr>
                    </table>`;
                }
            }
        }
        else {
            console.log("No data");
        }
    }).catch((e) => {
        console.log("Error");
    });
    return oP;
}

// Main function.
const VAPstudentUse = () => {
    return (
        <center id="vap-student-use">
            <nav id="reportFor">AMS Report for N working days</nav>
            <p id="percentage">
                <p>Department of <br /> Computer Science & Engineering <br />
                    <img src="https://mrit-599e7.web.app/cseicon.jpg" width="20%" /> <br />
                    Section : C</p>
                <i style={{ color: "gray" }}>Kindly enter your Roll number and click on the button,You can then view your attendance percentage, upto date.</i></p>
            <div className="VAP">
                <input id="roll_number" onClick={() => {
                    overAllPercentage = 0;
                    document.getElementById("roll_number").style.border = "1px solid lightgray";
                    document.getElementById("roll_number").value = "";
                    document.getElementById("roll_number").placeholder = "Roll number";
                }} placeholder="Roll number" />
                <button onClick={() => {
                    var rollNumber = document.getElementById("roll_number").value.trim();
                    if (rollNumber.length == 10) {
                        getPercentage(rollNumber);
                        document.getElementById("roll_number").value = "";
                        document.getElementById("roll_number").placeholder = "Roll number";
                    }
                    else {
                        document.getElementById("roll_number").style.border = "1px solid red";
                        document.getElementById("roll_number").value = "";
                        document.getElementById("roll_number").placeholder = "Enter a correct roll number";
                    }
                }}>View attendance percentage</button>
            </div>
        </center>
    )
}

export default VAPstudentUse;