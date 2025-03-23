import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing-page"
import GamePage from "./pages/game-page"
//import StorePage from "./pages/storage-page"
import BreedingLaboratory from "./pages/breeding-laboratory"
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      {/*<Route path="/store" element={<StorePage />} />*/}
      <Route path="/store" element={<BreedingLaboratory />} />
    </Routes>
  )
}

export default App

