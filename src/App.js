import { BrowserRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/Home"
import Paka from "./pages/Paka"
import Nooda from "./pages/Nooda"
import Brava from "./pages/Brava"
import About from "./pages/About"
import Contact from "./pages/Contact"

import ScrollToTop from "./components/ScrollToTop"
import Layout from "./components/Layout"

import './style.css'

function App() {
  return (
    <>
      <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/paka" element={<Paka />} />
              <Route path="/nooda" element={<Nooda />} />
              <Route path="/brava" element={<Brava />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
