// FigureTransformGame.jsx
import { useState } from "react";
import FigureTransformCanvas from "./CanvasModes/FigureTransformCanvas";
import FigureTransformPanel from "./InfoPanels/FigureTransformPanel";

export default function FigureTransformGame() {
  const [figure, setFigure] = useState({
    type: "square",
    x: 0,
    y: 0,
    angle: 0,
    scale: 1,
    size: 100
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <FigureTransformCanvas figure={figure} setFigure={setFigure} />
      <FigureTransformPanel figure={figure} setFigure={setFigure} />
    </div>
  );
}
