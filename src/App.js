import React, { useRef, useState, useEffect } from "react";
import { Viewer, Entity } from "resium";
import {
  Cartesian3,
  HeadingPitchRoll,
  Math as CesiumMath,
  Transforms,
  Ion,
  Cartographic,
} from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

function App() {
  const viewerRef = useRef(null);
  const [droneModel, setDroneModel] = useState(null);
  const [longitude, setLongitude] = useState(127.0462);
  const [latitude, setLatitude] = useState(37.2599);

  useEffect(() => {
    const position = Cartesian3.fromDegrees(longitude, latitude, 150.0);
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
  }, [longitude, latitude]);

  const handleClick = (e) => {
    const viewer = viewerRef.current.cesiumElement;
    const scene = viewer.scene;
    const cartesian = scene.pickPosition(e.position);
    if (cartesian) {
      const cartographic = Cartographic.fromCartesian(cartesian);
      const latitude = CesiumMath.toDegrees(cartographic.latitude);
      const longitude = CesiumMath.toDegrees(cartographic.longitude);
      setLongitude(longitude);
      setLatitude(latitude);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer full ref={viewerRef} onClick={handleClick}>
        {droneModel}
      </Viewer>
    </div>
  );
}

export default App;
