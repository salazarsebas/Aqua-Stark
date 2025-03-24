import { ArrowLeft, Trophy } from "lucide-react";
import Container from "@/components/ui/container";

const Nav = () => {
	return (
		<header className="text-white bg-opacity-20  bg-blue-700/80 backdrop-blur-md">
			<Container>
				<nav className="flex items-center justify-between py-[14px]">
					<div className="flex gap-6">
						<a
							href="/"
							className="flex items-center gap-3 text-[12.5px] font-bold hover:text-gray-300 transition-colors"
						>
							<ArrowLeft className="h-4 w-4" />
							Back to Game
						</a>
						<h1 className="text-xl text-white font-extrabold">
							Achievements & Rewards
						</h1>
					</div>

					{/* Trophy Counter */}
					<div className="flex items-center  rounded-full px-4 py-2 border border-blue-400/90">
						<Trophy className="text-yellow-400 mr-2" size={15} />
						<span className="text-sm font-bold">2/8</span>
					</div>
				</nav>
			</Container>
		</header>
	);
};

export default Nav;
