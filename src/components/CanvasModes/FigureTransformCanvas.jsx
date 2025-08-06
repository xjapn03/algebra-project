// FigureTransformCanvas.jsx
import React, { useRef } from "react";
import Sketch from "react-p5";

export default function FigureTransformCanvas({
  figure,
  setFigure,
  onVectorsUpdate,
  extraDraw,
}) {
  const originX = useRef(0);
  const originY = useRef(0);
  const dragging = useRef(false);

  const getBaseVectors = (type, size) => {
    if (type === "square") {
      return [
        { x: size / 2, y: size / 2 },
        { x: -size / 2, y: size / 2 },
        { x: -size / 2, y: -size / 2 },
        { x: size / 2, y: -size / 2 },
      ];
    }
    if (type === "triangle") {
      return [
        { x: 0, y: -size / 2 },
        { x: -size / 2, y: size / 2 },
        { x: size / 2, y: size / 2 },
      ];
    }
    if (type === "rectangle") {
      return [
        { x: size * 0.75, y: size / 2 },
        { x: -size * 0.75, y: size / 2 },
        { x: -size * 0.75, y: -size / 2 },
        { x: size * 0.75, y: -size / 2 },
      ];
    }
    return [];
  };

  const transformVector = (vec, scale, angle) => {
    const rad = (Math.PI / 180) * angle;
    const scaledX = vec.x * scale;
    const scaledY = vec.y * scale;
    return {
      x: scaledX * Math.cos(rad) - scaledY * Math.sin(rad),
      y: scaledX * Math.sin(rad) + scaledY * Math.cos(rad),
    };
  };

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

    // Si hay extraDraw, lo ejecutamos antes de dibujar la figura del jugador
    if (extraDraw) {
      extraDraw(p5, originX.current, originY.current, transformVector, getBaseVectors);
    }

    // Vectores del jugador
    const baseVectors = getBaseVectors(figure.type, figure.size);
    const transformedVectors = baseVectors.map((v) =>
      transformVector(v, figure.scale, figure.angle)
    );

    if (onVectorsUpdate) {
      onVectorsUpdate({ base: baseVectors, transformed: transformedVectors });
    }

    // Dibujar vectores
    transformedVectors.forEach((v) => {
      p5.stroke("orange");
      p5.line(
        originX.current + figure.x,
        originY.current - figure.y,
        originX.current + figure.x + v.x,
        originY.current - figure.y - v.y
      );
    });

    // Figura del jugador
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
      p5.triangle(
        0,
        -figure.size / 2,
        -figure.size / 2,
        figure.size / 2,
        figure.size / 2,
        figure.size / 2
      );
    } else if (figure.type === "rectangle") {
      p5.rectMode(p5.CENTER);
      p5.rect(0, 0, figure.size * 1.5, figure.size);
    }
    p5.pop();
  };

  const mousePressed = (p5) => {
    const dx = p5.mouseX - (originX.current + figure.x);
    const dy = p5.mouseY - (originY.current - figure.y);
    if (Math.sqrt(dx * dx + dy * dy) < figure.size) {
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

  const keyPressed = (p5) => {
    if (p5.key === "ArrowLeft") {
      setFigure((prev) => ({ ...prev, angle: prev.angle - 5 }));
    }
    if (p5.key === "ArrowRight") {
      setFigure((prev) => ({ ...prev, angle: prev.angle + 5 }));
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
      mouseReleased={mouseReleased}
      keyPressed={keyPressed}
    />
  );
}