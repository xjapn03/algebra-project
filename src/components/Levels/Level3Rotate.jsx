import { useState } from "react";
import FigureTransformCanvas from "../CanvasModes/FigureTransformCanvas";
import FigureTransformPanel from "../InfoPanels/FigureTransformPanel";
import FigureVectorsInfo from "../InfoPanels/FigureVectorsInfo";

export default function Level3Rotate() {
  const [figure, setFigure] = useState({
    type: "square",
    x: 0,
    y: 0,
    size: 100,
    angle: 0,
    scale: 1,
  });

  const targetFigure = {
    type: "square",
    x: 100,
    y: 50,
    size: 100,
    angle: 45,
    scale: 1,
  };

  const [isCorrect, setIsCorrect] = useState(false);
  const [vectors, setVectors] = useState([]);

  const validatePositionAndRotation = () => {
    const posMatch =
      Math.abs(figure.x - targetFigure.x) < 5 &&
      Math.abs(figure.y - targetFigure.y) < 5;
    const angleMatch =
      Math.abs(((figure.angle % 360) + 360) % 360 - targetFigure.angle) < 5;

    setIsCorrect(posMatch && angleMatch);
  };

  const drawTargetFigure = (p5, originX, originY, transformVector, getBaseVectors) => {
    const baseVectors = getBaseVectors(targetFigure.type, targetFigure.size);
    const transformedVectors = baseVectors.map((v) =>
      transformVector(v, targetFigure.scale, targetFigure.angle)
    );

    transformedVectors.forEach((v) => {
      p5.stroke(150);
      p5.line(
        originX + targetFigure.x,
        originY - targetFigure.y,
        originX + targetFigure.x + v.x,
        originY - targetFigure.y - v.y
      );
    });

    p5.push();
    p5.translate(originX + targetFigure.x, originY - targetFigure.y);
    p5.scale(targetFigure.scale);
    p5.rotate(p5.radians(targetFigure.angle));
    p5.fill(180);
    p5.noStroke();
    p5.rectMode(p5.CENTER);
    p5.rect(0, 0, targetFigure.size, targetFigure.size);
    p5.pop();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">
        Nivel 3: Mueve y rota la figura para igualar la objetivo
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <FigureTransformCanvas
          figure={figure}
          setFigure={setFigure}
          onVectorsUpdate={setVectors}
          extraDraw={drawTargetFigure}
        />
        <FigureVectorsInfo vectors={vectors} />
      </div>

      <FigureTransformPanel figure={figure} setFigure={setFigure} />

      <button
        onClick={validatePositionAndRotation}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Validar
      </button>

      {isCorrect && (
        <p className="text-green-600 font-bold mt-2">
          ¡Correcto! Nivel completado
        </p>
      )}
    </div>
  );

}
