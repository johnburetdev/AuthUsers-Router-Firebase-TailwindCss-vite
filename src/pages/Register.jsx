import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const { registerUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(email, password);
            console.log("Usuario registrado -> ", email, "-", password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
        }
    };
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Ingrese un email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Ingrese una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;
