import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './pages/homepage/Homepage';
import Writer from './pages/writer/Writer';
import cafeStore from './pages/homepage/HomepageSlice';
import writeStore from './pages/writer/WriteSlice';
import updateStore from './pages/updater/UpdateSlice';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Updater from './pages/updater/Updater';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Provider store={cafeStore}><Homepage /></Provider>} />
        <Route path="/:id" element={<Provider store={cafeStore}><Homepage /></Provider>} />
        <Route path="/write" element={<Provider store={writeStore}><Writer /></Provider>}/>
        <Route path="/update/:id" element={<Provider store={updateStore}><Updater /></Provider>}/>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
