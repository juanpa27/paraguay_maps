import React from 'react'
import { MapPin, Users, Mountain } from 'lucide-react'

export default function MapLinks() {
  const cards = [
    { title: 'Demografía', icon: Users, color: 'bg-primary' },
    { title: 'Geografía', icon: MapPin, color: 'bg-secondary' },
    { title: 'Topografía', icon: Mountain, color: 'bg-accent' }
  ]

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`card w-96 ${card.color} text-primary-content shadow-xl 
                      transform transition-all duration-300 ease-in-out 
                      hover:scale-105 hover:shadow-2xl 
                      animate-fade-in-up`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold mb-4 flex items-center">
              <card.icon className="w-8 h-8 mr-2" />
              {card.title}
            </h2>
            <p className="text-lg">
              Explora nuestros mapas de {card.title.toLowerCase()} interactivos y detallados.
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-outline btn-lg hover:scale-110 transition-transform duration-200">
                Ver Mapas
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}