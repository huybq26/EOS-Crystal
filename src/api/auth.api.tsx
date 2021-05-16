import BaseAPI, {methodType} from "./baseAPI";
import User from "../models/user.model";

export default class AuthAPI extends BaseAPI {

    constructor() {
        super();
    }

    public static login(email: string, password: string, callback: any) {
        const content = {
            email: email,
            password: password
        }

        this.JSONRequest('/users/login', methodType.post, {}, {credentials: 'include'}, content)
            .then(res => {
                if (callback) {
                    if (res.code === 1) {
                        callback({user: res.data});
                    } else {
                        callback({err: res.err});
                    }
                }
            })
            .catch(err => {
                console.log(err);
                callback({err: "Login failed!"});
            })
    }

    public static signup(user: User, callback: any) {
        AuthAPI.JSONRequest('/users/signup', methodType.post, {}, {}, user)
            .then(res => {
                if (callback) {
                    if (res.code === 1) {
                        callback({user: res.data});
                    } else {
                        callback({err: res.err});
                    }
                }
            })
            .catch(err => {
                console.log(err);
                callback({err: "Signup failed!"});
            })
    }

    public static forgetPassword(email: string, callback: any) {
        const content = {
            email: email
        }

        this.JSONRequest('/users/forget', methodType.post, {}, {}, content)
            .then(res => {
                if (callback) {
                    if (res.code === 1) {
                        callback({user: res.data});
                    } else {
                        callback({err: res.err});
                    }
                }
            })
            .catch(err => {
                console.log(err);
                callback({err: "Request failed!"});
            })
    }

    public static fetchProfile(callback: any) {

        this.JSONRequest('/users/edit', methodType.get, {}, {credentials: 'include'}, {})
            .then(res => {
                if (callback) {
                    if (res.code === 1) {
                        callback({user: res.data});
                    } else {
                        callback({err: res.err});
                    }
                }
            })
            .catch(err => {
                console.log(err);
                callback({err: "Request failed!"});
            })
    }
};
