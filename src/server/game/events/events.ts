import {GameState} from "../lifecycle/gameState";

export type StateChanged = (data: {old:GameState, current:GameState}) => void;

export type ConditionChanged = (condition: boolean) => void;