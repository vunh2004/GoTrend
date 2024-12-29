import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutAdmin from "./layouts/LayoutAdmin";

function App() {
  return (
    <Routes>
      <Route>
        <Route index element={<LayoutAdmin />} />
      </Route>
    </Routes>
  );
}

export default App;
