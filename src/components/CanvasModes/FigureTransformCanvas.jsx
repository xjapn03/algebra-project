// FigureTransformCanvas.jsx
import React, { useRef } from "react";
import Sketch from "react-p5";

export default function FigureTransformCanvas({ figure, setFigure }) {
  const originX = useRef(0);
  const originY = useRef(0);
  const dragging = useRef(false);

  const setup = (p5, parent) => {
    p5.createCanvas(600, 400).parent(parent);
    originX.current = p5.width / 2;
    originY.current = p5.height / 2;
  };

  const draw = (p5) => {
    p5.background(240);

    // Ejes
    p5.stroke(200);
    p5.line(originX.current, 0, originX.current, p5.height);
    p5.line(0, originY.current, p5.width, originY.current);

    // Dibujo de figura con transformaciones
    p5.push();
    p5.translate(originX.current + figure.x, originY.current - figure.y);
    p5.scale(figure.scale);
    p5.rotate(p5.radians(figure.angle));

    p5.fill(100, 150, 255);
    p5.noStroke();
    if (figure.type === "square") {
      p5.rectMode(p5.CENTER);
      p5.rect(0, 0, figure.size, figure.size);
    } else if (figure.type === "triangle") {
      p5.triangle(-50, 50, 50, 50, 0, -50);
    }
    p5.pop();
  };

  // Detectar clic dentro de la figura
  const mousePressed = (p5) => {
    const dx = p5.mouseX - (originX.current + figure.x);
    const dy = p5.mouseY - (originY.current - figure.y);
    const distFromCenter = Math.sqrt(dx * dx + dy * dy);

    // Área aproximada de detección
    if (distFromCenter < figure.size / 2) {
      dragging.current = true;
    }
  };

  const mouseDragged = (p5) => {
    if (dragging.current) {
      setFigure((prev) => ({
        ...prev,
        x: p5.mouseX - originX.current,
        y: originY.current - p5.mouseY,
      }));
    }
  };

  const mouseReleased = () => {
    dragging.current = false;
  };

  // Rotar con teclas
  const keyPressed = (p5) => {
    if (p5.key === "ArrowLeft") {
      setFigure((prev) => ({ ...prev, angle: prev.angle - 5 }));
    }
    if (p5.key === "ArrowRight") {
      setFigure((prev) => ({ ...prev, angle: prev.angle + 5 }));
    }
  };

  // Escalar con rueda del mouse
  const mouseWheel = (p5, event) => {
    setFigure((prev) => ({
      ...prev,
      scale: Math.max(0.1, prev.scale - event.delta / 500),
    }));
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
      mouseReleased={mouseReleased}
      keyPressed={keyPressed}
      mouseWheel={mouseWheel}
    />
  );
}
