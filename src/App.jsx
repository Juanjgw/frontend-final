// src/App.jsx
import React from 'react';
import RouterApp from './RouterApp';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <RouterApp />
            <Footer />
        </>
    );
}

export default App;
