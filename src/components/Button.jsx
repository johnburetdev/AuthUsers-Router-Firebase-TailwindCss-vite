import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, color = "blue", loading, onClick }) => {
    if (loading) return <ButtonLoading />;

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-${color}-600 hover:bg-${color}-700 focus:ring-${color}-800`}
            >
                {text}
            </button>
        </>
    );
};

export default Button;
