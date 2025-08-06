export default function FigureVectorsInfo({ vectors }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-sm w-[300px]">
      <h3 className="font-bold text-lg mb-2">Vectores de la figura</h3>

      {vectors.length > 0 ? (
        <>
          <table className="w-full border text-center">
            <thead>
              <tr>
                <th className="border p-1">#</th>
                <th className="border p-1">X</th>
                <th className="border p-1">Y</th>
              </tr>
            </thead>
            <tbody>
              {vectors.map((v, i) => (
                <tr key={i}>
                  <td className="border p-1">{i + 1}</td>
                  <td className="border p-1">{v.x.toFixed(2)}</td>
                  <td className="border p-1">{v.y.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-3">
            <h4 className="font-semibold">Fórmulas</h4>
            <ul className="list-disc pl-5 text-xs space-y-1">
              <li>
                <strong>Traslación:</strong> (x', y') = (x + dx, y + dy)
              </li>
              <li>
                <strong>Escala:</strong> (x', y') = (x · s, y · s)
              </li>
              <li>
                <strong>Rotación:</strong> (x', y') = (x·cosθ - y·sinθ, x·sinθ + y·cosθ)
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p>No hay vectores calculados todavía.</p>
      )}
    </div>
  );
}
