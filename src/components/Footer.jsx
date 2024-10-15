import React from 'react';
import { Github, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
    
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/juanpa27" className="btn btn-ghost btn-square">
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://www.instagram.com/paraguay_maps/" className="btn btn-ghost btn-square">
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://x.com/paraguaymaps" className="btn btn-ghost btn-square">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </nav> 
      <aside>
        <p>&copy; 2024 Paraguay Maps. Todos los derechos reservados.</p>
      </aside>
    </footer>
  );
};

export default Footer;