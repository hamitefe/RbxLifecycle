import {StateMachine, StateRegistry} from "../../../../../StateMachine.ts";

export class Game {
    private machine:StateMachine<GameState>;

    constructor() {
        let reg = new StateRegistry<GameState>();
        this.machine = new StateMachine<GameState>(reg, GameState.IDLE);
    }
    
}

export enum GameState {
    IDLE,
    PLAYING,
    FINISHED
}
