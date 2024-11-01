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
import { useNavigate } from "react-router-dom";

export default function MapLinks() {
  const navigate = useNavigate();

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

  return (
    <div id="mapslinks" className="flex flex-wrap justify-center gap-6 p-4">
      {categories.map((category) => {
        const Icon = categoryIcons[category.value] || Mountain;
        return (
          <div
            key={category.value}
            className="card w-80 bg-secondary text-secondary-content shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
            onClick={() => navigate(`/category/${category.value}`)}
          >
            <div className="card-body p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 mb-4 rounded-full bg-base-100 bg-opacity-10 flex items-center justify-center">
                  <Icon className="w-24 h-24" strokeWidth={1.5} />
                </div>
                <h2 className="card-title text-2xl font-bold text-center">
                  {category.label}
                </h2>
              </div>
              <p className="text-base text-center">
                Explora nuestros mapas de {category.label.toLowerCase()}.
              </p>
              <div className="card-actions justify-center mt-4">
                <button className="btn btn-primary btn-outline hover:btn-primary transition-colors duration-300 w-full">
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