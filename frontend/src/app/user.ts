import { Serializable } from './serializable';

export class User implements Serializable<User>{
	id: number;
    email: string;
    jwtToken: string;
    firstname: string;
    lastname: string;
    tokens: number;
    profilePicture: string;
    currentLeague: string;
    //pastLeagues: League[]; 

    deserialize(input) {
    	this.id = input.id;
    	this.email = input.email;
    	this.jwtToken = input.jwtToken;
    	this.firstname = input.firstname;
    	this.lastname = input.lastname;
    	this.tokens = input.tokens;
    	this.profilePicture = input.profilePicture;
    	this.currentLeague = input.currentLeague;
    	return this;
    }
}
