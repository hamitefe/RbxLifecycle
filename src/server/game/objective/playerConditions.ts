import {Condition} from "./condition";

export class MinPlayersCondition extends Condition{
    private playersService : Players = game.GetService("Players");
    
    public count: number = 0;
    
    constructor(count:number) {
        super();
        this.count = count;
    }
    
    evaluate(): boolean {
        return this.playersService.GetPlayers().size() >= this.count;  
    }

    setup(): void {
        const refresh = () => this.refresh();
        this.playersService.PlayerAdded.Connect(refresh);
        this.playersService.PlayerRemoving.Connect(refresh);
    }
    
}

export class MaxPlayersCondition extends Condition{
    private playersService : Players = game.GetService("Players");

    public count: number = 0;

    constructor(count:number) {
        super();
        this.count = count;
    }

    evaluate(): boolean {
        return this.playersService.GetPlayers().size() <= this.count;
    }

    setup(): void {
        const refresh = () => this.refresh();
        this.playersService.PlayerAdded.Connect(refresh);
        this.playersService.PlayerRemoving.Connect(refresh);
    }

}