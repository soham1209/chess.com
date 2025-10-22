import { useEffect } from "react";
import Button from "../componets/Button";
import useSocket from "../hook/UseScoket";

//TODO: Move to a separate file,their is code repitaion
export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

function Game() {
  const socket = useSocket();
  if (!socket) return <div>Connecting to server...</div>;

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (event) => {
        
      const message = JSON.parse(event.data);
      console.log("Received message:", message);

      switch (message.type) {
        case INIT_GAME:
          console.log("Game initialized:", message.payload);
          break;
        case MOVE:
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

  return (
    <div>
      Game
      <Button
        onClick={() => {
          socket.send(JSON.stringify({ type: INIT_GAME }));
        }}
        children={"Start Game"}
      />
    </div>
  );
}

export default Game;
