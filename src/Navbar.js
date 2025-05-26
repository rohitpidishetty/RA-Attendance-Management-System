import React from "react";
import "./Stylesheet.css";
const Navbar = () => {
    var status = "";
    return (
        <nav id="nav"><p
            onClick={() => {
                if (status == "true") {
                    document.querySelector(".EssBtn").style.visibility = "visible"
                    document.querySelector("#nav").style.height = "fit-content"
                    document.querySelector(".EssBtn").style.height = "fit-content"
                    document.querySelector("#buttonArrow").setAttribute("src", "https://code-infinity-a353a.web.app/up.png");
                    document.getElementById("essentials1").style.visibility = "visible"
                    document.getElementById("essentials").style.visibility = "visible"

                    status = "flase";
                }
                else {
                    document.getElementById("essentials1").style.visibility = "hidden"
                    document.getElementById("essentials").style.visibility = "hidden"
                    setTimeout(() => {
                        document.querySelector(".EssBtn").style.visibility = "hidden"
                        document.querySelector(".EssBtn").style.height = "unset"
                        document.querySelector("#nav").style.height = "55px"
                    }, 450)
                    document.querySelector("#buttonArrow").setAttribute("src", "https://code-infinity-a353a.web.app/down.png");
                    status = "true";
                }
            }}
            id="Bt">Attendance Management System
            <img id="buttonArrow" src="https://code-infinity-a353a.web.app/down.png" /></p>
            <div className="EssBtn">
                <p className="reportBtns" id="essentials1"
                    onClick={() => {
                        // Click to view todays classification.
                        window.open("/ViewTodaysReport", "_self");
                    }}>View todays attendance</p>
                <p className="reportBtns" id="essentials"
                    onClick={() => {
                        // It is now linked to another program, which is connected to different database, which helps in analysis purpose.
                        // To get upto date attendance percentage of the student.
                        window.open("/VAP", "_self");
                    }}>View overall report</p>
            </div>
        </nav>
    )
}
export default Navbar;