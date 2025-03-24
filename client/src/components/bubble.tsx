import { useState, useEffect } from "react";

const Bubble = () => {
	const [bubbles, setBubbles] = useState<
		Array<{ id: number; size: number; left: number; animationDuration: number }>
	>([]);

	useEffect(() => {
		const newBubbles = Array.from({ length: 25 }, (_, i) => ({
			id: i,
			size: Math.random() * 30 + 5,
			left: Math.random() * 100,
			animationDuration: Math.random() * 15 + 5,
		}));
		setBubbles(newBubbles);
	}, []);

	return (
		<>
			{bubbles.map((bubble) => (
				<div
					key={bubble.id}
					className="bubble"
					style={
						{
							width: `${bubble.size}px`,
							height: `${bubble.size}px`,
							left: `${bubble.left}%`,
							"--duration": `${bubble.animationDuration}s`,
						} as React.CSSProperties
					}
				/>
			))}
		</>
	);
};

export default Bubble;
