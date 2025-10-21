//GameManager.ts
import { WebSocket } from "ws";
import { INIT_GAME } from "./Messages";
import { Game } from "./Game";

export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null = null;
  private users: WebSocket[];

  constructor() {
    // GameManager initialization code here
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    // Code to add user to a game
    this.users.push(socket);
    this.addHandlers(socket);

  }

  removeUser(socket: WebSocket) {
    // Code to remove user from a game
    this.users = this.users.filter((user) => user !== socket);
    //stop the game here becouse user left
  }

  private addHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      if (message.type === INIT_GAME) {
        if (this.pendingUser) {
          //start a game
          const newGame = new Game(this.pendingUser, socket);
          this.games.push(newGame);
          this.pendingUser = null;
        } else {
          this.pendingUser = socket;
        }
      }
      if(message.type === "move"){
        //handle move
        const game = this.games.find(g => g.player1 === socket || g.player2 === socket);
        if(game){
          game.makeMove(socket, message.move);
        } 
      }
    });
  }
}
