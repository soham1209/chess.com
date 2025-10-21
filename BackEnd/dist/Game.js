"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
//Game.ts
const chess_js_1 = require("chess.js");
const Messages_1 = require("./Messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        console.log("New game started between two players.");
        this.player1.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "white",
            },
        }));
        this.player2.send(JSON.stringify({
            type: Messages_1.INIT_GAME,
            payload: {
                color: "black",
            },
        }));
    }
    makeMove(socket, move) {
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
        }
        catch (e) {
            console.error("Invalid move:", e);
        }
        if (this.board.isGameOver()) {
            //handle game over
            this.player1.emit(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            this.player2.emit(JSON.stringify({
                type: Messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            console.log("Game Over");
        }
        if (this.board.moves.length % 2 === 0) {
            //player2 turn
            this.player2.emit(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move,
            }));
        }
        else {
            //player1 turn
            this.player1.emit(JSON.stringify({
                type: Messages_1.MOVE,
                payload: move,
            }));
        }
    }
}
exports.Game = Game;
