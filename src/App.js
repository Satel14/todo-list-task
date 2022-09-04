import React from "react";
import AppHeader from "./components/AppHeader";
import PageTitle from "./components/PageTitle";
import AppContent from "./components/AppContent";
import './styles/app.scss'
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <div>
                <PageTitle>Todo List</PageTitle>
                <div className="app__wrapper">
                    <AppHeader />
                    <AppContent />
                </div>
            </div>
            <Toaster toastOptions={{
                position: 'bottom-left',
                style: {
                    fontSize:'1.4rem'
                }
            }} />
        </>
    );
}

export default App;
