import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { UserContext } from "./context/UserProvider";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Perfil from "./pages/Perfil";
import Editar from "./pages/Editar";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Loading from "./components/Loading";

import LayoutForm from "./layouts/LayoutForm";
import LayoutRequireAuth from "./layouts/LayoutRequireAuth";
import LayoutRedirect from "./layouts/LayoutRedirect";

const App = () => {
    const { user } = useContext(UserContext);

    if (user === false) {
        return (
            <>
                <div className="justify-center py-11">
                    <Loading />;
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LayoutRequireAuth />}>
                    <Route index element={<Home />} />
                    <Route path="perfil" element={<Perfil />} />
                    <Route path="editar" element={<Editar />} />
                </Route>

                <Route path="/" element={<LayoutForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/:nanoid" element={<LayoutRedirect />}>
                    <Route index path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
