import {AbstractStateComponent, StateMachine} from "../../../../../StateMachine.ts";
import {Condition} from "../../../shared/lifeCycle/objective/condition";

export class Transition<T> extends AbstractStateComponent<T> {
    private condition: Condition;
    private state: T;


    constructor(machine: StateMachine<T>, state: T, condition: Condition) {
        super(machine, state);
        this.condition = condition;
        this.state = state;
    }
    
    override onEnable() {
        super.onEnable();
        this.condition.setActive(true);
    }
    
    override onDisable() {
        super.onDisable();
        this.condition.setActive(false);
    }
}