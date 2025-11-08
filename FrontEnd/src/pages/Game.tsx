import { useEffect, useState } from "react";
import Button from "../componets/Button";
import useSocket from "../hook/useScoket";
import Board from "../componets/Board";
import {Chess} from 'chess.js';


//TODO: Move to a separate file,their is code repitaion
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function Game() {
  const socket = useSocket();
  const [chess,setChess] = useState(new Chess());
  const [board,setBoard] = useState(chess.board());


  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      switch (message.type) {
        case INIT_GAME:
          setChess(new Chess());
          setBoard(chess.board());
          console.log("Game initialized:", message.payload);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());// Update board state  
          console.log("Move received:", message.payload);
          break;
        case GAME_OVER:
          console.log("Game over:", message.payload);
          break;
        default:
          console.log("Unknown message type:", message.type);
      }
    };
  }, [socket]);
  
  if (!socket) return <div>Connecting to server...</div>;


  return (
    <div>
      <div>
        <Board board={board} />
      </div>
      <div>
        <Button
          onClick={() => {
            socket.send(JSON.stringify({ type: INIT_GAME }));
          }}
          children={"Start Game"}
        />
      </div>
    </div>
  );
}

export default Game;
