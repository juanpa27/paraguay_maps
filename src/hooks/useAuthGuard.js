import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const useAuthGuard = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Intentar recuperar el usuario de localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        useAuthStore.setState({ user: JSON.parse(storedUser) });
        setLoading(false); // Finaliza la carga si el usuario está recuperado de localStorage
      } else {
        // Si no hay un usuario logueado, redirigir a la página de no autorizado
        navigate('/unauthorized');
      }
    } else {
      setLoading(false); // Finaliza la carga si el usuario está logueado
    }
  }, [user, navigate]);

  return { user, loading };
};

export default useAuthGuard;
