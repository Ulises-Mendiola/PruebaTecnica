    // src/components/__tests__/ProtectedPage.test.jsx
    import React from 'react';
    import { render, screen, fireEvent } from '@testing-library/react';
    import { MemoryRouter } from 'react-router-dom';
    import ProtectedPage from '../ProtectedPage';

    // Puro cotorreo: mocks pa' simular la vecindad
    jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
        user: { name: 'Don Ramón' },
        logout: jest.fn(),
    }),
    }));

    jest.mock('../../context/ProductsContext', () => ({
    useProducts: () => ({
        products: [
        { id: 1, name: 'Gorra del Chavo', price: 100 },
        { id: 2, name: 'Chanfle 2', price: 200 },
        ],
        categories: ['Ropa', 'Películas'],
        loading: false,
        error: null,
        filters: {
        category: '',
        sort: '',
        search: '',
        page: 1,
        },
        totalPages: 1,
        totalProducts: 2,
        favorites: [],
        updateFilter: jest.fn(),
        toggleFavorite: jest.fn(),
    }),
    }));

    jest.mock('../ProductCard', () => (props) => (
    <div data-testid="product-card">{props.product.name}</div>
    ));

    describe('ProtectedPage (Página Protegida de la Vecindad)', () => {
    test('renderiza productos correctamente cuando no hay favoritos', () => {
        render(
        <MemoryRouter>
            <ProtectedPage />
        </MemoryRouter>
        );

        // Verificamos que los productos se vean en pantalla
        expect(screen.getByText(/Bienvenido, Don Ramón/i)).toBeInTheDocument();
        expect(screen.getByText('¿Qué vas a comprar hoy en la vecindad?')).toBeInTheDocument();
        expect(screen.getAllByTestId('product-card')).toHaveLength(2);
        expect(screen.getByText('Gorra del Chavo')).toBeInTheDocument();
        expect(screen.getByText('Chanfle 2')).toBeInTheDocument();
    });

    test('muestra mensaje de error si falla la consulta', () => {
        // Simulamos error
        jest.mock('../../context/ProductsContext', () => ({
        useProducts: () => ({
            products: [],
            categories: [],
            loading: false,
            error: 'Error al cargar los productos',
            filters: {
            category: '',
            sort: '',
            search: '',
            page: 1,
            },
            totalPages: 1,
            totalProducts: 0,
            favorites: [],
            updateFilter: jest.fn(),
            toggleFavorite: jest.fn(),
        }),
        }));

        const ErrorComponent = require('../ProtectedPage').default;

        render(
        <MemoryRouter>
            <ErrorComponent />
        </MemoryRouter>
        );

        expect(screen.getByText(/¡Se me cayó el pelo!/i)).toBeInTheDocument();
        expect(screen.getByText('Error al cargar los productos')).toBeInTheDocument();
    });
    });
