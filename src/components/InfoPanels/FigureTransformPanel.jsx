// FigureTransformPanel.jsx
export default function FigureTransformPanel({ figure, setFigure, vectors }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-[400px]">
      <h3 className="font-bold mb-2">Controles de Transformación</h3>

      {/* Selector */}
      <label>Figura:</label>
      <select
        value={figure.type}
        onChange={(e) =>
          setFigure((prev) => ({ ...prev, type: e.target.value }))
        }
        className="border rounded p-1 w-full mb-2"
      >
        <option value="square">Cuadrado</option>
        <option value="triangle">Triángulo</option>
        <option value="rectangle">Rectángulo</option>
      </select>

      {/* Rotación */}
      <label>Rotación: {figure.angle}°</label>
      <input
        type="range"
        min="0"
        max="360"
        value={figure.angle}
        onChange={(e) =>
          setFigure((prev) => ({ ...prev, angle: parseInt(e.target.value) }))
        }
        className="w-full mb-2"
      />

      {/* Escala */}
      <label>Escala: {figure.scale.toFixed(2)}</label>
      <input
        type="range"
        min="0.1"
        max="3"
        step="0.01"
        value={figure.scale}
        onChange={(e) =>
          setFigure((prev) => ({ ...prev, scale: parseFloat(e.target.value) }))
        }
        className="w-full mb-2"
      />

      {/* Posición */}
      <label>Posición X:</label>
      <input
        type="number"
        value={figure.x}
        onChange={(e) =>
          setFigure((prev) => ({ ...prev, x: parseInt(e.target.value) }))
        }
        className="border rounded p-1 w-full mb-2"
      />
      <label>Posición Y:</label>
      <input
        type="number"
        value={figure.y}
        onChange={(e) =>
          setFigure((prev) => ({ ...prev, y: parseInt(e.target.value) }))
        }
        className="border rounded p-1 w-full mb-4"
      />

      {/* Tabla de vectores */}
      {vectors && (
        <div>
          <h4 className="font-semibold mb-2">Vectores</h4>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1">#</th>
                <th className="border p-1">Original (x, y)</th>
                <th className="border p-1">Transformado (x, y)</th>
              </tr>
            </thead>
            <tbody>
              {vectors.base.map((v, i) => (
                <tr key={i}>
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">
                    ({v.x.toFixed(1)}, {v.y.toFixed(1)})
                  </td>
                  <td className="border p-1">
                    ({vectors.transformed[i].x.toFixed(1)},{" "}
                    {vectors.transformed[i].y.toFixed(1)})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
