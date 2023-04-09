// javascript

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
        
// firebase config
const firebaseConfig = {
            apiKey: "AIzaSyDW9v98-UqTVEa4vtUa8wemnNndPdkWAjI",
            authDomain: "lab-automation-v1.firebaseapp.com",
            databaseURL: "https://lab-automation-v1-default-rtdb.firebaseio.com",
            projectId: "lab-automation-v1",
            storageBucket: "lab-automation-v1.appspot.com",
            messagingSenderId: "1054970112058",
            appId: "1:1054970112058:web:b302875b149a1956ae2d03",
            measurementId: "G-JZSWK2S4VN"
        }
        
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, get, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();


// function to toggle state of device on click
function ToggleData(dir, device) {
    console.log(device);
    const dbref = ref(db);
    // let currState;
    dir = dir + "/";
    get(child(dbref, dir + device)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log(snapshot.val());
            let value = snapshot.val();
            console.log(value);

            // toggling/updating data
            let newValue = !(value);
            update(ref(db, dir), {
                [device] : newValue
            })
                .then(() => {
                    console.log("data stored successfully " + device + " " + newValue);                  
                })
                .catch((error) => {
                    console.log("unsuccessful, error: " + error);
                });
        }
        else {
            console.log("No data found: " + device);
        }
    })
        .catch((error) => {
            console.log("unsuccessful, error" + error);
        });

}

// ToggleData("Room1", "im5")  // function call to toggle data to check whether it worls properly or not

// function to generate key-value pairs in database
function SetData(dir, device) {
    dir = dir + "/"
    update(ref(db, dir), {
        [device]: false
        
    })
        .then(() => {
            console.log("data updated successfully");
        })
        .catch((error) => {
            console.log("unsuccessful, error: " + error);
        });
}

        

// // Driver for set function
// for (let i = 0; i < 9; i++) {
//     let v = "im" + (i+1);
//     SetData("Room1", v);
// };


// list of paths to the images
const room1On = ['/res/Room1/r1_on_1_tl.jpg', '/res/Room1/r1_on_2_tc.jpg', '/res/Room1/r1_on_3_tr.jpg', '/res/Room1/r1_on_4_ml.jpg', '/res/Room1/r1_on_5_mc.jpg', '/res/Room1/r1_on_6_mr.jpg', '/res/Room1/r1_on_7_bl.jpg', '/res/Room1/r1_on_8_bc.jpg', '/res/Room1/r1_on_9_br.jpg'];

const room1Off = ['/res/Room1/r1_off_1_tl.jpg', '/res/Room1/r1_off_2_tc.jpg', '/res/Room1/r1_off_3_tr.jpg', '/res/Room1/r1_off_4_ml.jpg', '/res/Room1/r1_off_5_mc.jpg', '/res/Room1/r1_off_6_mr.jpg', '/res/Room1/r1_off_7_bl.jpg', '/res/Room1/r1_off_8_bc.jpg', '/res/Room1/r1_off_9_br.jpg'];

const room2On = ['/res/Room2/r2_on_1_tl.jpg', '/res/Room2/r2_on_2_tc.jpg', '/res/Room2/r2_on_3_tr.jpg', '/res/Room2/r2_on_4_bl.jpg', '/res/Room2/r2_on_5_bc.jpg', '/res/Room2/r2_on_6_br.jpg'];

const room2Off = ['/res/Room2/r2_off_1_tl.jpg', '/res/Room2/r2_off_2_tc.jpg', '/res/Room2/r2_off_3_tr.jpg', '/res/Room2/r2_off_4_bl.jpg', '/res/Room2/r2_off_5_bc.jpg', '/res/Room2/r2_off_6_br.jpg'];

const room3On = ['/res/Room3/r3_on_1_l.jpg', '/res/Room3/r3_on_2_c.jpg', '/res/Room3/r3_on_3_r.jpg'];

const room3Off = ['/res/Room3/r3_off_1_l.jpg', '/res/Room3/r3_off_2_c.jpg', '/res/Room3/r3_off_3_r.jpg'];


// function to render images

// event listner
const images = document.querySelectorAll('.ind-imgs');

images.forEach(image => {
  image.addEventListener('click', function handleClick(event) {
    //   console.log('box clicked', event.target.classList[0]);
        let eleClass0 = String(event.target.classList[0]);
      let dir = "";
      if (eleClass0 == "img-room1") {
          dir = "Room1";
      } else if (eleClass0 == "img-room2") {
          dir = "Room2";
      } else if (eleClass0 == "img-room3") {
          dir = "Room3";
      }

      let device = String(event.target.id).slice(3)
      console.log(dir, device);

      
      ToggleData(dir, device);
  });
});


// oldValues List
let oldValuesR1 = []
let oldValuesR2 = []
let oldValuesR3 = []

let currentValuesR1 = []
let currentValuesR2 = []
let currentValuesR3 = []


// looking for updates n room1
const dataRoom1Ref = ref(db, '/');
onValue(dataRoom1Ref, (snapshot) => {
    const data1 = snapshot.val().Room1;
    const data2 = snapshot.val().Room2;  
    const data3 = snapshot.val().Room3;
    
    //   console.log(data1);
    
    currentValuesR1 = getList(data1);
    currentValuesR2 = getList(data2);
    currentValuesR3 = getList(data3);
        

    console.log("currentValuesR1: ", currentValuesR1);
    console.log("currentValuesR2: ", currentValuesR2);
    console.log("currentValuesR3: ", currentValuesR3);
    //   console.log("oldValuesR1: " + oldValuesR1);
    
   
    oldValuesR1 = currentValuesR1;
    oldValuesR2 = currentValuesR2;
    oldValuesR3 = currentValuesR3;
    //   console.log(oldValuesR1);

    renderAllImgs(currentValuesR1, currentValuesR2, currentValuesR3);
});



// function to convert the JSON data object fetched from firebase to List
function getList(data){
    var convert  = Object.keys(data).map(function(key)  
    {  
        return data[key];  
    }); 
    return convert;  
}


// function to render images
function renderAllImgs(currVal1, currVal2, currVal3) {
    // console.log("currVal1",currVal1);
    // console.log("currVal2",currVal2);
    // console.log("currVal3",currVal3);


    Object.keys(images).forEach(img => {
        // console.log(Number(img));
        // console.log(images[i].src);
        // let img = Number(img);

        if (img >= 0 && img <= 8) {
            if (currVal1[img]) {
                images[img].src = room1On[img];
            } else {
                images[img].src = room1Off[img];
            }
        }
        else if (img >= 9 && img <= 14) {
            let imgr2 = img - 9;
            // console.log(imgr2);

            if (currVal2[imgr2]) {
                images[img].src = room2On[imgr2];
            } else {
                images[img].src = room2Off[imgr2];
            }
        } 
        else if (img >= 15 && img <= 17) {

            let imgr3 = img - 15;


            if (currVal3[imgr3]) {
                images[img].src = room3On[imgr3];
            } else {
                images[img].src = room3Off[imgr3];
            }
        }
             
    })
    
}

