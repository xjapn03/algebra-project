import { useState } from "react";
import Level1VectorGame from "./components/Levels/Level1VectorGame";
import Level2DrawShape from "./components/Levels/Level2DrawShape";
import Level3Rotate from "./components/Levels/Level3Rotate";
import Level4Transform from "./components/Levels/Level4Transform";
import Level5ImageMatrix from "./components/Levels/Level5ImageMatrix";

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(null);

  const goBackToMenu = () => setCurrentLevel(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      {!currentLevel ? (
        // Menú principal con selector de niveles
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Juego Educativo
          </h1>
          <p className="text-gray-600 mb-6">
            Aprende álgebra lineal jugando: vectores, matrices y transformaciones.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setCurrentLevel("vectors")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition w-full"
            >
              Nivel 1 - Juego de Vectores
            </button>
            <button
              onClick={() => setCurrentLevel("drawShape")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition w-full"
            >
              Nivel 2 - Dibuja la figura objetivo
            </button>
            <button
              onClick={() => setCurrentLevel("rotate")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition w-full"
            >
              Nivel 3 - Rotar y trasladar figura
            </button>
            <button
              onClick={() => setCurrentLevel("transform")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition w-full"
            >
              Nivel 4 - Transformar figura con vectores
            </button>
            <button
              onClick={() => setCurrentLevel("imageMatrix")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition w-full"
            >
              Nivel 5 - Transformar imagen con matrices
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          {currentLevel === "vectors" && <Level1VectorGame />}
          {currentLevel === "drawShape" && <Level2DrawShape />}
          {currentLevel === "rotate" && <Level3Rotate />}
          {currentLevel === "transform" && <Level4Transform />}
          {currentLevel === "imageMatrix" && <Level5ImageMatrix />}

          <button
            onClick={goBackToMenu}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Volver al menú
          </button>
        </div>
      )}
    </div>
  );
}