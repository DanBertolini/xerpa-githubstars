import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { BehaviorSubject } from "rxjs";
import { UserDataUtils } from "../../utils/UserDataUtils";

@Injectable()
export class UserService {

    constructor(private http: Http) {

    }

    public getUsersByName(userName: string): Observable<Response> {
        return this.http.post(`http://localhost:3000/api/users/${userName}`, UserDataUtils.getUserData()).map((res) => {
            return res.json();
        }).map((result) => {
            const user = result.users.find((user) => {
                return user.username === userName ||
                    user.fullname === userName;
            });
            return user;
        });
    }

    public getUserByUserName(userName: string): Observable<Response> {
        return this.http.post(`http://localhost:3000/api/user/${userName}`, UserDataUtils.getUserData()).map((res) => {
            return res.json();
        });
    }

    public getCurrentUser(): Observable<Response> {
        return this.http.post(`http://localhost:3000/api/user`, UserDataUtils.getUserData()).map((res) => {
            return res.json();
        });
    }

    public login(userData: any): Observable<boolean> {
        return this.http.post(`http://localhost:3000/api/user/login`, userData).map((res) => {
            return res.json();
        }).map((response) => {
            localStorage.setItem('userName', userData.userName);
            localStorage.setItem('userToken', response.token);
            return true;
        });
    }
}