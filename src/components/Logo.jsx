import React from 'react'

export default function Logo({ className = '', size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
    >
      <circle cx="50" cy="50" r="50" className="fill-primary" />
      <path
        d="M30 35 C 45 35, 55 50, 70 50 C 55 50, 45 65, 30 65 C 45 65, 55 50, 70 50"
        className="fill-primary-content"
        strokeWidth="6"
        strokeLinecap="round"
        stroke="currentColor"
      />
    </svg>
  )
}