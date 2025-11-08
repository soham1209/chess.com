import type { Square, PieceSymbol, Color } from "chess.js";

function Board({
  board,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) {
  return <div>
    {board.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, colIndex) => (
          <div key={colIndex} style={{ width: '40px', height: '40px', border: '1px solid black' }}>
            {cell ? cell.type : null}
          </div>
        ))}
      </div>
    ))}
  </div>;
}

export default Board;
