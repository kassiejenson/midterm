const Button = ({ onClick, children, type = "button" }) => {
    return (
        <button className="button"
            type={type}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;