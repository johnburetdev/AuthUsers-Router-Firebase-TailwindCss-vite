/* eslint-disable no-undef */
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider";

import { erroresFirebase } from "../utils/ErroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

const Login = () => {
    const navigate = useNavigate();

    const { loginUser } = useContext(UserContext);

    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "johndev@test.com",
            password: "123456",
        },
    });

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            console.log(errorCode);
            setError("firebase", {
                message: erroresFirebase(errorCode),
            });
        }
    };

    return (
        <>
            <h1>Login</h1>
            <div>
                <FormError error={errors.firebase} />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        type="email"
                        placeholder="Ingrese un email"
                        {...register("email", {
                            required,
                            pattern: patternEmail,
                        })}
                    ></FormInput>

                    <FormError error={errors.email} />

                    <FormInput
                        type="password"
                        placeholder="Ingrese una contraseña"
                        {...register("password", {
                            minLength,
                            validate: validateTrim,
                        })}
                    ></FormInput>

                    <FormError error={errors.password} />

                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
};

export default Login;
