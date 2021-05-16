export default class BaseModel {
    _setData(obj: Record<any, any>, schema: Record<any, any>) {

        if (obj) {
            Object.keys(schema)
            .forEach(k => {
                if (typeof (obj[k]) === schema[k].type) {
                    // @ts-ignore
                    this[k] = obj[k];
                }
            });
        }
    }
}
