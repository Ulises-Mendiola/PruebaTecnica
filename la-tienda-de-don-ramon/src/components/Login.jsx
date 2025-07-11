    // src/components/Login.jsx
    import React, { useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    import * as yup from 'yup';
    import Ramon2 from '../assets/Ramon2.png';
    import LoadingSpinner from './LoadingSpinner';
    import './Login.css'; // Importación corregida

    const schema = yup.object({
    username: yup.string().required('Usuario es requerido'),
    password: yup.string().required('Contraseña es requerida'),
    }).required();

    function Login() {
    const { user, authChecked, login } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = React.useState(false);
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Redirigir si ya está autenticado
    useEffect(() => {
        if (user && authChecked) {
        navigate('/productos');
        }
    }, [user, authChecked, navigate]);

    const onSubmit = async (data) => {
        const success = login(data.username, data.password);
        if (success) {
        navigate('/productos');
        } else {
        setLoginError(true);
        }
    };

    if (!authChecked || user) {
        return <LoadingSpinner />;
    }

    return (
        <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <h1>Bienvenido a <span className="highlight">La Tienda de Don Ramón</span></h1>
            
            <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input 
                id="username" 
                type="text" 
                {...register('username')} 
                className={errors.username ? 'error' : ''}
                disabled={isSubmitting}
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
            </div>
            
            <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
                id="password" 
                type="password" 
                {...register('password')} 
                className={errors.password ? 'error' : ''}
                disabled={isSubmitting}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            
            <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
            >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
            
            {loginError && (
            <div className="error-message">
                <img src={Ramon2} alt="Don Ramón enojado" className="error-image" />
                <p>¡Credenciales incorrectas, chavo! Intenta de nuevo"</p>
            </div>
            )}

        </form>
        </div>
    );
    }

    export default Login;