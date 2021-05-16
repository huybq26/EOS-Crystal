import BaseModel from "./base.model";

export default class User extends BaseModel {
    _id: string = "";
    us_first: string = "";
    us_family: string = "";
    displayName: string = "";
    email: string = "";
    password: string = "";
    us_note: string = "";
    us_biblio: string = "";
    us_is_pi: boolean = false;
    us_is_co: boolean = false;
    us_is_up: boolean = false;
    us_is_ad: boolean = false;
    us_is_re: boolean = false;
    us_con: boolean = false;

    public static schema = {
        // maybe not in schema
        _id: {type: 'string'},
        us_first: {type: 'string', placeholder: 'First Name',},
        us_family: {type: 'string', placeholder: 'Last Name',},
        displayName: {type: 'string', placeholder: 'UserModel Name',},
        email: {type: 'string', placeholder: 'Email',},
        password: {type: 'string'},
        us_photo: {type: 'object'},
        us_note: {type: 'string',  placeholder: 'Note',},
        us_biblio: {type: 'string', placeholder: 'Bibliography',},
        us_is_pi: {type: 'boolean', placeholder: 'Principal Investigator',},
        us_is_co: {type: 'boolean', placeholder: 'Collector',},
        us_is_up: {type: 'boolean', placeholder: 'Uploader',},
        us_is_ad: {type: 'boolean', placeholder: 'Admin',},
        us_is_re: {type: 'boolean', placeholder: 'Researcher',},
        us_con: {type: 'boolean', placeholder: 'Confirmed',},

    };

    constructor(obj: any) {
        super();
        this._setData(obj, User.schema);
    }

    public static createNewUser(email: string, password: string, firstName: string, familyName: string){
        return new User({
            email: email,
            password: password,
            us_first: firstName,
            us_family: familyName,
            displayName: firstName + " " + familyName
        })
    }
}
