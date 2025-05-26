import React from 'react';
import "./Stylesheet.css";
import Navbar from "./Navbar";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
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
var length = 0;

const [state, setState] = "";



const Attendance = () => {
    var Data = ["18RJ1A05D1", "18RJ1A05D2", "18RJ1A05D3", "18RJ1A05D4", "18RJ1A05D5", "18RJ1A05D6", "18RJ1A05D7", "18RJ1A05D8", "18RJ1A05D9", "18RJ1A05E0", "18RJ1A05E1", "18RJ1A05E2", "18RJ1A05E3", "18RJ1A05E4", "18RJ1A05E5", "18RJ1A05E6", "18RJ1A05E7", "18RJ1A05E8", "18RJ1A05E9", "18RJ1A05F0", "18RJ1A05F1", "18RJ1A05F2", "18RJ1A05F3", "18RJ1A05F4", "18RJ1A05F5", "18RJ1A05F6", "18RJ1A05F7", "18RJ1A05F8", "18RJ1A05F9", "18RJ1A05G0", "18RJ1A05G1", "18RJ1A05G2", "18RJ1A05G3", "18RJ1A05G4", "18RJ1A05G5", "18RJ1A05G6", "18RJ1A05G7", "18RJ1A05G8", "18RJ1A05G9", "18RJ1A05H0", "18RJ1A05H1", "18RJ1A05H2", "18RJ1A05H3", "18RJ1A05H4", "18RJ1A05H5", "18RJ1A05H6", "18RJ1A05H7", "18RJ1A05H8", "18RJ1A05H9", "18RJ1A05J0", "18RJ1A05J1", "18RJ1A05J2", "18RJ1A05J3", "18RJ1A05J4", "18RJ1A05J5", "18RJ1A05J6", "18RJ1A05J7", "18RJ1A05J8", "18RJ1A05J9", "18RJ1A05K0", "18RJ1A05K1", "18RJ1A05K2", "18RJ1A05K3", "18RJ1A05K4", "18RJ1A05K5", "18RJ1A05K6", "18RJ1A05K7", "18RJ1A05K8", "18RJ1A05K9", "18RJ1A05L0"];
    var status = "true";
    if (localStorage.getItem("SESSION_KEY") === "TRUE") {
        get(child(ref(getDatabase()), `attendanceStatus`)).then((data) => {
            if (data.val() === "TRUE") {
                window.open("/ViewTodaysReport", "_self");
            }
        }).catch(e => { })
        return (
            <center>
                <Navbar />
                {
                    Data.map((e) => {
                        return (
                            <div className="Student" key={e}>
                                <span>{e}</span>
                                <input id={e} className="classStudent" type="checkbox" value={e} />
                            </div>)
                    })
                }
                <button onClick={() => {
                    // On click, we are preparing a json data, that will be stored into the database. (ams-vap) db
                    var Students = [];
                    var j = 0;
                    for (var i = 0; i < Data.length; i++) {
                        if (document.querySelectorAll(".classStudent")[i].checked) {
                            // If the box is checked / ticked then we are writing data as {"roll_number" : "present"}
                            var RollNumber_Present = document.querySelectorAll(".classStudent")[i].value;
                            // The first record doesnt need a comma at first, so we are preparing record as {data}
                            if (j == 0) {
                                Students[j] = `{"id" : "${RollNumber_Present}" , "is": "present" }`;
                                j++;
                            }
                            // Record will be prepared as , {data}
                            else {
                                Students[j] = `,{"id" : "${RollNumber_Present}" , "is": "present" }`;
                                j++;
                            }
                        }
                        // If the box is not checked / not ticked then we are writing data as {"roll_number" : "absent"}
                        else {
                            var RollNumber_Absent = document.querySelectorAll(".classStudent")[i].value;
                            if (j == 0) {
                                Students[j] = `{"id" : "${RollNumber_Absent}" , "is": "absent" }`;
                                j++;
                            }
                            else {
                                Students[j] = `,{"id" : "${RollNumber_Absent}" , "is": "absent" }`;
                                j++;
                            }
                        }
                    }
                    // Collecting json from array, and preparing data.
                    var JSON_Data = "";
                    for (var k = 0; k < Students.length; k++) {
                        JSON_Data += (Students[k].replaceAll("`", ""));
                    }
                    JSON_Data = `{ "Students" : ` + "[" + JSON_Data + "]" + "}";
                    // console.log(JSON_Data);
                    // JSON data id finally prepared, and it looks like,,
                    /*
                    { "Student" : [
                        {"id" : "roll_number" , "is" :  "present"},
                        {"id" : "roll_number" , "is" :  "absent"}
                    ]}
                    // Student is the parent of JSON data.
                    */
                    const db = getDatabase();
                    var dateOf = new Date().getDate() + "/" + (parseInt(new Date().getMonth()) + 1) + "/" + new Date().getFullYear();
                    // Getting todays date information so that to uniquely store into the database (ams-vap) db.
                    /* Writing the JSON data to the database, as data as the parent to today_unique_id, this todays_unique_id will act as parent to Student (JSON data);
                    */
                    get(child(ref(getDatabase()), `data`)).then((dataLength) => {
                        set(ref(db, `data/${dataLength.val().length}`), JSON_Data);
                        set(ref(db, `updatedOn`), dateOf);
                        set(ref(db, `attendanceStatus`), "TRUE");
                    }).catch(e => { })
                    setTimeout(() => {
                        // We will be redirected to another page : /ViewTodaysReport, which analyzes and classifies the data as per presentees and absentees.
                        window.open("/ViewTodaysReport", "_self");
                    }, 3000);
                }}>Submit</button><br />
            </center>
        )
    }
    else {
        alert("Unauthorized user encountered, you need to first login, then only you can access this application.")
    }
}
export default Attendance;