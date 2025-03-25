import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import GamePage from "./pages/game-page";
import StorePage from "./pages/storage-page";
import AchievementsPage from "./pages/achievements-page";
import HelpCenter from "./pages/help-center";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/help-center" element={<HelpCenter />} />
    </Routes>
  );
}

export default App;
