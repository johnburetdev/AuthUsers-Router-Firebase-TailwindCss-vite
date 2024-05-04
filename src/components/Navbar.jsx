import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, signOutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClickLogOut = async () => {
        try {
            await signOutUser();
            navigate("/login");
        } catch (error) {
            console.log(error.code);
        }
    };

    return (
        <nav className=" border-gray-200 bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <img
                        src="src\assets\url-link-svgrepo-com.svg"
                        className="h-8"
                        alt="url Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                        Shorts URL'S
                    </span>
                </Link>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                    <ul className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        {user ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/"
                                        className="block py-2 px-3  rounded  md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
                                    >
                                        Inicio
                                    </NavLink>
                                </li>
                                -
                                <li>
                                    <NavLink
                                        to="perfil"
                                        className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:hover:text-blue-500 text-white dark:hover:bg-gray-700 hover:text-white  border-gray-700"
                                    >
                                        Perfil
                                    </NavLink>
                                </li>
                                -
                                <li>
                                    <NavLink
                                        to="editar"
                                        className="block py-2 px-3  rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 md:hover:text-blue-500 text-white dark:hover:bg-gray-700 hover:text-white  border-gray-700"
                                    >
                                        Editar
                                    </NavLink>
                                </li>
                                <div className="flex md:order-8 space-x-4 md:space-x-0 rtl:space-x-reverse">
                                    <button
                                        className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800"
                                        type="submit"
                                        onClick={handleClickLogOut}
                                    >
                                        Cerrar sesion
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink
                                        className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                                        to="/login"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 mx-2 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
                                        to="/register"
                                    >
                                        Registrar
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
