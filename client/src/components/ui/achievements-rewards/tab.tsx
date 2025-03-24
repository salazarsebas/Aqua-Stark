import React, { useState } from "react";
import { Trophy, Target, Star, Calendar } from "lucide-react";

interface TabProps {
	setActiveTab: (tab: number) => void;
}

const tabs = [
	{ title: "Achievements", value: 0, icon: <Trophy size={15} /> },
	{ title: "Missions", value: 1, icon: <Target size={15} /> },
	{ title: "Login Rewards", value: 2, icon: <Calendar size={15} /> },
	{ title: "Milestones", value: 3, icon: <Star size={15} /> },
];

const Tab: React.FC<TabProps> = ({ setActiveTab }) => {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleTabClick = (value: number) => {
		setSelectedTab(value);
		setActiveTab(value);
	};

	return (
		<div className="flex  p-1 px-2  bg-blue-700/60   rounded mt-[25px] mb-[20px]">
			{tabs.map((tab) => (
				<div
					key={tab.value}
					onClick={() => handleTabClick(tab.value)}
					className={`flex items-center justify-center gap-1 px-4 py-1 cursor-pointer w-full  transition-all
            ${
				selectedTab === tab.value
					? " bg-blue-500/30 text-white"
					: " text-gray-200 hover:bg-blue-700"
			}`}
				>
					{tab.icon}
					<span className=" font-bold text-sm">{tab.title}</span>
				</div>
			))}
		</div>
	);
};

export default Tab;
