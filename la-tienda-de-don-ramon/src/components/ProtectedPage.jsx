    // src/components/ProtectedPage.jsx
    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { useProducts } from '../context/ProductsContext';
    import ProductCard from './ProductCard';
    import DonRamon from '../assets/DonRamon.png';
    import './ProtectedPage.css';

    function ProtectedPage() {
    const { user, logout } = useAuth();
    const { 
        products, 
        categories, 
        loading, 
        error, 
        filters, 
        updateFilter, 
        totalPages,
        totalProducts,
        favorites,
        toggleFavorite
    } = useProducts();
    const [showFavorites, setShowFavorites] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const displayedProducts = showFavorites 
        ? products.filter(p => favorites.includes(p.id))
        : products;

    return (
        <div className="protected-page">
        <div className="user-header">
            <img src={DonRamon} alt="Don Ramón" className="user-avatar" />
            <div className="user-info">
            <h2>Bienvenido, {user?.name || 'Chavo'}!</h2>
            <p>¿Qué vas a comprar hoy en la vecindad?</p>
            </div>
            <button onClick={handleLogout} className="btn-logout">Salir de la vecindad</button>
        </div>

        {error ? (
            <div className="error-container">
            <div className="error-content">
                <h3>¡Se me cayó el pelo!</h3>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">
                Intentar de nuevo
                </button>
            </div>
            </div>
        ) : (
            <>
            <div className="controls-container">
                <div className="filter-group">
                <label>Categoría:</label>
                <select 
                    value={filters.category} 
                    onChange={(e) => updateFilter('category', e.target.value)}
                >
                    <option value="">Todas las categorías</option>
                    {categories.map(category => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                </div>

                <div className="filter-group">
                <label>Ordenar por:</label>
                <select 
                    value={filters.sort} 
                    onChange={(e) => updateFilter('sort', e.target.value)}
                >
                    <option value="">Predeterminado</option>
                    <option value="name-asc">Nombre (A-Z)</option>
                    <option value="name-desc">Nombre (Z-A)</option>
                    <option value="price-asc">Precio (menor a mayor)</option>
                    <option value="price-desc">Precio (mayor a menor)</option>
                </select>
                </div>

                <div className="filter-group">
                <label>Buscar:</label>
                <input 
                    type="text" 
                    placeholder="Buscar productos..." 
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                />
                </div>

                <div className="favorites-toggle">
                <button 
                    onClick={() => setShowFavorites(!showFavorites)}
                    className={showFavorites ? 'btn-active' : ''}
                >
                    {showFavorites ? 'Mostrar todos' : 'Ver favoritos'} 
                    {favorites.length > 0 && ` (${favorites.length})`}
                </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-container">
                <div className="spinner"></div>
                <p>Cargando productos de la vecindad...</p>
                </div>
            ) : (
                <>
                {displayedProducts.length === 0 ? (
                    <div className="no-products">
                    <h3>¡No hay productos aquí, chavo!</h3>
                    <p>{showFavorites 
                        ? "Aún no tienes productos favoritos. Dale al corazón para guardarlos." 
                        : "No encontramos productos con esos filtros. Intenta cambiar los criterios."}
                    </p>
                    </div>
                ) : (
                    <>
                    <div className="products-grid">
                        {displayedProducts.map(product => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            isFavorite={favorites.includes(product.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                        ))}
                    </div>

                    {!showFavorites && totalPages > 1 && (
                        <div className="pagination">
                        <button 
                            onClick={() => updateFilter('page', filters.page - 1)} 
                            disabled={filters.page === 1}
                        >
                            Anterior
                        </button>
                        
                        <span>Página {filters.page} de {totalPages}</span>
                        
                        <button 
                            onClick={() => updateFilter('page', filters.page + 1)} 
                            disabled={filters.page === totalPages}
                        >
                            Siguiente
                        </button>
                        </div>
                    )}

                    {showFavorites && favorites.length > 0 && (
                        <div className="favorites-count">
                        Tienes {favorites.length} producto{favorites.length !== 1 ? 's' : ''} favorito{favorites.length !== 1 ? 's' : ''}
                        </div>
                    )}
                    </>
                )}
                </>
            )}
            </>
        )}
        </div>
    );
    }

    export default ProtectedPage;