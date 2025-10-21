import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;

  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    this.player1.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "white",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
        },
      })
    );
  }
  
  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    // Logic to update the game state with the new move
    //make validaion here

    if (this.board.moves.length % 2 === 0 && socket !== this.player1) {
      //not player1 turn
      return;
    }
    if (this.board.moves.length % 2 === 1 && socket !== this.player2) {
      //not player2 turn
      return;
    }

    try {
      this.board.move(move);
    } catch (e) {
      console.error("Invalid move:", e);
    }

    if (this.board.isGameOver()) {
      //handle game over
      this.player1.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.emit(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      console.log("Game Over");
    }
    if (this.board.moves.length % 2 === 0) {
      //player2 turn
      this.player2.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      //player1 turn
      this.player1.emit(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
  }
}
