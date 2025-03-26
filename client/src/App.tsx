import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import GamePage from "./pages/game-page";
import StorePage from "./pages/storage-page";
import AchievementsPage from "./pages/achievements-page";
import BreedingLaboratory from "./pages/breeding-laboratory";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
     <Route path="/" element={<StorePage />} />
     <Route path="/store" element={<BreedingLaboratory />} />
      <Route path="/achievements" element={<AchievementsPage />} />

    </Routes>
  );
}

export default App;
