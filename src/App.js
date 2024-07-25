import React, { useRef, useState, useEffect } from "react";
import { Viewer, Entity } from "resium";
import {
  Cartesian3,
  HeadingPitchRoll,
  Math as CesiumMath,
  Transforms,
  Ion,
} from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";
// import "../public/cesium/Assets/Glb/Cesium_Air.glb";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDM4YThjZi1jMTVhLTRlN2ItYTFhNi0wNTA0MWMzMDhmNWEiLCJpZCI6MjMwNDU5LCJpYXQiOjE3MjE4MTI0MzB9.IaT-OLUu3bForPze6C6M_6xCLiY_I43k3PZQ4h-IrgA";

function App() {
  const viewerRef = useRef(null);
  const [droneModel, setDroneModel] = useState(null);

  useEffect(() => {
    const position = Cartesian3.fromDegrees(127.0462, 37.2599, 150.0);
    const heading = CesiumMath.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new HeadingPitchRoll(heading, pitch, roll);
    const orientation = Transforms.headingPitchRollQuaternion(position, hpr);

    setDroneModel(
      <Entity
        name="Drone"
        position={position}
        orientation={orientation}
        model={{
          uri: "cesium/Assets/Glb/Cesium_Air.glb",
          test: "",
          minimumPixelSize: 200,
          maximumScale: 200,
        }}
      />
    );
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer full ref={viewerRef}>
        {droneModel}
      </Viewer>
    </div>
  );
}

export default App;
