import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetNotes from "./components/get-notes";
import { GetNote } from "./components/get-single-note";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetNotes />} />
          <Route path="/note/:id" element={<GetNote />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
