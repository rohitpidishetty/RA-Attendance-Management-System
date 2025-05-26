import React from "react";
import { initializeApp } from "firebase/app";
import "./Stylesheet.css";
import Navbar from "./Navbar";
import { getDatabase, ref, child, get, set } from "firebase/database";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


var dL = 0;
setTimeout(() => {
    // Getting todays attendance.
    const dbRef = ref(getDatabase());
    get(child(ref(getDatabase()), `data`)).then((dataLength) => {
        get(child(ref(getDatabase()), `updatedOn`)).then((status) => {
            if (status.val().split("/")[0] != new Date().getDate()) {
                set(ref(getDatabase(), `attendanceStatus`), "FALSE");
            }
        }).catch(e => { })
        get(child(ref(getDatabase()), `updatedOn`)).then((date) => {
            var day = "";
            day = date.val()
            document.getElementById("updateStatus").innerHTML += day;
        }).catch(e => { })
        dL = dataLength.val().length - 1;
        get(child(dbRef, `data/${dL}`)).then((snapshot) => {
            if (snapshot.exists()) {
                var data = snapshot.val();
                // console.log(data);
                var studentData = [];
                var presentees = [];
                var i = 0;
                var absentees = [];
                var j = 0;
                studentData = JSON.parse(data);
                studentData = studentData.Students;
                // console.log(studentData);
                studentData.map((e) => {
                    if (e.is === "present") {
                        presentees[i] = e.id;
                        i++;
                    } else {
                        absentees[j] = e.id;
                        j++;
                    }
                });
                document.getElementById("a_List").innerHTML += " " + absentees.length;
                document.getElementById("p_List").innerHTML += " " + presentees.length;
                for (var k = 0; k < absentees.length; k++) {
                    document.getElementById("a_data").innerHTML += `<p>${absentees[k]}</p>`;
                }
                for (var k = 0; k < presentees.length; k++) {
                    document.getElementById("p_data").innerHTML += `<p>${presentees[k]}</p>`;
                }
                // console.log(snapshot.val());
            } else {
                // console.log("No data available");
                document.querySelector(".classList").innerHTML = `<p style="border:1px solid #0c9df7;background-color: #0c9df7;color:white"><i>Attendance aren't taken yet, please take the attendance first, then try to generate the report.</i></p>`
            }
        }).catch((error) => {
            console.error(error);
        });
    }).catch(e => { })
}, 200);
const ViewList = () => {
    get(child(ref(getDatabase()), `attendanceStatus`)).then((status) => {

        if (status.val() == "FALSE") {
            window.open("/AMSconfidentialUse", "_self");
        }
    }).catch(e => { })
    return (
        <>
            <Navbar />
            <center style={{ backgroundImage: `linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)` }} id="updateStatus">Updated on </center>
            <center div className="classList">
                <div id="p_data">
                    <b><p id="p_List">Presentees list : </p><hr /></b>
                </div>
                <div id="a_data">
                    <b><p id="a_List">Absentees list : </p><hr /></b>
                </div>
            </center>
        </>
    )
}
export default ViewList;
