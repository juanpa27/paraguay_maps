// MapCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const MapCard = ({ map }) => {
  return (
    <div className="card bg-base-100 shadow-2xl">
      <figure className="relative pt-[56.25%] overflow-hidden cursor-zoom-in">
        <PhotoProvider>
          <PhotoView src={map.image_url}>
            <img 
              src={map.image_url} 
              alt={map.title} 
              className="absolute inset-0 w-full h-full object-contain bg-gray-100 transition-transform duration-300 hover:scale-110" 
            />
          </PhotoView>
        </PhotoProvider>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-primary text-lg">{map.title}</h2>
        <p className="text-base-content text-sm line-clamp-2">{map.description}</p>
        {map.category && (
          <div className="mt-2">
            <span className="text-xs text-base-content bg-base-200 px-2 py-1 rounded-full">
              {map.category}
            </span>
          </div>
        )}
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Ver +</button>
        </div>
      </div>
    </div>
  );
};

MapCard.propTypes = {
  map: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
};

export default MapCard;