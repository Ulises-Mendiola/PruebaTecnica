import React from 'react';
import './ProductCard.css'; // Nueva importación

const ProductCard = React.memo(({ product, isFavorite, onToggleFavorite }) => {
    const handleFavoriteClick = (e) => {
        e.preventDefault();
        onToggleFavorite(product.id);
    };

    const specialMessage = product.price < 10 && "¡Este producto ni en la vecindad lo encuentras, chavo!";

    return (
        <div className="product-card">
        <div className="product-image-container">
            <img 
            src={product.image} 
            alt={product.title} 
            className="product-image"
            loading="lazy"
            />
            <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
            ♥
            </button>
        </div>
        
        <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-category">{product.category}</p>
            
            <div className="product-price-container">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.price < 10 && (
                <span className="product-bargain">¡Baratísimo!</span>
            )}
            </div>
            
            <p className="product-description">{product.description.substring(0, 60)}...</p>
            
            {specialMessage && (
            <div className="special-message">
                {specialMessage}
            </div>
            )}
        </div>
        </div>
    );
    });

    export default ProductCard;