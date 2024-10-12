import React from 'react';

export default function MapCard({ imageUrl, title, description, extraData }) {
  return (
    <div className="card w-full md:w-80 bg-base-100 shadow-xl m-4">
      <figure>
        <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-primary">{title}</h2>
        <p className="text-sm text-base-content">{description}</p>
        <div className="mt-2">
          {extraData && (
            <div className="text-xs text-base-content">
              {/* Puedes personalizar la información adicional */}
              <p>{extraData}</p>
            </div>
          )}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary btn-sm">Learn More</button>
        </div>
      </div>
    </div>
  );
}
