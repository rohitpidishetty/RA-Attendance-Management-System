import React from "react";
import Navbar from "./Navbar";
import { getDatabase, ref, child, get } from "firebase/database";
import { initializeApp } from "firebase/app";
import "./Stylesheet2.css";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdm7hOT1A4aESIEADlBwMfMdzspoUh8ek",
    authDomain: "ams-vap.firebaseapp.com",
    projectId: "ams-vap",
    storageBucket: "ams-vap.appspot.com",
    messagingSenderId: "891049989013",
    appId: "1:891049989013:web:e2b0523b26b86c3418dc9c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

var data = [];
var i = 0;
var Report = [];

get(child(dbRef, "data")).then((e) => {
    if (e.exists()) {
        // console.log(JSON.stringify(e.val()));
        data[i] = e.val();
        i++;
    }
    else {
        console.log("No data");
    }
    // console.log(data[0][0]);
}).catch((e) => {
    console.log("Error");
})
var percentageList = [];
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

function applyCondition() {
    document.getElementById("conditionalData").innerHTML = " ";
    var numOfstudents = 0;
    var num = prompt("Enter percentage", "Enter a number");
    if (num.charAt(0) == "L") {
        if (parseInt(num.replaceAll("L", " ").trim()) >= 0 && parseInt(num.replaceAll("L", " ").trim()) <= 100) {
            var data = "";
            for (var i = 0; i < sList.length; i++) {
                if (parseInt(percentageList[i].replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("/", "").split(" ")[2].trim()) < parseInt(num.replaceAll("L", " ").trim())) {
                    numOfstudents++;
                    // console.log(percentageList[i])
                    document.getElementById("conditionalData").innerHTML += `<tr class="_sap_">${percentageList[i]}</tr>`;
                }
            }
            document.getElementById("conditionalData").innerHTML += `<p style="background-color:gray;color:white;border-radius: 5px;padding:10px">${numOfstudents} / 70 Students</p>`
        }
        else {
            document.getElementById("conditionalData").innerHTML = `<p style="background-color:lightgray;color:white;border-radius: 5px;padding:10px">Enter a valid condition</p>`;
        }
    }
    else {
        if (parseInt(num.trim()) >= 0 && parseInt(num.trim()) <= 100) {
            var data = "";
            for (var i = 0; i < sList.length; i++) {
                if (parseInt(percentageList[i].replaceAll("<td>", "").replaceAll("</td>", "").replaceAll("/", "").split(" ")[2].trim()) > num) {
                    numOfstudents++;
                    // console.log(percentageList[i])
                    document.getElementById("conditionalData").innerHTML += `<tr class="_sap_">${percentageList[i]}</tr>`;
                }
            }
            document.getElementById("conditionalData").innerHTML += `<p style="background-color:gray;color:white;border-radius: 5px;padding:10px">${numOfstudents} / 70 Students</p>`
        }
        else {
            document.getElementById("conditionalData").innerHTML = `<p style="background-color:lightgray;color:white;border-radius: 5px;padding:10px">Enter a valid condition</p>`;
        }
    }
}


const View = () => {
    document.getElementById("loading").setAttribute("src", "loader.gif");
    document.getElementById("message").innerHTML = "Loading data, please wait.";
    setTimeout(() => {
        for (var student = 0; student < sList.length; student++) {
            var persentage = "";
            var numberOfStudents =
                data[0][0].slice(data[0][0].indexOf("[") + 1, data[0][0].length - 2).split(",")
                    .length / 2;
            // console.log(JSON.parse(data[0][1]).Students[1])
            // console.log(data[0].length)
            for (var i = 0; i < data[0].length; i++) {
                for (var j = 0; j < numberOfStudents; j++) {
                    if (JSON.parse(data[0][i]).Students[j].id === sList[student]) {
                        persentage += JSON.parse(data[0][i]).Students[j].is + " ";
                    }
                }
            }
            var details = persentage.trim().split(" ");
            var days = details.length;
            var percent = 0;
            for (var k = 0; k < days; k++) {
                if (persentage.trim().split(" ")[k] === "present") {
                    percent++;
                }
            }
            // sap = students attendance percentage
            percentageList[student] =
                `<td>${sList[student]}</td>  <td>${Math.round((percent / days) * 100)}%</td> <td>${percent} / ${days}</td>`;
            document.getElementById("overAllPercentage").innerHTML += `<tr class="sap"><td>${sList[student]
                }</td>  <td>${Math.round((percent / days) * 100) + "%"}</td>  <td>${percent} / ${days}</td></tr>`;
        }
        document.getElementById("apply").style.visibility = "visible";
        document.querySelector(".Sap_").style.visibility = "visible";
        document.getElementById("load").style.visibility = "hidden";
        document.getElementById("getData").style.visibility = "hidden";
        document.getElementById("D").style.visibility = "visible";
    }, 5000)
}


const VAP = () => {
    setTimeout(() => {
        document.getElementById("getData").addEventListener("click", () => {
            document.getElementById("getData").style.visibility = "hidden";
        })
    }, 30)
    return (
        <center id="vap_class">
            {/* Loader */}
            <Navbar />
            <div id="load">
                <center>
                    <img id="loading" src="#" alt="" />
                    <p id="message">View students attendance percentage, and also know about how many days they have been present to the college. You can even filter the resultant report according to their percentage, by clicking on filter option, and enter a number ranging from 1 - 100. Get data of the students who meet the condonation criteria by typing in L60, get data of the students whose percentage is less than 50, by L50. Append L to number N, to get lesser than percentages.</p>
                </center>
            </div>
            <center id="D">
                <table id="conditionalData"> </table>
                <p id="apply" onClick={applyCondition}>Filter percentage</p>
                <table id="overAllPercentage">
                    <tr class="sap Sap_">
                        <td>Roll Number</td>
                        <td>Percentage</td>
                        <td>Days</td>
                    </tr>
                </table>
            </center>
            <button id="getData" onClick={View}>Generate Overall Report</button>
        </center>

    )
}
export default VAP;