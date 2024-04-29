import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();
    const { registerUser } = useContext(UserContext);
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    // const onSubmit = (data) => console.log(data);

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
            navigate("/");
        } catch (error) {
            console.log(error.code);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("email", {
                        message: "Esta usuario ya existe",
                    });
                    break;

                default:
                    console.log("Ha ocurrido un en error en el servidor");
                    break;
            }
        }
    };
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="Ingrese un email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Campo obligatorio",
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: "Formato de email incorrecto",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="Ingrese una contraseña"
                    {...register("password", {
                        minLength: {
                            value: 6,
                            message: "Minimo 6 caracteres",
                        },
                        validate: {
                            trim: (v) => {
                                if (!v.trim())
                                    return "No se permiten caracteres vacios";
                                true;
                            },
                        },
                    })}
                />
                {errors.password && errors.password.message}
                <input
                    type="password"
                    placeholder="Ingrese la contraseña otra vez"
                    {...register("repassword", {
                        validate: {
                            equals: (v) =>
                                v === getValues("password") ||
                                "Las contraseñas no coinciden",
                        },
                    })}
                />
                {errors.repassword && <p>{errors.repassword.message}</p>}
                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;
