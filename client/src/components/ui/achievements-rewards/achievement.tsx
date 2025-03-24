import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Droplet, Gift, Heart, Sparkles, Trophy, Zap } from "lucide-react";

const Achievement = () => {
	const [activeTab, setActiveTab] = useState("All");

	const tabs = ["All", "Collection", "Breeding", "Special"];

	const progressStats = {
		Collection: { completed: 1, total: 3 },
		Breeding: { completed: 0, total: 1 },
		Decoration: { completed: 0, total: 1 },
		Special: { completed: 1, total: 2 },
	};

	// Mock data for achievements
	const achievements = [
		{
			id: 1,
			icon: <Trophy size={20} />,
			category: "Collection",
			title: "Fish Collector",
			description: "Collect 30 different fish species",
			progress: { completed: 24, total: 30 },
			xp: 200,
			rewards: "500 Coins + Rare Fish Egg",
			completed: false,
		},
		{
			id: 2,
			icon: <Sparkles size={20} />,
			category: "Decoration",
			title: "Aquarium Designer",
			description: "Decorate your aquarium with 20 different items",
			progress: { completed: 15, total: 20 },
			xp: 150,
			rewards: "Premium Decoration Set",
			completed: false,
		},
		{
			id: 3,
			icon: <Heart size={20} />,
			category: "Breeding",
			title: "Master Breeder",
			description: "Successfully breed 10 different fish combinations",
			progress: { completed: 7, total: 10 },
			xp: 300,
			rewards: "Breeding Lab Upgrade",
			completed: false,
		},
		{
			id: 4,
			icon: <Droplet size={20} />,
			category: "Special",
			title: "Water Expert",
			description: "Maintain perfect water quality for 7 consecutive days",
			progress: { completed: 7, total: 7 },
			xp: 0,
			rewards: "Advanced Filter System",
			completed: true,
			completedDate: "Apr 12, 2025",
		},
		{
			id: 5,
			icon: <Zap size={20} />,
			category: "Special",
			title: "Fish Whisperer",
			description: "Reach maximum happiness with 5 different fish",
			progress: { completed: 5, total: 5 },
			xp: 0,
			rewards: "Special Food Collection",
			completed: true,
			completedDate: "Mar 20, 2025",
		},
		{
			id: 6,
			icon: <Gift size={20} />,
			category: "Special",
			title: "Treasure Hunter",
			description: "Find 15 hidden treasures in your aquarium",
			progress: { completed: 8, total: 15 },
			xp: 250,
			rewards: "Golden Treasure Chest Decoration",
			completed: false,
		},
		{
			id: 7,
			icon: <Heart size={20} />,
			category: "Social",
			title: "Social Butterfly",
			description: "Make 10 friends in the Aqua Stark community",
			progress: { completed: 4, total: 10 },
			xp: 100,
			rewards: "Exclusive Social Profile Frame",
			completed: false,
		},
		{
			id: 8,
			icon: <Award size={20} />,
			category: "Collection",
			title: "Legendary Collector",
			description: "Collect 5 legendary fish species",
			progress: { completed: 2, total: 5 },
			xp: 500,
			rewards: "Legendary Fish Food + 1,000 Coins",
			completed: false,
		},
	];

	// Filter achievements based on the active tab
	const filteredAchievements =
		activeTab === "All"
			? achievements
			: achievements.filter((achievement) => achievement.category === activeTab);

	// Animation variants for the card
	const cardVariants = {
		initial: {
			scale: 1,
			y: 0,
		},
		hover: {
			scale: [1, 1.02, 1],
			//   y: [0, -2, 0],
			transition: {
				scale: { duration: 0.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
				y: { duration: 0.6, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
			},
		},
	};

	return (
		<main className="min-h-screen">
			<section className="container mx-auto px-6 py-8">
				<div className="flex justify-between items-center mb-6">
					<h2 className="text-xl font-bold text-white">Your Achievement</h2>
					<div className="flex gap-2">
						{tabs.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-4 py-2 rounded text-sm font-bold transition-colors ${
									activeTab === tab
										? "bg-blue-700/30 text-white"
										: "bg-blue-700/80 bg-opacity-50 text-gray-100 hover:bg-opacity-70"
								} backdrop-blur-md`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				{/* Achievement Progress */}
				<div className="bg-[#1A2A44] bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-white mb-6">
					<div className="flex justify-between items-center mb-2">
						<h3 className="text-lg font-semibold">Achievement Progress</h3>
						<span className="text-sm">2 of 8 completed</span>
					</div>
					<div className="w-full bg-blue-700/80 rounded-full h-2 mb-4">
						<div className="bg-purple-500 h-2 rounded-full" style={{ width: "25%" }} />
					</div>
					<div className="grid grid-cols-4 gap-4 text-center">
						{Object.entries(progressStats).map(([category, { completed, total }]) => (
							<div key={category} className="bg-blue-800/15 p-2 rounded">
								<p className="text-sm font-bold text-blue-200">{category}</p>
								<p className="text-sm font-extrabold">{`${completed}/${total}`}</p>
							</div>
						))}
					</div>
				</div>

				{/* Achievements Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{filteredAchievements.map((achievement) => (
						<motion.div
							key={achievement.id}
							className={`bg-[#1A2A44] cursor-pointer bg-opacity-20 backdrop-blur-md rounded-lg p-4 text-white flex gap-4 ${
								achievement.completed && "border border-green-500/45"
							}`}
							variants={cardVariants}
							initial="initial"
							whileHover="hover"
						>
							<div
								className={`w-12 h-12 bg-blue-500/20 rounded-[10px] flex items-center justify-center ${
									achievement.completed && "bg-green-500/25"
								}`}
							>
								<div className="text-2xl">{achievement.icon}</div>
							</div>

							{/* Achievement Details */}
							<div className="flex-1">
								<div className="flex justify-between mb-1">
									<div>
										<h4 className="text-base text-white font-extrabold">
											{achievement.title}
										</h4>
										<p className="text-sm font-bold text-blue-200">
											{achievement.description}
										</p>
									</div>
									{achievement.completed ? (
										<span className="text-xs font-bold text-blue-100">
											Completed
										</span>
									) : (
										<span className="text-xs text-blue-100 font-bold">
											+{achievement.xp} XP
										</span>
									)}
								</div>

								{achievement.completed ? (
									<p className="text-xs text-blue-300 my-2">
										Completed on {achievement.completedDate}
									</p>
								) : (
									<div className="flex flex-col gap-0 mt-2">
										<div className="text-blue-300 font-medium flex items-center justify-between">
											<p className="text-xs">Progress</p>
											<p className="text-xs">
												{achievement.progress.completed}/
												{achievement.progress.total}
											</p>
										</div>
										<div className="w-full bg-blue-800 rounded-full h-2 mt-1 mb-2">
											<div
												className="bg-indigo-400 h-2 rounded-full"
												style={{
													width: `${
														(achievement.progress.completed /
															achievement.progress.total) *
														100
													}%`,
												}}
											/>
										</div>
									</div>
								)}

								<div className="flex items-center gap-1">
									<Gift size={10} className="text-yellow-400" />
									<p className="text-[10px] text-gray-200 font-bold mt-[.5px]">
										Reward: {achievement.rewards}
									</p>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>
		</main>
	);
};

export default Achievement;
