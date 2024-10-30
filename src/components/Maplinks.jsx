import React from "react";
import {
  MapPin,
  Users,
  Mountain,
  Palmtree,
  Landmark,
  Trophy,
  TrendingUp,
  Building,
  Tractor,
  Shuffle,
} from "lucide-react";
import categories from "../config/categories.json";

export default function MapLinks() {
  const categoryIcons = {
    Turismo: Palmtree,
    Geografía: MapPin,
    Cultura: Landmark,
    Deportes: Trophy,
    Economía: TrendingUp,
    Población: Users,
    Infraestructura: Building,
    Agropecuario: Tractor,
    Ramdom: Shuffle,
  };

  const categoryColors = [
    {
      bg: "bg-blue-600",
      text: "text-white",
      hover: "hover:bg-blue-700",
      outline: "border-blue-300",
    },
    {
      bg: "bg-green-600",
      text: "text-white",
      hover: "hover:bg-green-700",
      outline: "border-green-300",
    },
    {
      bg: "bg-purple-600",
      text: "text-white",
      hover: "hover:bg-purple-700",
      outline: "border-purple-300",
    },
    {
      bg: "bg-red-600",
      text: "text-white",
      hover: "hover:bg-red-700",
      outline: "border-red-300",
    },
    {
      bg: "bg-yellow-500",
      text: "text-gray-900",
      hover: "hover:bg-yellow-600",
      outline: "border-yellow-300",
    },
    {
      bg: "bg-indigo-600",
      text: "text-white",
      hover: "hover:bg-indigo-700",
      outline: "border-indigo-300",
    },
    {
      bg: "bg-pink-600",
      text: "text-white",
      hover: "hover:bg-pink-700",
      outline: "border-pink-300",
    },
    {
      bg: "bg-gray-600",
      text: "text-white",
      hover: "hover:bg-gray-700",
      outline: "border-gray-300",
    },
    {
      bg: "bg-teal-600",
      text: "text-white",
      hover: "hover:bg-teal-700",
      outline: "border-teal-300",
    },
  ];

  return (
    <div id="mapslinks" className="flex flex-wrap justify-center gap-6 p-4">
      {categories.map((category, index) => {
        const Icon = categoryIcons[category.value] || Mountain;
        const colorScheme = categoryColors[index % categoryColors.length];
        return (
          <div
            key={category.value}
            className={`card w-80 ${colorScheme.bg} ${colorScheme.text} shadow-xl 
                        transform transition-all duration-300 ease-in-out 
                        hover:scale-105 hover:shadow-2xl ${colorScheme.hover}
                        animate-fade-in-up`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-4 flex items-center">
                <Icon className="w-8 h-8 mr-2" />
                {category.label}
              </h2>
              <p className="text-base opacity-90">
                Explora nuestros mapas de {category.label.toLowerCase()}.
              </p>
              <div className="card-actions justify-end mt-4">
                <button
                  className={`btn btn-outline ${colorScheme.text} border-2 ${colorScheme.outline} 
                                    hover:bg-white hover:text-gray-900
                                    btn-sm lg:btn-md hover:scale-110 transition-transform duration-200`}
                >
                  Ver Mapas
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
