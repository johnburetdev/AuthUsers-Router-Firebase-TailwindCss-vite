import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";

import Loading from "../components/Loading";
import Title from "../components/Title";
import Button from "../components/Button";
import { nanoid } from "nanoid";

const Home = () => {
    const { data, error, loading, getData, addData, deleteData, updateData } =
        useFirestore();
    const [text, setText] = useState("");
    const [newOriginId, setNewOriginId] = useState();

    useEffect(() => {
        console.log("getData");
        getData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newOriginId) {
            await updateData(newOriginId, text);
            setNewOriginId("");
            setText("");
            return;
        }
        await addData(text);
        setText("");
    };

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    };

    const handleClickEdit = (item) => {
        setText(item.origin);
        setNewOriginId(item.nanoid);
    };
    if (loading.getData) return <Loading />;
    if (error)
        return (
            <>
                <div
                    id="alert-1"
                    className="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ms-3 text-sm font-medium">{error}</div>
                </div>
            </>
        );
    return (
        <>
            <Title text="Home" />
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="ex: http://johnburet.dev"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
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

            {data.map((item) => (
                <div key={item.nanoid}>
                    <p>{item.nanoid}</p>
                    <p>{item.origin}</p>
                    <p>{item.uid}</p>
                    <Button
                        type="button"
                        text="Eliminar"
                        color="red"
                        loading={loading[item.nanoid]}
                        onClick={() => handleClickDelete(item.nanoid)}
                    />
                    <Button
                        type="button"
                        text="Editar"
                        color="green"
                        onClick={() => handleClickEdit(item)}
                    />
                </div>
            ))}
        </>
    );
};

export default Home;
