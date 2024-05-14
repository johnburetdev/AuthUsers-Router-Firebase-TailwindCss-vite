import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/ErroresFirebase";

import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import Alert from "../components/Alert";
import { content } from "flowbite-react/tailwind";

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateData } =
        useFirestore();
    const [copy, setCopy] = useState({});
    const [newOriginId, setNewOriginId] = useState();
    const { required, patternURL } = formValidate();
    const {
        register,
        handleSubmit,
        setError,
        resetField,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginId) {
                await updateData(newOriginId, url);
                setNewOriginId("");
            } else {
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        console.log(item.origin);
        setValue("url", item.origin);
        setNewOriginId(item.nanoid);
    };

    const pathURL = window.location.href;

    const handleClickCopy = async (nanoid) => {
        await navigator.clipboard.writeText(pathURL + nanoid);
        setCopy((prev) => ({ [nanoid]: true }));
    };

    if (loading.getData) return <Loading />;
    if (error) return <Alert error={error} />;

    return (
        <>
            <Title text="Home" />

            <div className="max-w-sm mx-auto p-6 bg-white border border-gray-200 rounded-lg sdark:bg-gray-800 dark:border-gray-700">
                <form className=" " onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        label="Url"
                        type="text"
                        placeholder="Ingrese una URL"
                        {...register("url", {
                            required,
                            pattern: patternURL,
                        })}
                        error={errors.url}
                    >
                        <FormError error={errors.url} />
                    </FormInput>

                    {newOriginId ? (
                        <Button
                            text="EDIT URL"
                            type="submit"
                            color="green"
                            loading={loading.updateData}
                        />
                    ) : (
                        <Button
                            text="Add URL"
                            type="submit"
                            color="blue"
                            loading={loading.addData}
                        />
                    )}
                </form>
            </div>

            <div>
                {data.map((item) => (
                    <div
                        key={item.nanoid}
                        className="my-8 mx-10 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {pathURL}
                            {item.nanoid}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {item.origin}
                        </p>

                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                text="Eliminar"
                                loading={loading[item.nanoid]}
                                onClick={() => handleClickDelete(item.nanoid)}
                            />
                            <Button
                                type="button"
                                text="Editar"
                                color="green"
                                onClick={() => handleClickEdit(item)}
                            />
                            <Button
                                type="button"
                                text={copy[item.nanoid] ? "Copied" : "Copy"}
                                color="blue"
                                onClick={() => handleClickCopy(item.nanoid)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Home;
