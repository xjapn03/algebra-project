import React, { useRef, useState } from "react";
import Sketch from "react-p5";

export default function VectorGame() {
  const originX = useRef(0);
  const originY = useRef(0);
  const vectorX = useRef(0);
  const vectorY = useRef(0);
  const dragging = useRef(false);

  const [coords, setCoords] = useState({ x: 100, y: 50 });

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    originX.current = p5.width / 2;
    originY.current = p5.height / 2;
    vectorX.current = originX.current + coords.x;
    vectorY.current = originY.current - coords.y;
  };

  const draw = (p5) => {
    p5.background(240);

    // Ejes
    p5.stroke(200);
    p5.line(originX.current, 0, originX.current, p5.height);
    p5.line(0, originY.current, p5.width, originY.current);

    // Vector
    p5.stroke(255, 0, 0);
    p5.strokeWeight(2);
    p5.line(originX.current, originY.current, vectorX.current, vectorY.current);

    // Punto del vector
    p5.fill(255, 0, 0);
    p5.noStroke();
    p5.ellipse(vectorX.current, vectorY.current, 12, 12);

    // Coordenadas
    p5.fill(0);
    p5.textSize(16);
    p5.text(`Vector: (${coords.x}, ${coords.y})`, 10, 20);
  };

  const mousePressed = (p5) => {
    if (p5.dist(p5.mouseX, p5.mouseY, vectorX.current, vectorY.current) < 10) {
      dragging.current = true;
    }
  };

  const mouseDragged = (p5) => {
    if (dragging.current) {
      vectorX.current = p5.mouseX;
      vectorY.current = p5.mouseY;
      let relX = Math.round(vectorX.current - originX.current);
      let relY = Math.round(originY.current - vectorY.current);
      setCoords({ x: relX, y: relY });
    }
  };

  const mouseReleased = () => {
    dragging.current = false;
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mousePressed={mousePressed}
      mouseDragged={mouseDragged}
      mouseReleased={mouseReleased}
    />
  );
}
