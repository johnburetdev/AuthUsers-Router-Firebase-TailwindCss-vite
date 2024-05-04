export const erroresFirebase = (code)=>{
    switch (code) {
        case "auth/email-already-in-use":
            return {
               code: "email",
                message: "Este usuario ya existe"
            }
        case "auth/invalid-email":
            return {
                code: "email",
                 message: "Usuario invalido"
             }
        case "auth/invalid-credential":
            return {
                code: "email",
                 message: "Email o contraseña incorrecta"
             }
        case "auth/email-already-exists":
            return {
                code: "email",
                 message: "Email ya esta en uso"
             }
        case "auth/wrong-password":
        return{
            code: "password",
            message: "Contraseña incorrecta"
        }    
        
        default:
            return {
                code: "email",
                 message: "Ocurrio un error en el servidor"
             }
    }
}