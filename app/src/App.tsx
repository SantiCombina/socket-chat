import {Route, Routes} from "react-router-dom";
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";

import {Room} from "./componets/room";
import {Home} from "./componets/home";

function App() {
    return (
        <QueryParamProvider adapter={ReactRouter6Adapter}>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<Room />} path="/chat" />
            </Routes>
        </QueryParamProvider>
    );
}

export default App;
