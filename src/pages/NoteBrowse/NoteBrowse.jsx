import { NoteList } from "@/containers/NoteList/NoteList";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { useState } from "react";

export function NoteBrowse(props) {
    const noteList = useSelector((store) => store.noteSlice.noteList);
    const [searchTerm, setSearchTerm] = useState("");
const filteredNoteList = noteList.filter(note=>{
    const containtsTitle = note.title.toUpperCase().includes(searchTerm.trim().toLocaleUpperCase())
    const containtsContent = note.content.toUpperCase().includes(searchTerm.trim().toLocaleUpperCase())
    return containtsTitle || containtsContent;
})

    return (
        <>
        <div className="row justify-content-center mb-5">
            <div className="col-sm-12 col-md-4">

        <SearchBar onTextChange={setSearchTerm} placeholder={"Search your notes..."} />
            </div>
        </div>
        {noteList?.length === 0 && (
            <div className="d-flex justify-content-center">
                <span>
                You have no notes.{" "}
                <Link to="/note/new">Click here to create one</Link>!
                </span>
            </div>
        )}
            <NoteList noteList={filteredNoteList} />
        </>
    )
}