// VectorGame.jsx
import React, { useState } from "react";
import VectorGameCanvas from "./CanvasModes/VectorGameCanvas";
import VectorInfoPanel from "./InfoPanels/VectorInfoPanel";

export default function VectorGame() {
  const [v1, setV1] = useState({ x: 100, y: 50 });
  const [v2, setV2] = useState({ x: -80, y: 40 });

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <VectorGameCanvas v1={v1} v2={v2} setV1={setV1} setV2={setV2} />
      <VectorInfoPanel v1={v1} v2={v2} />
    </div>
  );
}