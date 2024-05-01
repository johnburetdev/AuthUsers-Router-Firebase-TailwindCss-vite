export const erroresFirebase = (code)=>{
    switch (code) {
        case "auth/email-already-in-use":
            return "Este usuario ya existe"
        case "auth/invalid-email":
            return "Formato invalido"
        case "auth/invalid-credential":
            return "Email o contraseña incorrecta"
        case "auth/email-already-exists":
            return "Email ya esta en uso"
        case "auth/invalid-password":
            return "Contraseña incorrecta"
      
        default:
            return "Ocurrio un error en el servidor"
    }
}