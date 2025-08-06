import { useState } from "react";
import VectorGame from "./VectorGame";
import FigureGame from "./FigureGame";

export default function GameContainer() {
  const [mode, setMode] = useState("vectores");

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* Selector de modo */}
      <div className="space-x-2">
        <button
          onClick={() => setMode("vectores")}
          className={`px-4 py-2 rounded ${
            mode === "vectores" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Suma de Vectores
        </button>
        <button
          onClick={() => setMode("figuras")}
          className={`px-4 py-2 rounded ${
            mode === "figuras" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Transformaciones de Figuras
        </button>
      </div>

      {/* Render dinámico del modo */}
      {mode === "vectores" && <VectorGame />}
      {mode === "figuras" && <FigureGame />}
    </div>
  );
}
