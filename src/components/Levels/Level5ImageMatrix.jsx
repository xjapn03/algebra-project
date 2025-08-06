// Levels/Level4ImageMatrix.jsx
import { useState, useEffect } from "react";
import Sketch from "react-p5";
import imgSrc from "../../assets/react.svg";

export default function Level4ImageMatrix() {
  const [img, setImg] = useState(null);

  // Estado de la imagen del jugador
  const [transform, setTransform] = useState({
    x: -150,
    y: 0,
    scale: 1,
    angle: 0,
  });

  // Transformación objetivo
  const targetTransform = {
    x: 150,
    y: 50,
    scale: 1.5,
    angle: 45,
  };

  const [isCorrect, setIsCorrect] = useState(false);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.imageMode(p5.CENTER);

    // Cargar imagen
    p5.loadImage(imgSrc, (loadedImg) => {
      setImg(loadedImg);
    });
  };

  const draw = (p5) => {
    p5.background(240);

    const originX = p5.width / 2;
    const originY = p5.height / 2;

    // Ejes
    p5.stroke(200);
    p5.line(originX, 0, originX, p5.height);
    p5.line(0, originY, p5.width, originY);

    if (img) {
      // Imagen objetivo en gris
      p5.push();
      p5.translate(originX + targetTransform.x, originY - targetTransform.y);
      p5.scale(targetTransform.scale);
      p5.rotate(targetTransform.angle);
      p5.tint(180);
      p5.image(img, 0, 0, 100, 100);
      p5.pop();

      // Imagen del jugador
      p5.push();
      p5.translate(originX + transform.x, originY - transform.y);
      p5.scale(transform.scale);
      p5.rotate(transform.angle);
      p5.noTint();
      p5.image(img, 0, 0, 100, 100);
      p5.pop();
    }
  };

  // Validar transformación
  const validateTransformation = () => {
    const posMatch =
      Math.abs(transform.x - targetTransform.x) < 5 &&
      Math.abs(transform.y - targetTransform.y) < 5;
    const scaleMatch = Math.abs(transform.scale - targetTransform.scale) < 0.05;
    const angleMatch =
      Math.abs(((transform.angle % 360) + 360) % 360 - targetTransform.angle) <
      5;

    if (posMatch && scaleMatch && angleMatch) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">
        Nivel 5: Aplica matrices de transformación a la imagen
      </h2>

      <div className="flex space-x-4">
        {/* Canvas */}
        <Sketch setup={setup} draw={draw} />

        {/* Controles */}
        <div className="bg-white p-4 rounded-lg shadow w-[250px]">
          <label>Posición X:</label>
          <input
            type="number"
            value={transform.x}
            onChange={(e) =>
              setTransform((prev) => ({
                ...prev,
                x: parseFloat(e.target.value),
              }))
            }
            className="border rounded p-1 w-full mb-2"
          />

          <label>Posición Y:</label>
          <input
            type="number"
            value={transform.y}
            onChange={(e) =>
              setTransform((prev) => ({
                ...prev,
                y: parseFloat(e.target.value),
              }))
            }
            className="border rounded p-1 w-full mb-2"
          />

          <label>Escala:</label>
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.01"
            value={transform.scale}
            onChange={(e) =>
              setTransform((prev) => ({
                ...prev,
                scale: parseFloat(e.target.value),
              }))
            }
            className="w-full mb-2"
          />

          <label>Rotación: {transform.angle}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={transform.angle}
            onChange={(e) =>
              setTransform((prev) => ({
                ...prev,
                angle: parseFloat(e.target.value),
              }))
            }
            className="w-full mb-2"
          />
        </div>
      </div>

      <button
        onClick={validateTransformation}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Validar
      </button>

      {isCorrect && (
        <p className="text-green-600 font-bold">
          ¡Correcto! Has aplicado la transformación a la imagen.
        </p>
      )}
    </div>
  );
}