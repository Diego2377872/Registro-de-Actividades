# Registro de Actividades

Una aplicación web moderna y minimalista para registrar actividades con soporte para almacenamiento de datos directamente en un repositorio de GitHub mediante funciones de Netlify.

## 🧾 Funcionalidades

- Formulario con campos:
  - Fecha
  - Actividad
  - Lugar o institución
  - Permiso entregado (Sí/No)
  - Pedido de viático (Sí/No)
- Visualización automática de los registros en una tabla
- Guardado de datos en un archivo `data.json` en tu repositorio GitHub
- Estilo limpio y moderno con íconos y colores agradables

## 🚀 Deploy en Netlify

1. Sube los archivos a tu cuenta de GitHub en un repositorio público.
2. Conéctalo a Netlify y activa las funciones (Netlify Functions).
3. Configura una variable de entorno en Netlify:

   - **Nombre:** `GITHUB_TOKEN`
   - **Valor:** tu [token personal de GitHub](https://github.com/settings/tokens)

## 🛠 Configuración requerida

Edita el archivo `netlify/functions/saveData.js` y reemplaza:

```js
const owner = 'TU_USUARIO_GITHUB';
```

por tu nombre de usuario de GitHub.

## 📂 Estructura

```
registro_actividades_netlify/
│
├── index.html              # Página principal
├── style.css               # Estilos modernos
├── script.js               # Lógica de frontend
└── netlify/
    └── functions/
        └── saveData.js     # Función serverless para guardar en GitHub
```

## 📌 Requisitos

- Cuenta de GitHub
- Cuenta de Netlify
- Activar funciones (Netlify Functions)

---

Desarrollado para facilitar el seguimiento de actividades de forma colaborativa y segura.
