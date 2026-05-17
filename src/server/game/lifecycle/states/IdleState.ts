import {AbstractState, StateMachine} from "../../../../../../StateMachine.ts";
import {GameState} from "../game";
import {Condition} from "../../objective/condition";
import {MinPlayersCondition} from "../../objective/playerConditions";
import {Transition} from "../../utility/transition";

export class IdleState extends AbstractState<GameState> {
    private transition: Transition<GameState> | undefined;
    
    constructor() {
        super();
    }
    
    enter(machine: StateMachine<GameState>): void {
        this.transition!.setActive(true);
    }

    exit(machine: StateMachine<GameState>): void {
        this.transition!.setActive(false);
    }

    setup(machine: StateMachine<GameState>): void {
        super.setup(machine);
        this.transition = new Transition(new MinPlayersCondition(4), GameState.PLAYING, machine);
        this.transition.setup();
    }
    
}