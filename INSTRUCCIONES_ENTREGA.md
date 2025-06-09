# Instrucciones para la Entrega - PEC 3

## 📦 Qué Entregar

### 1. Carpeta del Proyecto
Debes entregar la carpeta completa del proyecto que incluya:

#### ✅ Archivos OBLIGATORIOS a incluir:
```
segunda-economia-circular/
├── src/                          # Código fuente
│   ├── assets/
│   ├── views/
│   ├── index.html
│   ├── ponentes.html
│   ├── articulo.html
│   └── eventos.html
├── dist/                         # Compilado para producción
│   ├── *.html
│   ├── *.css
│   ├── *.js
│   └── assets/
├── package.json                  # Configuración del proyecto
├── package-lock.json            # Dependencias exactas
├── tailwind.config.js           # Configuración Tailwind
├── .postcssrc.json              # Configuración PostCSS
├── .posthtmlrc                  # Configuración PostHTML
├── .gitignore                   # Archivos a ignorar
├── .editorconfig               # Configuración del editor
├── DOCUMENTACION.md            # Documentación técnica
├── README.md                   # Información del proyecto
└── RESUMEN_PEC3.md            # Resumen ejecutivo
```

#### ❌ Archivos que NO debes incluir:
```
❌ node_modules/                 # Carpeta de dependencias
❌ .parcel-cache/               # Cache de Parcel
❌ .cache/                      # Cache general
❌ .cache-loader/               # Cache del loader
```

### 2. Documentación
Entregar en formato PDF:
- `DOCUMENTACION.md` convertido a PDF
- Incluir todas las secciones y análisis requeridos

## 🗜️ Formato de Entrega

### Archivo Comprimido
- **Formato:** `.zip` o `.rar`
- **Nombre:** `[TuNombre]_PEC3_EconomiaCircular_Tailwind.zip`
- **Contenido:** Carpeta del proyecto + documentación PDF

### Ejemplo de estructura del ZIP:
```
[TuNombre]_PEC3_EconomiaCircular_Tailwind.zip
├── segunda-economia-circular/    # Carpeta del proyecto
│   ├── src/
│   ├── dist/
│   ├── package.json
│   └── ...
└── DOCUMENTACION_PEC3.pdf       # Documentación en PDF
```

## ✅ Checklist Pre-Entrega

### Desarrollo (60%)
- [ ] ✅ Proyecto basado en UOC Boilerplate
- [ ] ✅ Tailwind CSS v4 instalado y configurado
- [ ] ✅ Mínimo 2 clases extraídas con @apply (tienes 6)
- [ ] ✅ Mínimo 2 componentes con posthtml-include (tienes 4)
- [ ] ✅ Página generada por IA basada en Figma
- [ ] ✅ Código compilado para producción (`npm run build`)
- [ ] 🔄 Repositorio GitHub creado y publicado
- [ ] 🔄 Deployment en Netlify realizado

### Documentación (40%)
- [ ] ✅ Proceso de desarrollo documentado
- [ ] ✅ Decisiones técnicas justificadas
- [ ] ✅ Preguntas sobre utility-first CSS respondidas
- [ ] ✅ Análisis del código generado por IA
- [ ] 🔄 URLs del repositorio y deployment incluidas
- [ ] 🔄 URL de la PEC anterior incluida

### Archivos Técnicos
- [ ] ✅ Carpeta `dist/` presente y compilada
- [ ] ✅ Carpeta `src/` con código fuente
- [ ] ✅ `package.json` y configuraciones presentes
- [ ] ❌ Carpeta `node_modules/` NO incluida
- [ ] ✅ Archivos de configuración incluidos (`.postcssrc.json`, etc.)

## 🚀 Pasos Finales Antes de Entregar

### 1. Crear Repositorio GitHub
```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "PEC 3: Jornadas Economía Circular con Tailwind CSS"
git branch -M main
git remote add origin [URL_DE_TU_REPOSITORIO]
git push -u origin main
```

### 2. Deployment en Netlify
1. Conectar repositorio GitHub con Netlify
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`
4. Realizar deployment

### 3. Actualizar URLs en Documentación
Editar `DOCUMENTACION.md` y añadir:
```markdown
## URLs del Proyecto Final

- **🌐 Deployment Netlify:** https://tu-proyecto.netlify.app
- **📁 Repositorio GitHub:** https://github.com/tu-usuario/tu-repositorio
- **🔗 PEC Anterior:** https://tu-pec-anterior.netlify.app
```

### 4. Convertir Documentación a PDF
- Abrir `DOCUMENTACION.md` en un editor que soporte Markdown
- Exportar o imprimir como PDF
- Verificar que todas las imágenes y formato se mantengan

### 5. Verificación Final
```bash
# Verificar que la compilación funciona
npm run build

# Verificar que no hay node_modules en el ZIP
# Comprimir solo los archivos necesarios
```

### 6. Crear ZIP de Entrega
- Comprimir la carpeta del proyecto (sin node_modules)
- Incluir la documentación en PDF
- Verificar el tamaño del archivo (debe ser < 50MB sin node_modules)

## 📋 Criterios de Evaluación

| Criterio | Peso | Verificación |
|----------|------|--------------|
| Uso correcto UOC Boilerplate | 5% | ✅ Estructura mantenida |
| Configuración Tailwind | 15% | ✅ Personalización completa |
| Extracción clases/componentes | 10% | ✅ 6 clases + 4 componentes |
| Aplicación utility-first CSS | 15% | ✅ HTML con utilidades |
| Página generada por IA | 10% | ✅ eventos.html analizada |
| Repositorio y deployment | 5% | 🔄 Pendiente crear |
| Documentación proceso | 10% | ✅ Completa |
| Justificación decisiones | 10% | ✅ Todas justificadas |
| Preguntas utility-first CSS | 10% | ✅ Respondidas |
| Análisis código IA | 10% | ✅ Análisis detallado |

## ⚠️ Errores Comunes a Evitar

1. **Incluir node_modules** - La entrega será rechazada
2. **No compilar para producción** - Falta carpeta dist/
3. **URLs no actualizadas** - Documentación incompleta
4. **Formato incorrecto** - No usar .doc o .pages
5. **Entrega por canal incorrecto** - Solo por Registro de EC

## 📞 Contacto

Para dudas sobre la entrega, consultar a través del campus virtual de la UOC.

---

**¡Tu PEC 3 está lista para entregar! 🎉**

*Solo faltan los pasos finales de GitHub, Netlify y compresión del archivo.*