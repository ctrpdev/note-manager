import { Outlet, useNavigate } from 'react-router-dom';
import s from './style.module.css';
import { ButtonPrimary, Header } from './components';
import { useEffect } from 'react';
import { NoteAPI } from './api/noteAPI';
import { useDispatch } from 'react-redux';
import { setNoteList } from './store/notes/notes-slice';
import { withAuthRequired } from './hoc/withAuthRequired';

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  async function getNotes() {
    const list = await NoteAPI.getAll();
    dispatch(setNoteList(list));
  }

  useEffect(() => {
    const unsub = NoteAPI.onShouldSyncNotes(getNotes);
    return () => {
      unsub();
    };
  }, [])

  return (
    <>
      <Header />
      <ButtonPrimary
        className={s.buttonAdd}
        onClick={() => navigate("/note/new")}>
        +
      </ButtonPrimary>
      <div
        className={`${s.workspace}`}>
        <Outlet />
      </div>
    </>
  )
}

export const ProtectedApp = withAuthRequired(App);