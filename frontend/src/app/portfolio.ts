import { Serializable } from './serializable';

export class Portfolio implements Serializable<Portfolio>{
	portfolio_id: String;
	holdings: any[];
	captain_coin: String;

	deserialize(input) {
		this.portfolio_id = input._id;
		this.holdings = input.holdings;
		this.captain_coin = input.captain_coin;
		return this;
	}

	serialize() {
        var obj = {
        	_id: this.portfolio_id,
        	holdings: this.holdings,
        	captain_coin: this.captain_coin
        }
        
        return obj;
    }
}