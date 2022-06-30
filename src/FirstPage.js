import frontImage from "./assets/pexels-photo-5560763.jpeg";
import logo from "./assets/zapLogo-removebg-preview.png";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./frontPage.css";

function FirstPage() {
  var interval;
  const history = useHistory();
  const [isClicked, setIsCLicked] = useState({ login: false, signup: false });

  const clickHandler = () => {
    // document.getElementById("postalResults focus").innerHTML = null;
    const error = document.createElement("p");
    error.innerText = "Please Enter Valid Pincode";
    error.className = "error";
    if (document.getElementById("postalResults"))
      document.getElementById("postalResults").appendChild(error);
    else document.getElementById("postalResults focus").appendChild(error);
  };
  const postalResultsClickedHandler = (event) => {
    if (event.target.tagName === "P") {
      document.getElementById("inputField").value = event.target.innerText;
      // console.log(document.getElementById("inputField").innerText);
      document.getElementsByClassName("button findFoodButton")[0].innerText =
        "Fetching...";
      // document.getElementById("loadingButton").className =
      //   "fa fa-circle-o-notch fa-spin";
      debugger;
      setTimeout(() => {
        history.push("/foods");
        clearInterval(interval);
      }, 500);
    }
  };
  const loginClickedHandler = () => {
    history.push("/welcome/login");
    setIsCLicked({ login: true, signup: false });
    document.getElementById("dummy").className = "login_signupOverlay";
  };
  const signupClickedHandler = () => {
    history.push("/welcome/signup");
    setIsCLicked({ login: false, signup: true });
    document.getElementById("dummy").className = "login_signupOverlay";
  };
  const closeClickHandler = () => {
    history.push("/welcome");
    setIsCLicked({ login: false, signup: false });
    document.getElementById("dummy").className = "asd";
  };
  const createAccountClickHandler = () => {
    setIsCLicked({ login: false, signup: true });
  };
  const loginintoAccountClickHandler = () => {
    setIsCLicked({ login: true, signup: false });
  };
  const changeClassHandler = (event) => {
    if (document.getElementById("postalResults")) {
      document.getElementById("postalResults").id = "postalResults focus";
    } else {
      // document.getElementById("postalResults").id = "postalResults focus";
    }
  };
  const inputDivClickedHandler = (event) => {
    if (event.target.innerText === "Clear") {
      document.getElementsByClassName("cleartext")[0].style.visibility =
        "hidden";
      document.getElementById("inputField").value = null;
      document.getElementById("postalResults focus").innerHTML = null;
      document.getElementsByClassName("LocateMe")[0].style.visibility =
        "visible";
    }
  };
  const locateMeClickHandler = () => {
    function showPosition(position) {
      const error = document.createElement("p");
      error.innerText =
        "Not able to find your location! Please check location access in your settings";
      error.className = "error";
      if (document.getElementById("postalResults focus"))
        document.getElementById("postalResults focus").appendChild(error);
      else document.getElementById("postalResults").appendChild(error);
    }
    navigator.geolocation.getCurrentPosition(showPosition);
  };
  let flag = false;
  const inputChangeHandler = (event) => {
    if (flag === false) {
      const cleartext = document.createElement("span");
      cleartext.innerText = "Clear";
      cleartext.className = "cleartext";
      document.getElementById("spanText").appendChild(cleartext);
      flag = true;
    }
    document.getElementsByClassName("cleartext")[0].style.visibility =
      "visible";
    if (event.target.value.length < 1)
      document.getElementsByClassName("cleartext")[0].style.visibility =
        "hidden";
  };
  const changePincodeHandler = (event) => {
    document.getElementsByClassName("LocateMe")[0].style.visibility = "hidden";
    if (event.target.value.length < 1) {
      document.getElementsByClassName("LocateMe")[0].style.visibility =
        "visible";
    }
    if (event.target.value.length > 5) {
      console.log(event.target.value.length);
      async function func() {
        let response = await fetch(
          "https://api.postalpincode.in/pincode/" + event.target.value
        );
        var data = await response.json();
        if (data[0].PostOffice) {
          let finalArr = data[0].PostOffice.filter(
            (status) => status.DeliveryStatus === "Delivery"
          ).map((data) => data.Name);
          document.getElementById("postalResults focus").className = "newClass";
          if (document.getElementById("postalResults focus"))
            document.getElementById("postalResults focus").innerHTML = null;
          for (let i = 0; i < finalArr.length; i++) {
            const para = document.createElement("p");
            para.innerText =
              event.target.value +
              ", " +
              finalArr[i] +
              ", " +
              data[0].PostOffice[0].District +
              ", " +
              data[0].PostOffice[0].State +
              ", " +
              "India";
            para.className = "para";
            document.getElementById("postalResults focus").appendChild(para);
            if (i === finalArr.length - 1) {
              const para = document.createElement("p");
              para.innerText =
                event.target.value +
                ", " +
                data[0].PostOffice[0].District +
                ", " +
                data[0].PostOffice[0].State +
                ", " +
                "India";
              para.className = "para";
              document.getElementById("postalResults focus").appendChild(para);
            }
          }
        } else {
          document.getElementById("postalResults focus").innerHTML = null;
          const error = document.createElement("p");
          error.innerText = "Please Enter Valid Pincode";
          error.className = "error";
          document.getElementById("postalResults focus").appendChild(error);
        }
      }
      func();
    } else {
      document.getElementById("postalResults focus").innerHTML = null;
    }
  };

  (function () {
    var words = [
      "Unexpected guests?",
      "Movie marathon?",
      "Hungry?",
      "Game night?",
      "Late night at office?",
      "Cooking gone wrong?",
    ];
    var i = 0;
    interval = setInterval(function () {
      var wordTobe = words[i];
      document.getElementById("words").innerHTML = wordTobe;
      if (i === 5) i = 0;
      else i++;
    }, 3000);
  })();

  return (
    <div className="mainDoc">
      <React.Fragment>
        <div id="dummy" className="asd">
          {(isClicked.login || isClicked.signup) && (
            <div style={{"margin": '2rem'}}>
              <span onClick={closeClickHandler} className="closeButton" style={{display: 'inline-block', fontSize: "20px", cursor: 'pointer'}}>
                X
              </span>
              {isClicked.login && (
                <React.Fragment>
                  <form className="loginForm" >
                    <p style={{fontSize: "30px", marginTop: '1rem'}}>Login</p>
                    <p
                      className="createAccount"
                      onClick={createAccountClickHandler}
                      style={{marginTop: "-2rem", fontSize: "15px"}}
                    >
                      or create an account
                    </p>
                    <input
                      type="email"
                      style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px", borderBottom: 'none' }}
                      placeholder="Email-id"
                    ></input>
                    {/* <br /> */}
                    <input type="password" style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px" }} placeholder="Password"/>
                    <br />
                    <button style={{width: "300px", backgroundColor: "#8a2b06", color: "white", height:"35px"}}>LogIn</button>
                    <p style={{width: "300px", fontSize: "11.5px", marginTop: "0"}}>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
                  </form>
                </React.Fragment>
              )}
              {isClicked.signup && (
                <React.Fragment>
                  <p style={{fontSize: "30px", marginTop: '1rem'}}>Sign Up</p>
                  <p
                    className="createAccount"
                    onClick={loginintoAccountClickHandler}
                    style={{marginTop: "-2rem", fontSize: "15px"}}
                  >
                    or Login to your account
                  </p>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px", borderBottom: 'none' }}
                  ></input>
                  <input 
                  type="text" 
                  placeholder="Enter your Name"
                  style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px", borderBottom: 'none' }}
                  ></input>
                  <input 
                  type="email" 
                  placeholder="Enter your Email"
                  style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px", borderBottom: 'none' }}
                  ></input>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    style={{ display: "block", width: "300px", height: "40px", border: "1px solid black", textAlign: 'left', paddingLeft: "10px" }}
                  ></input>
                  <br />
                  <button style={{width: "300px", backgroundColor: "#8a2b06", color: "white", height:"35px"}}>Signup</button>
                  <p style={{width: "300px", fontSize: "11.5px", marginTop: "0"}}>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
                </React.Fragment>
              )}
            </div>
          )}
        </div>
        <div className="container">
          <div className="container inside">
            <img src={logo} alt="" className="logo" />
            <h1 className="appName">Z A P</h1>
            <button className="button signUp" onClick={signupClickedHandler}>
              Sign up
            </button>
            <button className="button login" onClick={loginClickedHandler}>
              Login
            </button>
            <p id="words">Cooking gone wrong?</p>
            <p>Order food from favourite restaurants near you.</p>
            <div id="spanText" onClick={inputDivClickedHandler}>
              <input
                type="text"
                placeholder="Enter your pincode"
                className="inputPincode"
                onKeyUp={changePincodeHandler}
                onFocus={changeClassHandler}
                onChange={inputChangeHandler}
                id="inputField"
                autoComplete="off"
              />
              <span className="LocateMe" onClick={locateMeClickHandler}>
                <i
                  className="fas fa-crosshairs"
                  style={{ fontSize: "13px", paddingRight: "4px" }}
                ></i>
                Locate Me
              </span>
            </div>
            <button className="button findFoodButton" onClick={clickHandler}>
              <i id="loadingButton"></i>
              Find Food
            </button>
            <div id="postalResults" onClick={postalResultsClickedHandler}></div>
            <div className="cities">
            <p>POPULAR CITIES IN INDIA</p>
            <p>
              Ahmedabad Bangalore Chennai Delhi Gurgaon Hyderabad Kolkata Mumbai
              Pune & more.
            </p>
            </div>
            <p className="feelHunger">Feel Hunger? Just <span style={{color: "#8a2b06"}}>Zzzzap</span> it!</p>
            <img src={frontImage} alt="" className="frontImage" />
          </div>
        </div>
      </React.Fragment>
      {/* <div className="jay"></div> */}
    </div>
  );
}

export default FirstPage;
