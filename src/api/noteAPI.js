import { 
    addDoc, 
    collection, 
    deleteDoc, 
    doc, 
    getDocs, 
    onSnapshot, 
    orderBy, 
    query,
    updateDoc 
} from "firebase/firestore";
import { FirebaseApp } from "../utils/firebase";

export class NoteAPI {
    static async create(note) {
        const response = await addDoc(collection(FirebaseApp.db, "notes"), note);
        return {
            id: response.id,
            ...note
        }
    }

    static async getAll() {
        const q = query(collection(FirebaseApp.db, "notes"), orderBy("created_at", "asc"));
        const response = await getDocs(q);
        return response.docs.map((document) => {
            return {
                id: document.id,
                ...document.data()
            }
        });
    }

    static async deleteById(noteId) {
        deleteDoc(doc(FirebaseApp.db, "notes", noteId))
    }

    static async updateById(id, values) {
        const query = doc(FirebaseApp.db, "notes", id);
        await updateDoc(query, values);
        return {
            id,
            ...values
        }
    }

    static onShouldSyncNotes(onChange) {
        const q = query(collection(FirebaseApp.db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const notes = [];
            querySnapshot.forEach((doc) => {
                notes.push({ id: doc.id, ...doc.data() });
            });
    
            const isUserPerformingChange = querySnapshot.metadata.hasPendingWrites;
            if (!isUserPerformingChange) {
                console.log("You are not synced with the notes collection");
                onChange(notes);
            }
        });
        return unsub;
    }
    

}