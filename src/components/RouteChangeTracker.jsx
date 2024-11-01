import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = 'G-PHFT9TEBH5';

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Inicializa Google Analytics solo una vez.
    ReactGA.initialize(TRACKING_ID);
    console.log("Google Analytics initialized");
  }, []); // Se ejecuta solo una vez al montar el componente

  useEffect(() => {
    // Envía la información de la página cada vez que cambie la ubicación
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
    console.log("Pageview sent for: ", location.pathname);
  }, [location]);

  return null;
};

export default RouteChangeTracker;
