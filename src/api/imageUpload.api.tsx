import BaseAPI, {methodType} from "./baseAPI";
import Globals from "../globals";

export default class ImageUploadApi extends BaseAPI {

    constructor() {
        super();
    }

    public static uploadImage(file: File, maskImg: string) {
        const host = Globals().imgHost;
        let formData = new FormData();
        formData.append('file', file);
        formData.append('mask', maskImg);

        return fetch(host + "/", {
            method: methodType.post,
            body: formData
        }).then(response => response.text())
            .catch(err => {
            console.log(err.message)
        })
    }
}
