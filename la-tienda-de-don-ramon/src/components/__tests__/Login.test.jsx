    // src/components/__tests__/Login.test.jsx
    import React from 'react';
    import { render, screen, fireEvent, waitFor } from '@testing-library/react';
    import { MemoryRouter } from 'react-router-dom';
    import Login from '../Login';

    // Mock de useAuth y useNavigate
    jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({
        user: null,
        authChecked: true,
        login: jest.fn((username, password) => {
        if (username === 'donramon' && password === '1234') return true;
        return false;
        }),
    }),
    }));

    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
    }));

    describe('Login component', () => {
    it('renderiza campos de login correctamente', () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it('muestra errores si los campos están vacíos', async () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
        expect(screen.getByText(/usuario es requerido/i)).toBeInTheDocument();
        expect(screen.getByText(/contraseña es requerida/i)).toBeInTheDocument();
        });
    });

    it('muestra error si el login falla', async () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        fireEvent.input(screen.getByLabelText(/usuario/i), {
        target: { value: 'wronguser' },
        });

        fireEvent.input(screen.getByLabelText(/contraseña/i), {
        target: { value: 'wrongpass' },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
        expect(screen.getByText(/¡Credenciales incorrectas, chavo!/i)).toBeInTheDocument();
        });
    });

    it('redirecciona al login exitoso', async () => {
        render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
        );

        fireEvent.input(screen.getByLabelText(/usuario/i), {
        target: { value: 'donramon' },
        });

        fireEvent.input(screen.getByLabelText(/contraseña/i), {
        target: { value: '1234' },
        });

        fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/productos');
        });
    });
    });
