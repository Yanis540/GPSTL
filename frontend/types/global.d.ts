


declare global {
    // put global files
    type User = {
        id : string 
        tokens  ?: AuthCredentials
    }
    type AuthCredentials = {
        access: {
            exp : number 
            token : string 
        }
        refresh : {
            token : string 
        }
    }
    type ErrorResponse = {
        cause : string 
        message : string 
    }
}
export {}