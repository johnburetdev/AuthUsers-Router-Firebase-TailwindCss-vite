import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider";

import { erroresFirebase } from "../utils/ErroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { registerUser } = useContext(UserContext);

    const { required, patternEmail, minLength, validateTrim, validateEquals } =
        formValidate();

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await registerUser(data.email, data.password);
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
            <Title text="Registrar usuarios" />
            <form
                className="max-w-sm mx-auto "
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

                <FormInput
                    label="Vuelve a ingresa la contraseña"
                    type="password"
                    placeholder="Ingrese la contraseña otra vez"
                    {...register("repassword", {
                        validate: validateEquals(getValues("password")),
                    })}
                    error={errors.repassword}
                >
                    <FormError error={errors.repassword} />
                </FormInput>

                <Button type="submit" text="Regitrarse" loading={loading} />
            </form>
        </>
    );
};

export default Register;
