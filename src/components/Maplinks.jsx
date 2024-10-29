import React from 'react'
import { MapPin, Users, Mountain, Palmtree, Landmark,  TrendingUp, Building, Tractor, Shuffle } from 'lucide-react'
import categories from "../config/categories.json";

export default function MapLinks() {
  const categoryIcons = {
    'Turismo': Palmtree,
    'Geografía': MapPin,
    'Cultura': Landmark,
    'Deportes': Users ,
    'Economía': TrendingUp,
    'Población': Users,
    'Infraestructura': Building,
    'Agropecuario': Tractor,
    'Ramdom': Shuffle
  }

  const categoryColors = [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'bg-info',
    'bg-success',
    'bg-warning',
    'bg-error',
    'bg-neutral',
    'bg-base-300'
  ]

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {categories.map((category, index) => {
        const Icon = categoryIcons[category.value] || Mountain
        return (
          <div
            key={category.value}
            className={`card w-80 ${categoryColors[index % categoryColors.length]} text-primary-content shadow-xl 
                        transform transition-all duration-300 ease-in-out 
                        hover:scale-105 hover:shadow-2xl 
                        animate-fade-in-up`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-4 flex items-center">
                <Icon className="w-8 h-8 mr-2" />
                {category.label}
              </h2>
              <p className="text-base">
                Explora nuestros mapas de {category.label.toLowerCase()} interactivos y detallados.
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-outline btn-sm lg:btn-md hover:scale-110 transition-transform duration-200">
                  Ver Mapas
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}