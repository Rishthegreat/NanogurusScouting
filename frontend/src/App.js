import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrematchScouting, ScoutingDisplay} from "./pages";
import {Nav} from "./components";
import {linksDict} from "./globalConsts";

function App() {
    return (
        <div>
            <Nav />
            <BrowserRouter>
                <Routes>
                    <Route path={linksDict.prematch} element={<PrematchScouting />} />
                    <Route path={linksDict.display} element={<ScoutingDisplay />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;
