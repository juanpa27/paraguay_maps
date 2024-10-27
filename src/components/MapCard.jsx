import React from 'react';
import PropTypes from 'prop-types';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const MapCard = ({ map }) => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-2xl mb-6">
      <figure className="lg:w-2/5 h-64 lg:h-auto relative overflow-hidden cursor-zoom-in">
        <PhotoProvider>
          <PhotoView src={map.image_url}>
            <img 
              src={map.image_url} 
              alt={map.title} 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110" 
            />
          </PhotoView>
        </PhotoProvider>
      </figure>
      <div className="card-body lg:w-3/5">
        <h2 className="card-title text-primary text-xl mb-2">{map.title}</h2>
        <p className="text-base-content text-sm mb-4">{map.description}</p>
        {map.category && (
          <div className="mb-4">
            <p className="text-xs text-base-content">Categoría: {map.category}</p>
          </div>
        )}
        <div className="card-actions justify-end mt-auto">
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