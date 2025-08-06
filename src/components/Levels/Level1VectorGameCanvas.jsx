// VectorGameCanvas.jsx
import React, { useRef } from "react";
import Sketch from "react-p5";

export default function VectorGameCanvas({ v1, v2, setV1, setV2 }) {
  const originX = useRef(0);
  const originY = useRef(0);
  const dragging = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    originX.current = p5.width / 2;
    originY.current = p5.height / 2;
  };

  const draw = (p5) => {
    p5.background(240);

    // Ejes
    p5.stroke(200);
    p5.line(originX.current, 0, originX.current, p5.height);
    p5.line(0, originY.current, p5.width, originY.current);

    // Vectores
    drawVector(p5, v1, "red");
    drawVector(p5, v2, "blue");

    // Suma de vectores
    const sum = { x: v1.x + v2.x, y: v1.y + v2.y };
    drawVector(p5, sum, "green");
  };

  const drawVector = (p5, vec, color) => {
    const endX = originX.current + vec.x;
    const endY = originY.current - vec.y;
    p5.stroke(color);
    p5.strokeWeight(2);
    p5.line(originX.current, originY.current, endX, endY);
    p5.fill(color);
    p5.noStroke();
    p5.ellipse(endX, endY, 12, 12);
  };

  const mousePressed = (p5) => {
    if (isNear(p5, v1)) dragging.current = "v1";
    else if (isNear(p5, v2)) dragging.current = "v2";
  };

  const mouseDragged = (p5) => {
    if (dragging.current === "v1") {
      setV1({
        x: Math.round(p5.mouseX - originX.current),
        y: Math.round(originY.current - p5.mouseY),
      });
    } else if (dragging.current === "v2") {
      setV2({
        x: Math.round(p5.mouseX - originX.current),
        y: Math.round(originY.current - p5.mouseY),
      });
    }
  };

  const mouseReleased = () => {
    dragging.current = null;
  };

  const isNear = (p5, vec) => {
    const endX = originX.current + vec.x;
    const endY = originY.current - vec.y;
    return p5.dist(p5.mouseX, p5.mouseY, endX, endY) < 10;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Título del nivel */}
      <h2 className="text-xl font-bold">Nivel 1: Juego de Suma de Vectores</h2>

      {/* Canvas */}
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
        mouseReleased={mouseReleased}
      />
    </div>
  );
}