import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const handleClickLogin = () => {
    setUser(true);
    <Navigate to="/" />;
  };
  return (
    <>
      <div>
        <h1>Login</h1>
        <h2>{user ? "Online" : "Offline"}</h2>
        <button onClick={handleClickLogin}>Acceder</button>
      </div>
    </>
  );
};

export default Login;
