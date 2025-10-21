"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Messages_1 = require("./Messages");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.pendingUser = null;
        // GameManager initialization code here
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        // Code to add user to a game
        this.users.push(socket);
        this.addHandlers(socket);
    }
    removeUser(socket) {
        // Code to remove user from a game
        this.users = this.users.filter((user) => user !== socket);
        //stop the game here becouse user left
    }
    addHandlers(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start a game
                    const newGame = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(newGame);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === "move") {
                //handle move
                const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
                if (game) {
                    game.makeMove(socket, message.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
