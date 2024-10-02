import { useDispatch, useSelector } from "react-redux";
import s from "./style.module.css";
import { TextCard } from "@/components";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../../store/notes/notes-slice";
import { NoteAPI } from "../../api/noteAPI";
import Swal from "sweetalert2";

export function NoteList({noteList}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function deleteNote_(note) {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this action",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if(result.isConfirmed){
            NoteAPI.deleteById(note.id);
            dispatch(deleteNote(note));
        }
    }

    return (
        <div className="row justify-content-center">
        {
            noteList.map(note=>{
                return (
                <div
                className={`${s.card_container}`}
                key={note.id}
                >
                <TextCard
                title={note.title}
                subtitle={note.created_at}
                content={note.content}
                onClick={()=>navigate(`/note/${note.id}`)}
                onClickTrash={()=>deleteNote_(note)}
                />
                </div>
                )
            })
        }
        </div>
    )
}