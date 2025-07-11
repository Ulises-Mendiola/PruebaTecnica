// src/context/ProductsContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios'; // Importación corregida

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        page: 1,
        limit: 8,
        search: '',
    });
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Obtener productos de la API
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        
        // Obtener categorías únicas
        const uniqueCategories = [...new Set(response.data.map(p => p.category))];
        setCategories(uniqueCategories);
        } catch (err) {
        setError("¡Se me cayó el pelo! No se pudieron cargar los productos.");
        console.error("Error fetching products:", err);
        } finally {
        setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
        
        // Cargar favoritos desde localStorage
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
        }
    }, [fetchProducts]);

    // Guardar favoritos en localStorage cuando cambian
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Función para alternar favoritos
    const toggleFavorite = (productId) => {
        setFavorites(prev => {
        if (prev.includes(productId)) {
            return prev.filter(id => id !== productId);
        } else {
            return [...prev, productId];
        }
        });
    };

    // Calcular productos filtrados y paginados
    const filteredProducts = useMemo(() => {
        let result = [...products];
        
        // Aplicar filtro de búsqueda
        if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        result = result.filter(p => 
            p.title.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm))
        }
        
        // Aplicar filtro de categoría
        if (filters.category) {
        result = result.filter(p => p.category === filters.category);
        }
        
        // Aplicar ordenamiento
        if (filters.sort) {
        switch (filters.sort) {
            case 'name-asc':
            result.sort((a, b) => a.title.localeCompare(b.title));
            break;
            case 'name-desc':
            result.sort((a, b) => b.title.localeCompare(a.title));
            break;
            case 'price-asc':
            result.sort((a, b) => a.price - b.price);
            break;
            case 'price-desc':
            result.sort((a, b) => b.price - a.price);
            break;
            default:
            break;
        }
        }
        
        return result;
    }, [products, filters]);

    // Calcular paginación
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / filters.limit);
    
    const paginatedProducts = useMemo(() => {
        const startIndex = (filters.page - 1) * filters.limit;
        return filteredProducts.slice(startIndex, startIndex + filters.limit);
    }, [filteredProducts, filters.page, filters.limit]);

    const updateFilter = (name, value) => {
        setFilters(prev => ({ 
        ...prev, 
        [name]: value,
        // Resetear a página 1 cuando cambian los filtros
        ...(name !== 'page' && { page: 1 }) 
        }));
    };

    const value = {
        products: paginatedProducts,
        categories,
        loading,
        error,
        filters,
        updateFilter,
        totalPages,
        totalProducts,
        favorites,
        toggleFavorite
    };

    return (
        <ProductsContext.Provider value={value}>
        {children}
        </ProductsContext.Provider>
    );
    };

    export const useProducts = () => useContext(ProductsContext);