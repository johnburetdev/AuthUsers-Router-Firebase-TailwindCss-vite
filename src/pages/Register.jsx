import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { UserContext } from "../context/UserProvider";

import { erroresFirebase } from "../utils/ErroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () => {
    const navigate = useNavigate();
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
            await registerUser(data.email, data.password);
            navigate("/");
        } catch (error) {
            const errorCode = error.code;

            setError("firebase", {
                message: erroresFirebase(errorCode),
            });
        }
    };
    return (
        <>
            <h1>Register</h1>
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

                <FormInput
                    type="password"
                    placeholder="Ingrese la contraseña otra vez"
                    {...register("repassword", {
                        validate: validateEquals(getValues),
                    })}
                ></FormInput>

                <FormError error={errors.repassword} />

                <button type="submit">Registrar</button>
            </form>
        </>
    );
};

export default Register;
