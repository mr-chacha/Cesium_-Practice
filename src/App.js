import React from "react";
import { Viewer } from "resium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion } from "cesium";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDM4YThjZi1jMTVhLTRlN2ItYTFhNi0wNTA0MWMzMDhmNWEiLCJpZCI6MjMwNDU5LCJpYXQiOjE3MjE4MTI0MzB9.IaT-OLUu3bForPze6C6M_6xCLiY_I43k3PZQ4h-IrgA";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer full />
    </div>
  );
}

export default App;
