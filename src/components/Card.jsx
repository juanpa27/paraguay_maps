import React from 'react';

const Card = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Título de la Tarjeta</h2>
        <p>Este es un ejemplo de tarjeta utilizando DaisyUI.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Acción</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
