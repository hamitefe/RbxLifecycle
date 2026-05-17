import {Condition} from "../objective/condition";
import {StateMachine} from "../../../../../StateMachine.ts";

export class Transition<T> {
    private _condition: Condition;
    private _state:T;
    private _machine:StateMachine<T>;

    constructor(condition: Condition, state: T, machine: StateMachine<T>) {
        this._condition = condition;
        this._state = state;
        this._machine = machine;
    }

    setup(){
        this._condition.conditionChangedEvent().Connect((flag: boolean) => this.changed(flag));        
    }
    
    setActive(flag: boolean){
        this._condition.setActive(flag);
    }
    
    private changed(flag:boolean){
        if (!flag)
            return;
        
        this._machine.transition(this._state);
    }
}