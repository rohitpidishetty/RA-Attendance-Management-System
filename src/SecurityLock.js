import React from "react";
import "./Stylesheet.css";
import { getDatabase, ref, set, get, child } from "firebase/database";
const SecurityLock = () => {
    if (localStorage.getItem("SESSION_KEY") === "TRUE") {
        get(child(ref(getDatabase()), `attendanceStatus`)).then((data) => {
            if (data.val() === "TRUE") {
                window.open("/ViewTodaysReport", "_self");
            }
            else {
                window.open("/AMSconfidentialUse", "_self");
            }
        }).catch(e => { })
    }
    else {
        return (
            <div className="security">
                <img src="logo192.png" />
                <p>Attendance Management System for CSE C</p>
                <input type="password" id="key" onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                        if (document.getElementById("key").value.trim() === "cseCams4Y") {
                            localStorage.setItem("SESSION_KEY", "TRUE");
                            get(child(ref(getDatabase()), `attendanceStatus`)).then((data) => {
                                if (data.val() === "TRUE") {
                                    window.open("/ViewTodaysReport", "_self");
                                }
                                else {
                                    window.open("/AMSconfidentialUse", "_self");
                                }
                            }).catch(e => { })
                        }
                    }
                }} placeholder="Password" />
            </div>
        )
    }
}
export default SecurityLock;