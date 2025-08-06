// Levels/Level1DrawShape.jsx
import { useState } from "react";
import FigureTransformCanvas from "../CanvasModes/FigureTransformCanvas";
import FigureTransformPanel from "../InfoPanels/FigureTransformPanel";

export default function Level1DrawShape({ onBack }) {
  // Figura del jugador
  const [figure, setFigure] = useState({
    type: "square",
    x: -150,
    y: 0,
    size: 100,
    angle: 0,
    scale: 1,
  });

  // Figura objetivo
  const targetFigure = {
    type: "square",
    x: 150,
    y: 0,
    size: 100,
    angle: 0,
    scale: 1,
  };

  // Mensaje de validación
  const [message, setMessage] = useState(null);

  // Callback para actualizar vectores (opcional)
  const handleVectorsUpdate = (vectors) => {
    console.log("Vectores:", vectors);
  };

  // Función que dibuja la figura objetivo
  const drawTargetFigure = (
    p5,
    originX,
    originY,
    transformVector,
    getBaseVectors
  ) => {
    const baseVectors = getBaseVectors(
      targetFigure.type,
      targetFigure.size
    );
    const transformedVectors = baseVectors.map((v) =>
      transformVector(v, targetFigure.scale, targetFigure.angle)
    );

    // Dibujar vectores objetivo
    transformedVectors.forEach((v) => {
      p5.stroke(150);
      p5.line(
        originX + targetFigure.x,
        originY - targetFigure.y,
        originX + targetFigure.x + v.x,
        originY - targetFigure.y - v.y
      );
    });

    // Dibujar figura objetivo en gris
    p5.push();
    p5.translate(originX + targetFigure.x, originY - targetFigure.y);
    p5.scale(targetFigure.scale);
    p5.rotate(p5.radians(targetFigure.angle));
    p5.fill(180);
    p5.noStroke();

    if (targetFigure.type === "square") {
      p5.rectMode(p5.CENTER);
      p5.rect(0, 0, targetFigure.size, targetFigure.size);
    } else if (targetFigure.type === "triangle") {
      p5.triangle(
        0,
        -targetFigure.size / 2,
        -targetFigure.size / 2,
        targetFigure.size / 2,
        targetFigure.size / 2,
        targetFigure.size / 2
      );
    } else if (targetFigure.type === "rectangle") {
      p5.rectMode(p5.CENTER);
      p5.rect(0, 0, targetFigure.size * 1.5, targetFigure.size);
    }
    p5.pop();
  };

  // Validar figura
  const validateFigure = () => {
    const matchType = figure.type === targetFigure.type;
    const matchAngle = Math.abs(figure.angle - targetFigure.angle) < 1;
    const matchScale = Math.abs(figure.scale - targetFigure.scale) < 0.05;
    const matchPos =
      Math.abs(figure.x - targetFigure.x) < 5 &&
      Math.abs(figure.y - targetFigure.y) < 5;

    if (matchType && matchAngle && matchScale && matchPos) {
      setMessage({
        text: "¡Correcto! Has igualado la figura objetivo.",
        type: "success",
      });
    } else {
      setMessage({
        text: "Aún no coincide, sigue intentando.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Nivel 2: Dibuja la figura objetivo</h2>

      <FigureTransformCanvas
        figure={figure}
        setFigure={setFigure}
        onVectorsUpdate={handleVectorsUpdate}
        extraDraw={drawTargetFigure}
      />

      <FigureTransformPanel figure={figure} setFigure={setFigure} />

      {/* Botón de validación */}
      <button
        onClick={validateFigure}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Validar
      </button>

      {/* Mensaje de resultado con color según tipo */}
      {message && (
        <p
          className={`mt-2 font-semibold ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      {/* Botón volver */}
      {onBack && (
        <button
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mt-4"
        >
          Volver
        </button>
      )}
    </div>
  );
}
