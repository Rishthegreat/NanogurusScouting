import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrematchScouting, ScoutingDisplay, MatchScouting} from "./pages";
import {Nav, Notification} from "./components";
import {linksDict} from "./globalConsts";
import {NotificationProvider} from "./contexes/notificationContext";

function App() {
    return (
        <BrowserRouter>
            <NotificationProvider>
                <Notification />
                <Nav />
                <Routes>
                    <Route path={linksDict.prematch} element={<PrematchScouting />} />
                    <Route path={linksDict.match} element={<MatchScouting />} />
                    <Route path={linksDict.display} element={<ScoutingDisplay />} />
                </Routes>
            </NotificationProvider>
        </BrowserRouter>
    )
}
export default App;
