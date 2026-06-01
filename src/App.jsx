import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 
import Home from "./pages/Home";
import About from "./pages/About";
import Nav from "./components/Nav";
import Contact from "./pages/Contact";
import Cantantes from "./pages/Cantantes";
import { PrivateRoute } from "./components/PrivateRoute";
 
function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/singers" element={<Cantantes />} />
          <Route element={<PrivateRoute />}>
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
 
export default App;