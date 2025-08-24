# GitHub Users

Aplicación web desarrollada con Angular 17 y Tailwind CSS que permite buscar usuarios de GitHub, visualizar información de sus perfiles y mostrar un gráfico de los seguidores de los 10 primeros resultados.

## 📝 Descripción

Esta aplicación consume la API pública de GitHub para:

- Buscar usuarios mediante un campo de texto con validación.
- Listar los primeros 10 resultados con información básica: avatar, login e ID.
- Navegar a un perfil de usuario mediante rutas dinámicas.
- Mostrar un gráfico de barras con el número de seguidores de los usuarios mostrados.
- Manejar errores y mostrar mensajes de validación en toda la aplicación.

Se implementó Tailwind CSS para un diseño limpio y moderno y Chart.js para los gráficos.

## ⚙️ Tecnologías

- Angular 17
- Tailwind CSS
- Chart.js
- Font Awesome (iconos)
- TypeScript
- Signals de Angular 17

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/luisgomezadev/search-github-users.git
cd github-users
```

2. Instala las dependencias:

```bash
npm install
```

3. Levanta el proyecto:

```bash
ng serve
```
