
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Home from "./pages";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css'
import List from "./pages/list"
import Edit from "./pages/edit";

function App() {
  return (
    <div id="app" role="application">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
