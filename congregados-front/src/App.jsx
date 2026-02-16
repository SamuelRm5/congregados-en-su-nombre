import { Routes, Route } from "react-router";
import FormularioOracion from "./components/FormularioOracion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FormularioOracion />} />
    </Routes>
  );
}

export default App;
