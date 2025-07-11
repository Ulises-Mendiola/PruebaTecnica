
# 🛍️ La Tienda de Don Ramón - Evaluación Técnica TecnoCom

## 📌 Descripción general del proyecto

**E-Commerce de Evaluación Técnica** para validar las competencias del candidato **Ing. Héctor Ulises Mendiola Morales** como parte de su proceso de incorporación al equipo de desarrollo en **TecnoCom**.

### 🎯 Objetivo Principal

Construir una tienda virtual dinámica y tematizada, que consuma una API pública y valide las habilidades en desarrollo Frontend con React.

### ⚙️ Funcionalidades Clave

1. **Catálogo Dinámico de Productos**
   - Consumo de API pública (Fake Store API).
   - Filtros por categoría y ordenamiento (A-Z, Z-A, precio ascendente/descendente).
   - Búsqueda predictiva por nombre de producto.

2. **Experiencia de Usuario Mejorada**
   - Modo Claro/Oscuro.
   - Acceso protegido a la sección de productos mediante autenticación.

3. **Diseño Temático Personalizado**
   - Inspirado en **Don Ramón** (*El Chavo del 8*).
   - Paleta de colores vintage.
   - Tipografía y recursos visuales nostálgicos.

---

## 🔐 Implementación del Login

El componente `Login` utiliza validación de formularios con `react-hook-form` y `yup`, autenticación mediante Context API y navegación con `react-router-dom`.

### 🧩 Dependencias Utilizadas

| Dependencia | Descripción |
|-------------|-------------|
| `react-hook-form` | Manejo eficiente de formularios |
| `yup` | Validación declarativa |
| `react-router-dom` | Enrutamiento |
| `AuthContext` | Gestión de autenticación |

### 📋 Validación del formulario

```js
const schema = yup.object({
  username: yup.string().required('Usuario es requerido'),
  password: yup.string().required('Contraseña es requerida'),
});
````

### 🔄 Flujo de autenticación

```jsx
useEffect(() => {
  if (user && authChecked) {
    navigate('/productos');
  }
}, [user, authChecked]);
```

El formulario valida los datos, llama a `login()`, y si la autenticación es correcta, redirige al catálogo de productos.

### 💻 Interfaz del formulario

* Campos: usuario y contraseña.
* Mensajes de error.
* Estado de carga (`isSubmitting`).
* Imagen nostálgica si las credenciales fallan.

---

## 🧪 Pruebas Unitarias

Las pruebas se implementaron con **Jest** y **React Testing Library**.

### 📂 Archivos de prueba

```
src/components/__tests__/Login.test.jsx
src/components/__tests__/ProtectedPage.test.jsx
```

### ✅ Resultados

#### `Login.test.jsx`

* 4 pruebas exitosas:

  * Render de campos.
  * Validación de campos vacíos.
  * Simulación de login fallido.
  * Redirección en login exitoso.
* Cobertura: **87.5%**

#### `ProtectedPage.test.jsx`

* 1 prueba exitosa.
* 1 prueba fallida:

  * El mensaje de error `"¡Se me cayó el pelo!"` no se muestra correctamente.
* Posible causa: falta de `mockRejectedValue` y/o manejo condicional del error.

### 📊 Resumen de cobertura

| Componente      | % Líneas | % Funciones | Líneas No Cubiertas         |
| --------------- | -------- | ----------- | --------------------------- |
| `ProtectedPage` | 47.36%   | 25%         | 28-29, 33, 52-64, 79-101... |
| `Login`         | 87.5%    | 100%        | 33, 47                      |

### 📍 Recomendaciones

* Agregar manejo de errores en `ProtectedPage.jsx`.
* Usar `mockRejectedValue` para simular errores en pruebas.
* Cubrir casos no evaluados (favoritos, filtros, credenciales incorrectas).

---

## 🧪 Ejecución de pruebas

### Comando general

```bash
npx jest
```

### Ejecutar prueba específica

```bash
npx jest src/components/__tests__/Login.test.jsx
```

### Reporte de cobertura

```bash
npx jest --coverage
```

---

## 🌐 Integración con la API Fake Store

Se integró la API pública `https://fakestoreapi.com/products` para consumir productos en tiempo real, usando `fetch()` o `axios` desde el contexto de productos.

Los datos se transforman y almacenan en estado para facilitar la renderización dinámica y el uso de filtros/ordenamiento.

---

## 🔑 Acceso al sistema

### Credenciales predeterminadas

* **Usuario:** `Ulises`
* **Contraseña:** `TecnoCom`

Estas credenciales están hardcodeadas para fines demostrativos y autenticación simulada.

Una vez autenticado, el usuario es redirigido automáticamente a `/productos`, y su sesión se mantiene activa con `localStorage`.

---

## 🧰 Tecnologías utilizadas

* React + Vite
* React Router DOM
* Context API
* Fake Store API
* React Hook Form + Yup
* Jest + React Testing Library

---

## 🚀 Cómo levantar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
```

2. Instala dependencias:

```bash
npm install
```

3. Inicia el proyecto:

```bash
npm run dev
```

4. Abre en el navegador:

```
http://localhost:5173/
```

---


**Desarrollado por:**
**Ing. Héctor Ulises Mendiola Morales**

```
