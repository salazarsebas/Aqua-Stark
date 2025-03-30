
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing-page";
import GamePage from "./pages/game-page";
import StorePage from "./pages/storage-page";
import AchievementsPage from "./pages/achievements-page";
import HelpCenter from "./pages/help-center";
import BreadingLaboratory from "./pages/breading-laboratory";
import EventsCalendar from "./pages/events-calendar";
import TradingMarketPage from "./pages/trading-market";
import CommunityPage from "./pages/community-page";

import MyProfile from "@/pages/my-profile";
import EncyclopediaPage from "./pages/encyclopledia";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/breadingLaboratory" element={<BreadingLaboratory/>} />
      <Route path="/encyclopedia" element={<EncyclopediaPage/>} />
      <Route path="/achievements" element={<AchievementsPage />} />
      <Route path="/help-center" element={<HelpCenter />} />
      <Route path="/events" element={<EventsCalendar/>} />
      <Route path="/trading-market" element={<TradingMarketPage />} />
      <Route path="/community" element={<CommunityPage />} />

      <Route path="/my-profile" element={<MyProfile/>} />
    </Routes>
  );
}

export default App;
