import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Books from "./pages/Books";
import Add from "./pages/Add";
import Update from "./pages/Update";
import "./style.css"
import BookShow from "./pages/BookShow";
import ShowBooks from "./pages/BookShow";
import MoreAboutBookPage from "./pages/moreInfoAboutBook"
import Registration from "./pages/Registration";
import Authorization from "./pages/Authorization";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ShowBooks />}/>
            <Route path="/moreAboutBook/:id" element={<MoreAboutBookPage/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/update/:id" element={<Update/>}/>
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/authorization" element={<Authorization/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
