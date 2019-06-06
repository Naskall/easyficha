import { AngularFireAuth } from "@Angular/fire/auth";
import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afa: AngularFireAuth) {}
  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }
  logout() {}

  getAuth() {
    return this.afa.auth;
  }
}
