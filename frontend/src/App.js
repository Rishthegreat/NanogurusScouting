import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {PrematchScouting, ScoutingDisplay} from "./pages";
import {Nav, Notification} from "./components";
import {linksDict} from "./globalConsts";
import {NotificationProvider} from "./contexes/notificationContext";

function App() {
    return (
        <div>
            <NotificationProvider>
                <Notification />
                <Nav />
                <BrowserRouter>
                    <Routes>
                        <Route path={linksDict.prematch} element={<PrematchScouting />} />
                        <Route path={linksDict.display} element={<ScoutingDisplay />} />
                    </Routes>
                </BrowserRouter>
            </NotificationProvider>
        </div>
    )
}
export default App;
