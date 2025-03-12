import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Paka from "./pages/Paka"
import Nooda from "./pages/Nooda"
import About from "./pages/About"
import Contact from "./pages/Contact"

import Layout from "./components/Layout"

import './style.css'

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/paka" element={<Paka />} />
              <Route path="/nooda" element={<Nooda />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
