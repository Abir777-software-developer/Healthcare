import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import bgcol from "./assets/diffcolor.jpg";
import "./App.css";

function App() {
  return (
    <div
      //style={{ backgroundColor: "#e14141", minHeight: "100vh", color: "white" }}
      style={{
        backgroundImage: { bgcol },
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
