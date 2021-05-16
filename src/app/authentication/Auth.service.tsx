import User from "../../models/user.model";
import AuthAPI from "../../api/auth.api";
// @ts-ignore
import Cookies from "js-cookie";

export type AuthSubscriber = (login: boolean) => any;

export default class AuthServices {
    private static user: User;
    private static loginSubscribers: AuthSubscriber[] = [];

    public static get isAuthenticated(): boolean {
        return Cookies.get('token') !== undefined;
    }

    public static getCurrentUser(): User {
        return this.user;
    }

    private static setUser(user: User) {
        this.user = user;
    }

    public static fetchProfile() {
        AuthAPI.fetchProfile((data: any) => {
            if (data.user !== undefined){
                this.setUser(new User(data.user));
                this.dispatchAuthEvent(true);
            }
        })
    }

    public static login(email: string, password: string, callback: any) {
        AuthAPI.login(email, password, (data: any) => {
            if (data.user !== undefined) {
                let user = new User(data.user);
                this.setUser(user);
                this.dispatchAuthEvent(true);
                callback(true, "success");
            } else {
                this.dispatchAuthEvent(false);
                callback(false, data.err);
            }
        })
    }

    public static logout() {
        this.setUser(new User({}));
        Cookies.remove("token");
        this.dispatchAuthEvent(false);
    }

    public static subscribeAuthEvent(subscriber: AuthSubscriber) {
        this.loginSubscribers.push(subscriber);
    }

    private static dispatchAuthEvent(status:boolean) {
        this.loginSubscribers.forEach(e => {
            e(status);
        })
    }
}
