/* eslint-disable no-undef */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider";

import { erroresFirebase } from "../utils/ErroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            await loginUser(data.email, data.password);
            navigate("/");
        } catch (error) {
            const errorCode = error.code;
            const { code, message } = erroresFirebase(errorCode);
            setError(code, {
                message,
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Title text="Iniciar sesion" />
            <div>
                <form
                    className="max-w-sm mx-auto"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <FormInput
                        label="Email"
                        type="email"
                        placeholder="Ingrese un email"
                        {...register("email", {
                            required,
                            pattern: patternEmail,
                        })}
                        error={errors.email}
                    >
                        <FormError error={errors.email} />
                    </FormInput>
                    <FormInput
                        label="Contraseña"
                        type="password"
                        placeholder="Ingrese una contraseña"
                        {...register("password", {
                            minLength,
                            validate: validateTrim,
                        })}
                        error={errors.password}
                    >
                        <FormError error={errors.password} />
                    </FormInput>
                    <Button type="submit" text="Ingresar" loading={loading} />
                </form>
            </div>
        </>
    );
};

export default Login;
