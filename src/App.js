import React from "react";
import { Viewer } from "resium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion } from "cesium";

Ion.defaultAccessToken =process.env.REACT_APP_CESIUM_TOKEN

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer full />
    </div>
  );
}

export default App;
