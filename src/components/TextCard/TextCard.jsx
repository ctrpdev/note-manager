import { useState } from "react";
import { Trash } from "react-bootstrap-icons";
import s from "./style.module.css";


export function TextCard({ title, subtitle, content, onClick, onClickTrash }) {
    const [isCardHovered, setIsCardHovered] = useState(false);
    const [isTrashHovered, setIsTrashHovered] = useState(false);

    function onClickTrash_(e){
        onClickTrash();
        e.stopPropagation();
    }

    return (
        <div className={`card ${s.container}`} 
        onClick={onClick}
        style={{ borderColor: isCardHovered ? "#0d6efd" : "transparent", transition: "0.5s" }}
        onMouseEnter={()=>setIsCardHovered(true)}
        onMouseLeave={()=>setIsCardHovered(false)}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between">
                <h5 className="card-title">{ title }</h5>
                <Trash size={20}
                onClick={onClickTrash_}
                style={{ color: isTrashHovered ? "#ff7373" : "#b8b8b8", transition: "0.5s" }}
                onMouseEnter={()=>setIsTrashHovered(true)}
                onMouseLeave={()=>setIsTrashHovered(false)}
                />
                </div>
                <h6 className="card-subtitle mb-2 text-body-secondary">{ subtitle }</h6>
                <p className={`card-text ${s.text_content}`}>{ content }</p>
            </div>
        </div>
    )
}