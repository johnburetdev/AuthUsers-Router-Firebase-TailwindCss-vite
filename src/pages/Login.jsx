import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("johndev@test.com");
    const [password, setPassword] = useState("123456");

    const navigate = useNavigate();

    const { loginUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            console.log("logeado -> ", email, "-", password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
        }
    };
    return (
        <>
            <h1>Login</h1>
            <div>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
