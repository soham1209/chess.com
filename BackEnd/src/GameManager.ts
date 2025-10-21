import { WebSocket } from "ws";

export class GameManager {
  private games: Game[];
  constructor() {
    // GameManager initialization code here
    this.games = [];
  }
  addUser(socket: WebSocket) {
    // Code to add user to a game
  }
  removeUser(socket: WebSocket) {
    // Code to remove user from a game
  }
  private handelMessage() {
    // Code to handle incoming messages
  }
}
