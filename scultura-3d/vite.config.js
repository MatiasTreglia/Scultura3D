// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Nombre de tu repositorio en GitHub
const repoName = 'Scultura3D'; 

export default defineConfig({
  // CLAVE: Define la ruta base para producción (GitHub Pages)
  base: `/${repoName}/`, 
  plugins: [react()],
})