export default function FloatingControls() {
    const controls = [
      { label: "📖 Log", color: "bg-yellow-500" },
      { label: "✏ Edit", color: "bg-green-500" },
      { label: "🏆 Achievements", color: "bg-red-500" }
    ];
  
    return (
      <div className="absolute bottom-4 right-4 flex space-x-2 sm:space-x-4 md:bottom-8 md:right-8">
        {controls.map((control, index) => (
          <button
            key={index}
            className={`${control.color} p-2 text-white rounded sm:text-lg md:text-xl transition-transform duration-200 hover:scale-105`}
          >
            {control.label}
          </button>
        ))}
      </div>
    );
  }
  