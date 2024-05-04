const FormButton = ({ text, onclick, type }) => {
    return (
        <>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                    onClick={onclick}
                    type={type}
                    className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800
             "
                >
                    {text}
                </button>
            </div>
        </>
    );
};

export default FormButton;
