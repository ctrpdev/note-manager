import s from "./style.module.css";

export function ButtonPrimary({children, onClick, isDisabled, type, className}) {
    return (
        <button 
        disabled={isDisabled}
        type={type || "button"}
        onClick={onClick}
        className={`btn btn-primary ${s.button} ${className}`}
        >
            {children}
        </button>
    )
}