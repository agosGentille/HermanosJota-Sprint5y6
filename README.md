# E-commerce Mueblería Hermanos Jota

---

## Grupo 11 - Code Breakers

- **Fabrizio, Jazmin Maia** 
- **Gentille, Agostina Abril** 
- **Giménez, Agustín José** 
- **Insaurralde, Mariano Gastón** 
- **Vila, Juan Manuel** 

---

## Descripción del Proyecto

Este proyecto forma parte de los **Sprints 5 y 6 del curso** y representa la integración completa de un sistema full stack MERN (MongoDB, Express, React, Node.js) para la gestión de productos de una mueblería.
El sistema permite **crear, visualizar, editar y eliminar** items tales como **productos, categorías y usuarios**, todo conectado a una base de datos en la nube.

---

## Tecnologías Utilizadas

### Frontend
- **React** → Arquitectura de componentes, hooks (`useState`, `useEffect`), props y manejo de estado.
- **CSS3 (Flexbox + Responsive)** → Estilos responsivos y maquetación moderna.
- **React Router** → Navegación entre páginas y rutas dinámicas.
- **Fetch API** → Comunicación con el backend.

### Backend
- **Node.js** → Servidor y entorno de ejecución.
- **Express.js** → Creación de la API REST, rutas modulares y middlewares.
- **Middlewares Personalizados** → Logging de peticiones y manejo de errores.
- **Mongoose y MongoDB Atlas** → Modelado de datos y persistencia en la base de datos en la nube.

### Despliegue
- **Frontend**: Vercel
- **Backend**: Render
- **Base de datos**: MongoDB Atlas

### Control de Versiones
- **Git & GitHub** → Repositorio único tipo monorepo con carpetas `/client` y `/backend`.

---

## Estructura del Proyecto
```
/client     → Aplicación React (Frontend)
/backend    → API Express (Backend)
.env        → Variables de entorno (no se sube al repo)
```
Flujo general del sistema
```
React Client ⇄ Express API ⇄ MongoDB Atlas
```
---

## Enlaces 

### Render para el Backend
```
https://hermanosjota-sprint5y6.onrender.com/api
```
### Vercel para el Frontend
```
https://hermanosjotasprint5y6.vercel.app/
```
---

## Cómo configurar las variables de entorno (para despliegue local)

1. Clonar Respositorio.
2. Instalar Dependencias. Desde la terminal:
   1.cd backend
   2.npm install
   3. ../client
   4. npm install
4. Configurar las variables de entorno:
   - en /backend/.env: MONGO_URI=mongodb+srv://hermanosjota:hermanosjota@cluster0.xsxpb32.mongodb.net/catalogo?retryWrites=true&w=majority
JWT_SECRET=secreto123
   - en /client/.env: REACT_APP_API_URL=https://hermanosjota-sprint5y6.onrender.com/api REACT_APP_RECAPTCHA_SITE_KEY=6Lc9o90rAAAAADh0SuIy0-tPHxQkKkqA7HRTzUqh
5. Ejecutar los servidores.
   - backend: 1. cd backend 2. npm run dev
   - frontend: 1. cd client 2. npm start
