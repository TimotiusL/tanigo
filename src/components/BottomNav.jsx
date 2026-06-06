import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const menus = [
    {
      name: "Home",
      path: "/",
      icon: "🏠",
    },
    {
      name: "Crop",
      path: "/crop",
      icon: "🌾",
    },
    {
      name: "Weather",
      path: "/weather",
      icon: "🌦️",
    },
    {
      name: "Profit",
      path: "/profit",
      icon: "💰",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="w-full px-4 pb-4">
        <div className="backdrop-blur-xl bg-base-100/90 border border-green-100 shadow-2xl rounded-3xl px-4 py-3 flex justify-between w-full">
          {menus.map((menu, index) => (
            <Link
              key={index}
              to={menu.path}
              className={`flex flex-col items-center text-xs transition ${
                location.pathname === menu.path
                  ? "text-green-700 font-semibold"
                  : "text-gray-400"
              }`}
            >
              <span className="text-xl">{menu.icon}</span>

              <span className="mt-1">{menu.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
