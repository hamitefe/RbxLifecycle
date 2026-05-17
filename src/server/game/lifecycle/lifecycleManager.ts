import {Game} from "./game";

let _game: Game = new Game();

export class LifecycleManager {
    static getGame() : Game {
        return _game;
    }
}