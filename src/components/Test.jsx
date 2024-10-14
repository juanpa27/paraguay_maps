import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

export default function TestImage() {
  return (
    <PhotoProvider>
      <PhotoView src="https://via.placeholder.com/600">
        <img
          src="https://via.placeholder.com/600"
          alt="Test"
          className="w-64 h-64 object-cover cursor-zoom-in"
        />
      </PhotoView>
    </PhotoProvider>
  );
}
