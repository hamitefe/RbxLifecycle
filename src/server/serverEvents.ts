import {GameState} from "./game/lifecycle/game";

export type StateChanged = (oldState:GameState, newState:GameState) => void;