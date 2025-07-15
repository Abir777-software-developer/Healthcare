import React, { useState, useEffect } from "react";
import { toaster } from "../components/ui/toaster";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Field,
  Fieldset,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import logo from "../assets/rotating-logo.png";
function Signup() {
  const [name, setname] = useState("");
  const [show, setshow] = useState(false);
  const [email, setemail] = useState("");
  const [confirmpassword, setconfirm] = useState("");
  const [password, setpass] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleclick = () => setshow(!show);
  const submithandler = async (e) => {
    e.preventDefault();
    setloading(true);
    if (!name || !email || !password || !confirmpassword) {
      toaster.create({
        title: "All the fields required",
        description: "Please fill all the fields",
        type: "info",
        duration: 5000,
        closable: true,
      });
      setloading(false);
      return;
    }
    if (password !== confirmpassword) {
      toaster.create({
        title: "Incorrect Password",
        description: "Password doesnot match",
        type: "info",
        duration: 5000,
        closable: true,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/auth/signup",
        { name, email, password },
        config
      );
      toaster.create({
        description: "Signup successful",
        type: "info",
        duration: 5000,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setloading(false);
      navigate("/Homepage");
    } catch (error) {
      toaster.create({
        title: "Error occured",
        description: error.response.data.message || "something went wrong",
        type: "info",
        duration: 5000,
      });
      setloading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="web-heading">Welcome to Title</h1>
      <div className="logo-wrapper">
        <img
          src={logo}
          alt="logo"
          className="rotating-logo"
          //style={{ borderRadius: "50%" }}
        />
      </div>
      <form className="signup-form">
        <Fieldset.Root
          size="lg"
          style={{
            backgroundColor: "#ea7e5a",
            padding: "3rem",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            // width: "500%",
            // maxWidth: "500px",
          }}
        >
          <Stack align="center" textAlign="center" mb="4">
            <Fieldset.Legend
              style={{ color: "black", fontSize: "3rem", fontWeight: "bold" }}
            >
              SIGN-UP
            </Fieldset.Legend>
            <Fieldset.HelperText
              style={{
                color: "black",
                fontSize: "1.2rem",
                paddingTop: "1.5rem",
              }}
            >
              Please provide your details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root orientation="horizontal" id="namefield">
              <Field.Label
                htmlFor="signup-name"
                style={{ fontSize: "17px", fontWeight: "bold", color: "black" }}
              >
                Name
              </Field.Label>
              <Input
                id="signup-name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                // style={{
                //   backgroundColor: "#1f1f1f",
                //   border: "1px solid #444",
                //   color: "white",
                //   padding: "0.75rem",
                //   borderRadius: "6px",
                // }}
                className="responsive-input"
              />
            </Field.Root>

            <Field.Root orientation="horizontal" id="emailfield">
              <Field.Label
                htmlFor="signup-email"
                style={{ fontSize: "17px", fontWeight: "bold", color: "black" }}
              >
                Email
              </Field.Label>
              <Input
                id="signup-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                // style={{
                //   backgroundColor: "#1f1f1f",
                //   border: "1px solid #444",
                //   color: "white",
                //   padding: "0.75rem",
                //   borderRadius: "6px",
                // }}
                className="responsive-input"
              />
            </Field.Root>

            <Field.Root orientation="horizontal" id="passfield">
              <Field.Label
                htmlFor="signup-pass"
                style={{ fontSize: "17px", fontWeight: "bold", color: "black" }}
              >
                Password
              </Field.Label>
              <InputGroup
                flex="1"
                endElement={
                  <Button
                    className="responsive-show-button"
                    h="1.75rem"
                    size="sm"
                    onClick={handleclick}
                    colorPalette="blue"
                    // style={{
                    //   backgroundColor: "#2563eb",
                    //   color: "white",
                    //   fontWeight: "bold",
                    //   padding: "0.75rem",
                    //   transition: "all 0.3s ease",
                    // }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#1e40af")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2563eb")
                    }
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                }
              >
                <Input
                  id="signup-pass"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setpass(e.target.value)}
                  className="responsive-input"
                  // style={{
                  //   backgroundColor: "#1f1f1f",
                  //   border: "1px solid #444",
                  //   color: "white",
                  //   padding: "0.75rem",
                  //   borderRadius: "6px",
                  //   padd
                  // }}
                />
              </InputGroup>
            </Field.Root>
            <Field.Root orientation="horizontal" id="conpassfield">
              <Field.Label
                htmlFor="signup-conpass"
                style={{ fontSize: "17px", fontWeight: "bold", color: "black" }}
              >
                Confirm
              </Field.Label>
              <InputGroup
                flex="1"
                endElement={
                  <Button
                    className="responsive-show-button"
                    h="1.75rem"
                    size="sm"
                    onClick={handleclick}
                    colorPalette="blue"
                    // style={{
                    //   backgroundColor: "#2563eb",
                    //   color: "white",
                    //   fontWeight: "bold",
                    //   padding: "0.75rem",
                    //   //transition: "all 0.3s ease",
                    // }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#1e40af")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2563eb")
                    }
                  >
                    {show ? "Hide" : "Show"}
                  </Button>
                }
              >
                <Input
                  className="responsive-input"
                  id="consignup-pass"
                  type={show ? "text" : "password"}
                  placeholder="Confirm the password"
                  value={confirmpassword}
                  onChange={(e) => setconfirm(e.target.value)}
                  // style={{
                  //   backgroundColor: "#1f1f1f",
                  //   border: "1px solid #444",
                  //   color: "white",
                  //   padding: "0.75rem",
                  //   borderRadius: "6px",
                  // }}
                />
              </InputGroup>
            </Field.Root>
          </Fieldset.Content>

          <Button
            colorPalette="blue"
            width="100%"
            style={{
              marginTop: "30px",
              backgroundColor: "#2563eb",
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem",
              borderRadius: "8px",
              cursor: "pointer",
              border: "none",
              transition: "all 0.3s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
            onClick={submithandler}
            loading={loading}
          >
            Sign-Up
          </Button>
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <span style={{ color: "black" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#3b82f6", textDecoration: "underline" }}
              >
                Login here
              </Link>
            </span>
          </div>
        </Fieldset.Root>
      </form>
      <style>
        {`
          @keyframes rotateLogoHorizontal {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          .web-heading {
            position: absolute;
            top: 0.1rem;
            width: 100%;
            text-align: center;
            font-size: 3rem;
            font-weight: 600;
            color: #1f2937;
            font-family: 'Segoe UI';
            border-bottom: 2px solid  #1f2937; 
            padding-bottom: 0rem; 
            width: fit-content;
            margin: 0 auto;
          }
          .signup-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            
            background-color: #e14141; 
            top:1rem;
            position:relative
            }

          .logo-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            padding: 1rem;
             margin-top: 4rem;
            margin-right: 2rem;
          }

          .rotating-logo {
            width: 450px;
            height: 450px;
            animation: rotateLogoHorizontal 8s linear infinite;
            object-fit: cover;
            border-radius: 50%;
          }

          .signup-form {
            width: 100%;
            max-width: 500px;
            padding: 1rem;
            margin-top: 6rem;
          }
          .responsive-input {
            background-color: #1f1f1f;
            border: 1px solid #444;
            color: white;
            padding: 0.75rem;
            border-radius: 6px;
            width: 100%;
          }
            .responsive-show-button {
            background-color: #2563eb;
            color: white;
            font-weight: bold;
            padding: 0.75rem;
            transition: all 0.3s ease;
          }
          @media (max-width: 768px) {
            .signup-container {
              flex-direction: column;
              justify-content: center;
              padding: 2rem 1rem;
              background-color: #e14141;
            }
            .web-heading {
              display: none;
            }
            .logo-wrapper {
              width: 100%;
              margin-top: 2rem;
            }
            .rotating-logo {
              width: 280px;
              height: 280px;
              margin-bottom:2rem;
              margin-left:1rem
            }
            .signup-form {
              width: 100%;
               padding: 0;
               margin-top: 0;
              
            }
               .responsive-input::placeholder {
              font-size: 0.5rem;
            }

            .responsive-show-button {
              padding: 0.2rem 0.2rem;
              font-size: 0.75rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Signup;
