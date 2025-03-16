import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing-page"
import GamePage from "./pages/game-page"
import StorePage from "./pages/storage-page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/store" element={<StorePage />} />
    </Routes>
  )
}

export default App

