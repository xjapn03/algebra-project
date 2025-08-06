// VectorInfoPanel.jsx
import React from "react";

export default function VectorInfoPanel({ v1, v2 }) {
  const sum = { x: v1.x + v2.x, y: v1.y + v2.y };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg shadow w-full max-w-lg">
      <p className="font-bold">Fórmulas:</p>
      <p>R = V₁ + V₂</p>
      <p>(xᵣ, yᵣ) = (x₁ + x₂, y₁ + y₂)</p>

      <p className="mt-2 font-bold">Cálculo actual:</p>
      <p>xᵣ = {v1.x} + {v2.x} = {sum.x}</p>
      <p>yᵣ = {v1.y} + {v2.y} = {sum.y}</p>

      <p className="mt-2">
        El vector verde es la resultante: ({sum.x}, {sum.y})
      </p>
    </div>
  );
}