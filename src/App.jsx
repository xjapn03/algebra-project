import { useState } from "react";
import VectorGame from "./components/VectorGame";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200 p-6">
      {!gameStarted ? (
        // Pantalla de inicio
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Juego de Vectores
          </h1>
          <p className="text-gray-600 mb-6">
            Aprende álgebra lineal jugando: arrastra vectores y descubre sus
            propiedades.
          </p>
          <button
            onClick={() => setGameStarted(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition"
          >
            Start
          </button>
        </div>
      ) : (
        // Juego
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Arrastra el vector
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <VectorGame />
          </div>
          <button
            onClick={() => setGameStarted(false)}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Volver al menú
          </button>
        </div>
      )}
    </div>
  );
}
