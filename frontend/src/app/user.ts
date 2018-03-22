import { Serializable } from './serializable';

export class User implements Serializable<User>{
	id: number;
    email: string;
    username: string;
    jwtToken: string;
    firstname: string;
    lastname: string;
    tokens: number;
    profilePicture: string;
    currentLeague_id: string;
    //pastLeagues: League[]; 

    deserialize(input) {
    	this.id = input.id;
    	this.email = input.email;
        this.username = input.username;
    	this.jwtToken = input.jwtToken;
    	this.firstname = input.firstname;
    	this.lastname = input.lastname;
    	this.tokens = input.tokens;
    	this.profilePicture = input.profilePicture;
    	this.currentLeague_id = input.currentLeague_id;
    	return this;
    }

    serialize() {
        var obj = {
            id: this.id,
            email: this.email,
            username : this.username,
            jwtToken : this.jwtToken,
            firstname : this.firstname,
            lastname : this.lastname,
            tokens : this.tokens,
            profilePicture : this.profilePicture,
            currentLeague_id : this.currentLeague_id
        }
        return obj;
    }
}
