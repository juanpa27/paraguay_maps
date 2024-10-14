import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';


export default function MapCard({ imageUrl, title, description, extraData }) {
  return (
    <div className="card lg:card-side bg-base-100 shadow-2xl m-4">
      <figure className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden cursor-zoom-in border-primary hover:border-secondary border-2">
        <PhotoProvider>
          <PhotoView src={imageUrl}>
            <img 
              src={imageUrl} 
              alt={title} 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110" 
            />
          </PhotoView>
        </PhotoProvider>
        
      </figure>
      <div className="card-body lg:w-3/5">
        <h2 className="card-title text-primary">{title}</h2>
        <p className="text-base-content">{description}</p>
        {extraData && (
          <div className="mt-2">
            <p className="text-xs text-base-content">{extraData}</p>
          </div>
        )}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Ver +</button>
        </div>
      </div>
    </div>
  );
}