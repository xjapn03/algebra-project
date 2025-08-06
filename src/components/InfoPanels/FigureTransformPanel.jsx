import React from "react";

export default function FigureTransformPanel({ figure }) {
  return (
    <div className="bg-indigo-50 p-4 rounded-lg shadow w-full max-w-lg">
      <p className="font-bold">Transformación actual:</p>
      <p>Tipo: {figure.type}</p>
      <p>Ángulo: {figure.angle}°</p>
      <p>Escala: {figure.scale}</p>

      <p className="mt-2 font-bold">Ecuaciones:</p>
      <p>
        Rotación:
        <br />
        x' = x·cos(θ) - y·sin(θ)
        <br />
        y' = x·sin(θ) + y·cos(θ)
      </p>
      <p>
        Escalado:
        <br />
        x' = kx · x
        <br />
        y' = ky · y
      </p>
    </div>
  );
}