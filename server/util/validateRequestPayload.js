/**
 * 
 * @param {*} reqPayload 
 * @param {*} validationConfig 
 * @returns Array
 */
const validateRequestPayload = (reqPayload = {}, validationConfig = []) => {

    const isError = [];
    // const name = reqPayload.name
    // const price = reqPayload.price 
    // if(!name) {
    //     isError = isError + `Name is Required`
    // }
    // if(!price){
    //     isError = isError + `Price is Required`
    // }
    const vConfigLength =  validationConfig.length;
    for(let i  = 0; i < vConfigLength; i++){
        const keyObj = validationConfig[i]
        // { key: "name", type: "string", isRequired: true }
        const { key, type, isRequired =  false } = keyObj;
        const isKeyFound = reqPayload[key];
        if(isRequired && !isKeyFound){
            isError.push({
                key, 
                error: `${key} is Required`,
                message: `required type is ${type}`
            })
        }
        if(isKeyFound && type !== "string" && type !== typeof isKeyFound){
            isError.push({
                key, 
                error: `${key} is Invlaid Type`,
                message: `required type is ${type}`
            })
        }
    }
    return isError;
}

const validateRequestQueryParams = (reqQuery = {}, validationConfig = []) => {
    const isError = [];
    // TODO : Logic Here

    // Return 
    return isError
}
// TODO : Method -> validateRequestPathParams

module.exports = { validateRequestPayload, validateRequestQueryParams };