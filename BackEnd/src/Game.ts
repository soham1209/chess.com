//Game.ts
import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./Messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private moveCount: number = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();
    console.log("New game started between two players.");
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

  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    // Logic to update the game state with the new move
    //make validaion here

    console.log("Making move:", move);
    if (this.moveCount % 2 === 0 && socket !== this.player1) {
      //not player1 turn
      console.log("Not player1's turn");
      return;
    }
    if (this.moveCount % 2 === 1 && socket !== this.player2) {
      //not player2 turn
      console.log("Not player2's turn");
      return;
    }

    console.log("Before move, board state:", this.board.fen());
    try {
      this.board.move(move);
    } catch (e) {
      console.error("Invalid move:", e);
      return;
    }

    console.log("Move made:", move);
    if (this.board.isGameOver()) {
      //handle game over
      this.player1.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );
      console.log("Game Over");
    }

    console.log("After move, board state:", this.board.fen());
    if (this.moveCount % 2 === 0) {
      //player2 turn
      this.player2.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    } else {
      //player1 turn
      this.player1.send(
        JSON.stringify({
          type: MOVE,
          payload: move,
        })
      );
    }
    this.moveCount++;
  }
}
