import s from "./style.module.css";

export function Input({ onTextChange, placeholder, type }) {
    return (
            <input 
            type={type || "text"} 
            className={s.input} 
            onChange={(e) => onTextChange(e.target.value)} 
            placeholder={placeholder} 
            />
    )
}