import { useState, useEffect, useRef } from 'react';
import { addMap } from '../services/mapService';
import { useAuthStore } from '../store/useAuthStore';

export const useMapForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [extradata, setExtraData] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const fileInputRef = useRef(null);

  const user = useAuthStore((state) => state.user);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // Effect to automatically hide the alert after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsButtonDisabled(true);

    try {
      const mapData = {
        title,
        description,
        source,
        extradata,
        category,
        status,
        user_id: user?.id,
      };

      await addMap(mapData, image);

      // Success message
      setMessage({ text: 'Mapa agregado correctamente.', type: 'success' });

      // Clear the form
      setTitle('');
      setDescription('');
      setSource('');
      setExtraData('');
      setCategory('');
      setStatus(true);
      setImage(null);

      // Reset the file input field
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (err) {
      setMessage({ text: `Error: ${err.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
      setIsButtonDisabled(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    source,
    setSource,
    extradata,
    setExtraData,
    category,
    setCategory,
    status,
    setStatus,
    image,
    message,
    isSubmitting,
    isButtonDisabled,
    fileInputRef,
    handleImageChange,
    handleSubmit,
  };
};
