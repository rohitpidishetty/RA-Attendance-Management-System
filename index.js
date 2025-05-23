const sms = require("fast-two-sms");
const app = require("express")();
const { getDatabase, child, ref, get } = require("firebase/database");
const { initializeApp } = require("firebase/app");

// I know these are not meant to be committed but lol, who cares!! > <
const firebaseConfig = {
    apiKey: "AIzaSyDB6R-FFy1BDsNoNMYubpoy6ZIocjqHdPA",
    authDomain: "sample-630b5.firebaseapp.com",
    databaseURL: "https://sample-630b5-default-rtdb.firebaseio.com",
    projectId: "sample-630b5",
    storageBucket: "sample-630b5.appspot.com",
    messagingSenderId: "211267709795",
    appId: "1:211267709795:web:372a2639b05a2391434156"
};
const ap = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
var dataOf = new Date().getFullYear() + "" + new Date().getMonth() + "" + new Date().getDate();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})
var parentNumbers = [];



// Database
get(child(dbRef, `data/${dataOf}`)).then((snapshot) => {
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
        var phoneNumbers = [];
        // phoneNumbers["Roll Number"] = "Phone Number";
        phoneNumbers["18RJ1A05D1"] = "8187026981";
        phoneNumbers["18RJ1A05G1"] = "7661081442";
        phoneNumbers["18RJ1A05G6"] = "9010817371";
        var i = 0;
        for (var k = 0; k < absentees.length; k++) {
            parentNumbers[i] = phoneNumbers[absentees[k]];
            i++;
        }
        // console.log(parentNumbers);
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
// Database end.

app.get("/sendSms", (req, res) => {
    var essentialFields = {
        authorization: "y2INGUd387XKuEbJtYHLshwqkxzgrS9ZORv50iPoVanWeAFjpQH473hbdk0xRjiVEagZfGrXO6UTDNeF",
        message: "MALLA REDDY INSTITUTE OF TECHNOLOGY, as your ward is absent to the college today, this is a reminder to inform parents to acknowledge the absence of your ward. Thankyou",
        numbers: parentNumbers
    }
    // sms.sendMessage(essentialFields);
    res.send("Hello");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})
