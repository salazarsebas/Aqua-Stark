import Bubble from "@/components/bubble";
import Nav from "@/components/ui/achievements-nav";
import { useState } from "react";
import Achievement from "@/components/ui/achievements-rewards/achievement";
import Missions from "@/components/ui/achievements-rewards/missions";
import Tab from "@/components/ui/achievements-rewards/tab";
import Container from "@/components/ui/container";
const Achievements = () => {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<main className="min-h-screen bg-gradient-to-b from-blue-500/90 to-blue-800  animated-background">
			<Bubble />
			<Nav />
			<Container>
				<Tab setActiveTab={setActiveTab} />
				{activeTab === 0 && <Achievement />}
				{activeTab === 1 && <Missions />}
			</Container>
		</main>
	);
};

export default Achievements;
