import Text from "react"
const getLocalState = (value, defaultValue) => {
    if (localStorage.getItem("state") == null ){
        return defaultValue
    }
    else {
       return JSON.parse(localStorage.getItem("state"))[value] == undefined ? defaultValue :  JSON.parse(localStorage.getItem("state"))[value]
    }
}



export {getLocalState}