import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrematchScouting, ScoutingDisplay} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/prematch"} element={<PrematchScouting />} />
                <Route path={"/display"} element={<ScoutingDisplay />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
