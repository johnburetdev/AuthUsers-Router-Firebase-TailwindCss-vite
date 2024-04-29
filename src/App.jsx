import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";

import { UserContext } from "./context/UserProvider";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
