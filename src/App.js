import React, { useRef, useState, useEffect } from "react";
import { Viewer, Entity, Cesium3DTileset, PolylineGraphics } from "resium";
import {
  Cartesian3,
  HeadingPitchRoll,
  Math as CesiumMath,
  Transforms,
  Ion,
  Cartographic,
  Color,
} from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";

Ion.defaultAccessToken = process.env.REACT_APP_CESIUM_TOKEN;

function App() {
  const viewerRef = useRef(null);
  const [targetPosition, setTargetPosition] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(
    Cartesian3.fromDegrees(127.0462, 37.2599, 150.0)
  );
  const [pathPositions, setPathPositions] = useState([
    Cartesian3.fromDegrees(127.0462, 37.2599, 150.0),
  ]);

  useEffect(() => {
    if (targetPosition) {
      const animate = () => {
        setCurrentPosition((prevPosition) => {
          const newPosition = Cartesian3.lerp(
            prevPosition,
            targetPosition,
            0.01,
            new Cartesian3()
          );
          if (Cartesian3.distance(newPosition, targetPosition) < 1.0) {
            setPathPositions((prevPositions) => [
              ...prevPositions,
              targetPosition,
            ]);
            return targetPosition;
          }
          requestAnimationFrame(animate);
          return newPosition;
        });
      };
      requestAnimationFrame(animate);
    }
  }, [targetPosition]);

  const handleClick = (e) => {
    const viewer = viewerRef.current.cesiumElement;
    const scene = viewer.scene;
    const cartesian = scene.pickPosition(e.position);
    if (cartesian) {
      setTargetPosition(cartesian);
    }
  };

  const heading = CesiumMath.toRadians(135);
  const pitch = 0;
  const roll = 0;
  const hpr = new HeadingPitchRoll(heading, pitch, roll);
  const orientation = Transforms.headingPitchRollQuaternion(
    currentPosition,
    hpr
  );

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer full ref={viewerRef} onClick={handleClick}>
        <Entity
          name="Drone"
          position={currentPosition}
          orientation={orientation}
          model={{
            uri: "cesium/Assets/Glb/Cesium_Air.glb",
            minimumPixelSize: 900,
            maximumScale: 900,
          }}
        />
        <Cesium3DTileset url="https://assets.cesium.com/YOUR_TILESET_ASSET_ID/tileset.json" />
        <Entity>
          <PolylineGraphics
            positions={pathPositions}
            width={5}
            material={Color.WHITE}
          />
        </Entity>
      </Viewer>
    </div>
  );
}

export default App;
