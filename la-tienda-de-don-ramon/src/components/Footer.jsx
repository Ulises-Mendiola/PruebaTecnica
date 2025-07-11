    // src/components/Footer.jsx
    import React from 'react';
    import foto from '../assets/foto.jpeg';
    import './Footer.css';

    function Footer() {
    return (
        <footer>
        <div className="footer-content">
            <div className="developer-info">
            <img src={foto} alt="Héctor Ulises Mendiola Morales" className="profile-photo" />
            <div className="contact-info">
                <h3>Héctor Ulises Mendiola Morales</h3>
                <p>hmendiolamorales@gmail.com</p>
                <a 
                href="https://wa.me/526692785121" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-link"
                >
                Contactar por WhatsApp
                </a>
            </div>
            </div>
            
            <div className="quote">
            <p>"¡Ni modo, chavo! A trabajar se ha dicho."</p>
            <p className="signature">- Don Ramón</p>
            </div>
        </div>
        </footer>
    );
    }

    export default Footer;