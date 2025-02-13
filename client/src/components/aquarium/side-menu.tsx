export default function SideMenu() {
    return (
      <div className="absolute right-4 top-20 flex flex-col space-y-2 sm:space-y-4 md:right-8 md:top-24">
        {[
          { label: "📦 Inventory" },
          { label: "🎯 Missions" },
          { label: "✅ Checklist" }
        ].map((item, index) => (
          <button
            key={index}
            className="p-2 bg-gray-700 text-white rounded sm:text-lg md:text-xl transition-transform duration-200 hover:scale-105"
          >
            {item.label}
          </button>
        ))}
      </div>
    );
  }
  