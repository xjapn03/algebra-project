// Levels/Level3Transform.jsx
import { useState } from "react";
import FigureTransformCanvas from "../CanvasModes/FigureTransformCanvas";
import FigureTransformPanel from "../InfoPanels/FigureTransformPanel";

export default function Level3Transform() {
  // Figura del jugador
  const [figure, setFigure] = useState({
    type: "triangle",
    x: 0,
    y: 0,
    size: 100,
    angle: 0,
    scale: 1,
  });

  // Figura objetivo
  const targetFigure = {
    type: "triangle",
    x: 100,
    y: 50,
    size: 100,
    angle: 30,
    scale: 1.5,
  };

  const [isCorrect, setIsCorrect] = useState(false);

  // Validar transformación (posición, escala y rotación)
  const validateTransformation = () => {
    const posMatch =
      Math.abs(figure.x - targetFigure.x) < 5 &&
      Math.abs(figure.y - targetFigure.y) < 5;
    const scaleMatch = Math.abs(figure.scale - targetFigure.scale) < 0.05;
    const angleMatch =
      Math.abs(((figure.angle % 360) + 360) % 360 - targetFigure.angle) < 5;

    if (posMatch && scaleMatch && angleMatch) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // Dibuja la figura objetivo
  const drawTargetFigure = (
    p5,
    originX,
    originY,
    transformVector,
    getBaseVectors
  ) => {
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
    p5.triangle(
      0,
      -targetFigure.size / 2,
      -targetFigure.size / 2,
      targetFigure.size / 2,
      targetFigure.size / 2,
      targetFigure.size / 2
    );
    p5.pop();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">
        Nivel 4: Aplica una transformación lineal para igualar la figura objetivo
      </h2>

      <FigureTransformCanvas
        figure={figure}
        setFigure={setFigure}
        extraDraw={drawTargetFigure}
      />

      <FigureTransformPanel figure={figure} setFigure={setFigure} />

      <button
        onClick={validateTransformation}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Validar
      </button>

      {isCorrect && (
        <p className="text-green-600 font-bold">¡Correcto! Has aplicado la transformación</p>
      )}
    </div>
  );
}