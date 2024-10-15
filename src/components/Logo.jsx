/* eslint-disable react/prop-types */
export default function Logo({ className = "", size = 60, circle }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width={size}
      height={size}
      className={`inline-block ${className}`}
    >
      
      {circle && (
        <circle
          cx="400" // Centrado horizontalmente (mitad del ancho del viewBox)
          cy="300" // Centrado verticalmente (mitad de la altura del viewBox)
          r="300" // Radio para que abarque bien el contenido
          fill="currentColor"
          className="text-accent-content" // Puedes cambiar esta clase por el color deseado usando Tailwind/DaisyUI
        />
      )}
      {/* Path del logo */}
      <path
        d="m149 218 2-3 1-6 2-6 3-9 2-7 3-9 2-7 2-8 2-7 2-6 2-7v-33l2-3 2-2 1-2 3-4 2-3 3-4 3-4 1-2 1-1 1-2 1-1v-2l1-1v-1l1-1 1-2 1-4 2-5 2-5 1-4 1-4h1l1-1h5l1-1h3l3-1h1l21-4 20-5 20-4 20-4 9-2h16l11-1h29l2 2 1 1 3 2 6 3 6 4 5 3 6 4 5 3 6 3 5 4 6 3 2 2 1 1v5l1 3v8l-1 3v3h2l1 1v1l-3 1v2l2 1v-1h2v6l1 1 1 1 1 1 1 1h1l1 1v1l-1 2v4l1 2v3l1 1v4h1l1-2h2l1 1v1h1l1 1v2h-2l-1 1-1 1-1 1h3l1 1 1 1v2l-3 1v2h1l1 2 2 1v-1l2 1v1l-1 2-2 2 1 1v2l1 3v3l-1 3-2 2-1 1h-1v1l1 1 1 1h1v3l-4 6-1 2v4h1l1 1v1l-1 2-1 1 1 1v1l1 1h1v1l-3 4v1l1 2v1l-1 1-1 1 1 1 1 1v3l-2 2v1l-2 4v2l1 1 1 1 1 1v1h5l1 1h1l1-1h2v-1h6v-1h1v1l1 2 1 2h1l1 1 1-1h2l2 1 2-1h1l1 1h1l2 2h1v-1l1 1h1v-1h1l3 1 1-1 2-1h1v2h1v-1h2l2 1 1 1h8v1h2l1 1 1-2 1 1v2l1 1h1l1-1 1-1v-1h5l1-1v-1h1l2 3h1l1-1-1-1h1v-1l2-1 1-1 1-2h1v-2l1-1 1-1 1-1h6l2 4 1 3 2 1 3 2 2 2 1 1h14l1 1h1l3 1h2v-1l3 4 3 1v1l1 2v7l1 3 2 1 2 1 1 1h1v1l1 1v1l-1 1v1l1 1v1l-1 2-1 2-1 2v2l2 5v1l-1 2 1 1 1 2 1 1v6l2 1 2 5v1l-2 3v3l2 2 1 1v2l-2 4v2l1 2v5l1 1 3 3 1 4 1 13v1l2 2 2 1h5l2 1 3 1h2l2-2h5l2-1h3l1-1h1l1-2 1-1 4-2 8-3h1l1-2h3l10 6 1 1 3 4 6 4 2 1-2 1-2 1-1 2-1 2v1l1 2v3l1 1 1 1 1 2 1 2v2l-1 2-1 1-2 4-1 2v2l1 4v3l-2 6-1 3-2 2v1l-3 12v6l2 3v1l-1 1-2 2-1 1-1 4-1 3-1 1-2 2-1 2-1 2v5l1 2v1l-1 2v1l1 2v1l-1 1h-2v2l1 4v2l2 2v2l-1 1v1l-1 1 1 3v1l-1 1v1h-2v4l1 2v2l-1 4v1l1 1v2l-1 1v1h-1l1 1v3l-1 3h-1v5l-1 1-2 2-1 2-1 1-1 1v2l1 1v2l-1 1v2l-1 1h-6l-1 1v1l-1 3-1 1v1l-1 1-1 1h-3l-1 1-4 4v5l-1 1h-3l-1-1h-1l-2-1h-1l-3 2h-3l-1 1h-1l-1 1-1 2v4l-1 1h-4l-1 1v2l-1 1h-1l-1 1v1l1 3h1v2l-1 1v2l-1 2-1 1-1 1h-1l-2 1-2 3-2 1-4-2h-2l-1-1-1-3-1-1h-6l-4-2h-3l-2 1h-1l-2 3-2 1h-1l-2 1v5l-1 1-1 1-1 2-1 2-1 2h-2l-2-1-2-1-1-2-1-2-3-3h-5l-3 1-3 2-2 1-2-2-4-3-2-1h-2l-2 1-6 3-2 1-3-1h-3l-1-2h-1l-3-1h-1v-1l-1-1h-4l-6 1-1-1h-2l-9-5h-1l-6-2h-3l-2-1h-1l-2-1-4-1h-2l-4 1h-1l-7-1-16 1-5 3v-5l-1-1-1-1-1-1-1-1 1-2 1-1 1-1 3-1v-3l1-1v-1h1v1l1 1v-2h1v-2l1-1 1-1-1-1v-2h1l3-1h1l1-1v-1h3l1-1-1-1-1-1v-2h3l1-1v-2h2v-7l1-1 2 1h1v-2h-1v-1l1-1 1-1-1-1-2-1v-5l1-1 1-1-2-1v-2l2-4 1-1v-5h2l1-1v-1l-1-1-1-1v-1l1 1h1v-2l1-2 1-1 3-1 2-1 7-5 1-1v-1l-3-1 1-1 2-2 1-1v-1h-2v-1l1-1h2v-1h1l1-1-1-2-1-2h1l1-1 2-1 1-1v-1h-1l-1-1 1-2h1l1-1h3v-3l2 1h1l1-1v-1l1-1 1-1v-1l1-6v-2l-1-1-4-2v-1l-2-5-2-1-1-2-2-4v-1l-2-1-1-1-3-3h-1l-1-1h-5l-1-1v-1h-3l-4-2h-1v-1l-6-4h-1l-1 1-1 2h-1l-1 1h-1v-1h-1v-1l-4-4-1-2-1-1-2-1-13-2v-1l-1-1h-4l-2-1-11-8-2-1-2-2h-3l-2-2h-2l-1-2h-3v-1h-1v-1h-2v-1l-2-1-1-1-1-2-1-1-2-2-2-1v-1h-1l-1-1-1-1h-1l-1-1-1-1h-3v-1h-1l-1-1-2-3-22-14h-2l-3 1h-13v-1l-1-1h-4l-3-1-2-1-1-1h-3l-1-2v-1h-2v-1h-4l-1-1h-7l-2-1-2-2-2-1-3 1-2-1v-1l-1-1v-2l-1-1-1-1-2-1-1-2v-1l1-2-1-1v-1h-1l-1-1-1-1h-3v-1l-2-1-1-1h-1v-2h-1l-4-2h-2l-1-1-1-1h-1l-1-1h-2l-1-2h-1l1-1v-1h-2v-1l-3-3h-5v-1l-1-1h-1l-1-1h-1v-4l-1-1h-1l-1-1-1-1-1-2h-1l-6-4-2-3-1-1v-3l-1-1-1-2-1-1-1-2h-1v-1l-1-1-1-1v-1l-2-2v-1h-1v-1h-1l1-2-1-1v-3h-2l-1-1h-1v-1l1-1v-2l-1-2h-2v-2h-1l-2-1h-2l-4-3-1-1v-1l-1-1h-2l-1-1-1-2h-1l-2-1h-2l-1-1 1-1v-3h-2z"
        fill="currentColor" // Adapta el color al contexto de Tailwind
        className="text-primary"
        filter="url(#shadow)"
      />
    </svg>
  );
}
