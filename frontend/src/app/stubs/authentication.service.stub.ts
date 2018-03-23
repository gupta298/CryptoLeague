import { AuthenticationService } from '../services'
import { User } from '../user'

export class AuthenticationServiceStub extends AuthenticationService {

	loadUserFromLocalStorage() {
      let currentUser = new User();
      currentUser.firstname = "John";
      currentUser.lastname = "Doe";
      currentUser.username = "johndoe"
      currentUser.email = "johndoe@email.com"
      currentUser.tokens = 25;
      currentUser.currentLeague_id = "1";
      return currentUser;
  }
}