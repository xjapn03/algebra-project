import { useState } from "react";
import FigureTransformCanvas from "./CanvasModes/FigureTransformCanvas";
import FigureTransformPanel from "./InfoPanels/FigureTransformPanel";

export default function FigureGame() {
  const [figure, setFigure] = useState({
    type: "square",
    x: 0,
    y: 0,
    size: 100,
    angle: 0,
    scale: 1,
  });

  const [vectors, setVectors] = useState(null);

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <FigureTransformCanvas
        figure={figure}
        setFigure={setFigure}
        onVectorsUpdate={setVectors}
      />
      <FigureTransformPanel
        figure={figure}
        setFigure={setFigure}
        vectors={vectors}
      />
    </div>
  );
}
