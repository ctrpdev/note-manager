import { createRoot } from 'react-dom/client';
import { ProtectedApp } from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/index.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  NoteBrowse,
  Note,
  NoteCreate,
  PageNotFound,
  Signin,
  Signup
} from './pages';
import { FirebaseApp } from './utils/firebase.js';
import { PersistGate } from 'redux-persist/integration/react';

FirebaseApp.init();

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Routes>
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<ProtectedApp />}>
            <Route path='/' element={<NoteBrowse />} />
            <Route path='/note/:noteId' element={<Note />} />
            <Route path='/note/new' element={<NoteCreate />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>

)
