import { Serializable } from './serializable';

export class League implements Serializable<League>{
	league_id: number;
	league_type: string;
	status: string;
	start_time: Date;
	current_market_coin: any[];
	portfolio_ids: any[];

	deserialize(input) {
		this.league_id = input.league_id;
		this.league_type = input.league_type;
		this.status = input.status;
		this.start_time = new Date(input.start_time);
		this.current_market_coin = input.current_market_coin;
		this.portfolio_ids = input.portfolio_ids;
		return this;
	}

	serialize() {
        var obj = {
            league_id: this.league_id,
            league_type: this.league_type,
            status: this.status,
            start_time: this.start_time,
            current_market_coin: this.current_market_coin,
            portfolio_ids: this.portfolio_ids
        }
        
        return obj;
    }
}
