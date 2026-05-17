import {ConditionChanged} from "../events/events";

export abstract class Condition {
    private _isMet: boolean = false;
    private _onConditionChange: BindableEvent<ConditionChanged> = new Instance("BindableEvent");
    private _isActive: boolean = false;
    
    public isActive() : boolean {return this._isActive;}
    public setActive(flag: boolean) {
        this._isActive = flag;
        if (this._isActive) 
            this.refresh()
        
    }
    
    conditionChangedEvent(): RBXScriptSignal<ConditionChanged> {return this._onConditionChange.Event;}
    
    isMet() {return this._isMet;}
    
    abstract setup() : void;
    
    refresh():void {
        if (!this._isActive)
            return;
        let old: boolean = this._isMet;
        this._isMet = this.evaluate();
        if (old !== this._isMet)
            this._onConditionChange.Fire(this._isMet);
    }
    
    abstract evaluate(): boolean;
}

export class NotCondition extends Condition {
    private condition: Condition;

    constructor(condition:Condition) {
        super();
        this.condition = condition;
    }

    evaluate(): boolean {
        return !this.condition.isMet();
    }

    setup(): void {
        this.condition.conditionChangedEvent().Connect(() => this.refresh());
    }

}

export class AnyCondition extends Condition {
    private conditions: Condition[];
    
    constructor(...condition:Condition[]) {
        super();
        this.conditions = condition;
    }
    
    evaluate(): boolean {
        let isComplete = false;
        for (let condition of this.conditions) {
            isComplete =isComplete || condition.evaluate();
        }
        return isComplete;
    }

    setup(): void {
        for (let condition of this.conditions) {
            condition.conditionChangedEvent().Connect(() => this.refresh());
        }
    }
    
}

export class AllCondition extends Condition {
    private conditions: Condition[];

    constructor(...condition:Condition[]) {
        super();
        this.conditions = condition;
    }

    evaluate(): boolean {
        for (let condition of this.conditions) {
            if (!condition.evaluate())
                return false;
        }
        return true;
    }

    setup(): void {
        for (let condition of this.conditions) {
            condition.conditionChangedEvent().Connect(() => this.refresh());
        }
    }

}