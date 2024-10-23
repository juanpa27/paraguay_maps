import React, { useState, useEffect } from 'react'
import { XCircle, CheckCircle } from 'lucide-react'

export default function ModalAlert({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message, onClose])

  if (!message) return null

  return (
    <div className={`toast toast-top toast-center ${isVisible ? 'visible' : 'invisible'}`}>
      <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
        <div>
          {message.type === 'success' ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <XCircle className="w-6 h-6" />
          )}
          <span>{message.text}</span>
        </div>
        <div className="flex-none">
          <button onClick={onClose} className="btn btn-sm btn-ghost">Cerrar</button>
        </div>
      </div>
    </div>
  )
}