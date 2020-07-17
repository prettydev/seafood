export function objectWithoutProperties (object, properties) {

    let obj = {}
    let keys = Object.keys(object)
    keys.forEach(function(key) {
        if (!~properties.indexOf(key)) {
            obj[key] = object[key]
        }
    })
    return obj
}
