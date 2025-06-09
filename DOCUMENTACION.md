# Documentación PEC 3 - Jornadas de Economía Circular con Tailwind CSS

## Información del Proyecto

**Estudiante:** [João Martinho]  
**Asignatura:** Herramientas HTML y CSS II  
**Universidad:** Universitat Oberta de Catalunya (UOC)  
**Fecha:** Junio 2025

## URLs del Proyecto

- **Repositorio GitHub:** https://github.com/jomartinho/segunda-jornada.git
- **Deployment Netlify:** [Pendiente de crear]
- **PEC Anterior:** https://github.com/jomartinho/Jornadas.git

## Descripción del Proyecto

Este proyecto recrea páginas web utilizando el paradigma de Atomic CSS con la librería de utilidades Tailwind CSS v3. Se han desarrollado cuatro páginas principales:

1. **Página de Inicio** (`index.html`) - Landing page con hero section y navegación
2. **Página de Ponentes** (`ponentes.html`) - Grid de tarjetas con información de speakers
3. **Página de Artículo** (`articulo.html`) - Artículo con tipografía y layout optimizados
4. **Página de Eventos** (`eventos.html`) - Página generada con IA basada en diseño conceptual

## Proceso de Desarrollo

### 1. Configuración Inicial

#### Descarga y Configuración del Boilerplate

El proyecto se inició utilizando el UOC Boilerplate oficial. Esta decisión se tomó porque incluye configuración preestablecida de Parcel como bundler, tiene integración nativa con posthtml-include para componentes, y proporciona estructura de carpetas optimizada para desarrollo académico. La alternativa habría sido crear un proyecto desde cero con Vite o configurar Webpack manualmente, pero esto habría añadido complejidad innecesaria al setup inicial.

```bash
git clone https://github.com/uoc-advanced-html-css/uoc-boilerplate.git
cd uoc-boilerplate
npm install
```

#### Configuración de Tailwind CSS v3

La configuración de Tailwind se realizó mediante personalización del archivo `tailwind.config.js`. Se optó por esta aproximación en lugar de usar CDN porque permite personalización completa de colores, fuentes y configuraciones específicas del proyecto. El CDN habría sido más simple pero menos personalizable.

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/views/**/*.html",
    "./src/assets/styles/**/*.scss"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000078',
        'secondary': '#73edff',
        'background': '#e2faff',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto'],
        'serif': ['Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  safelist: [
    "bg-blue-900",
    "text-white",
    "hover:bg-blue-800",
    "transition",
    "text-3xl",
    "font-bold",
    "mb-4"
  ],
  plugins: [],
};
```

Los colores personalizados se definieron para mantener consistencia con la identidad visual del proyecto y permitir referencia semántica (`text-primary` vs `text-blue-800`). La safelist incluye clases que podrían no ser detectadas automáticamente por el sistema de purging, especialmente aquellas generadas dinámicamente.

### 2. Estructura del Proyecto

```
src/
├── assets/
│   ├── styles/
│   │   ├── main.scss
│   │   ├── _variables.scss
│   │   ├── _utilities.scss
│   │   ├── _functions.scss
│   │   ├── _mixins.scss
│   │   └── layouts/
│   │       └── _home.scss
│   ├── images/
│   └── scripts/
├── views/
│   ├── components/
│   │   ├── contact-button.html
│   │   ├── info-card.html
│   │   ├── hero-section.html
│   │   └── speaker-card.html
│   ├── header.html
│   └── footer.html
├── index.html
├── ponentes.html
├── articulo.html
└── eventos.html
```

Esta organización se eligió sobre alternativas como estructura plana o agrupación por páginas porque permite separación clara de responsabilidades, escalabilidad para agregar nuevas páginas, y reutilización de componentes entre diferentes secciones del sitio.

### 3. Integración SCSS con Tailwind

Se implementó un sistema híbrido que combina Tailwind CSS con SCSS personalizado. Esta aproximación se eligió sobre usar únicamente Tailwind porque permite aprovechar funciones avanzadas de SCSS como variables, mixins y funciones personalizadas, mientras se mantienen las ventajas del utility-first CSS.

El orden de importación en main.scss es crítico:

```scss
// 1. Variables SCSS (deben ir primero)
@import "variables";
@import "functions";
@import "mixins";

// 2. Directivas de Tailwind
@tailwind base;
@tailwind components;
@tailwind utilities;

// 3. Utilidades personalizadas (después de Tailwind)
@import "utilities";

// 4. Layouts específicos
@import "layouts/home";
```

Las variables SCSS deben estar disponibles antes de que Tailwind procese los estilos, y las utilidades personalizadas van al final para garantizar que sobrescriban Tailwind si es necesario.

### 4. Sistema de Variables y Funciones SCSS

Se desarrolló un sistema completo de variables y funciones SCSS para complementar Tailwind. Esta decisión se tomó porque aunque Tailwind proporciona un excelente sistema de utilidades, hay casos donde las funciones SCSS ofrecen mayor flexibilidad y control.

#### Variables Implementadas

```scss
// Colores corporativos
$uoc-corporate: #000078;
$uoc-masterbrand: #73edff;
$green-primary: #10b981;

// Tipografía
$font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
$font-family-serif: Georgia, "Times New Roman", serif;

// Espaciado modular (base 8px)
$spacing-xs: 0.5rem;
$spacing-sm: 0.75rem;
$spacing-md: 1rem;
$spacing-lg: 1.5rem;
$spacing-xl: 2rem;

// Breakpoints responsive
$mqTablet: 768px;
$mqDesktop: 1024px;
$mqLarge: 1280px;
```

#### Funciones Personalizadas Desarrolladas

```scss
// Conversión px a rem con base configurable
@function rem($pixels, $base: 16px) {
  @return ($pixels / $base) * 1rem;
}

// Tipografía fluida responsive
@function fluid-font-size($min-size, $max-size, $min-vw: 320px, $max-vw: 1200px) {
  @return calc(#{$min-size} + #{strip-unit($max-size - $min-size)} * ((100vw - #{$min-vw}) / #{strip-unit($max-vw - $min-vw)}));
}

// Manipulación de colores
@function lighten-color($color, $percentage) {
  @return mix(white, $color, $percentage);
}

@function darken-color($color, $percentage) {
  @return mix(black, $color, $percentage);
}

// Espaciado modular
@function spacing($multiplier) {
  @return $spacing-md * $multiplier;
}
```

La función `rem()` convierte píxeles a rem manteniendo accesibilidad, algo que Tailwind no hace automáticamente. `fluid-font-size()` crea tipografía que escala suavemente entre breakpoints, más sofisticado que las clases responsive de Tailwind. Las funciones de manipulación de colores permiten variaciones calculadas, útil para estados hover sin definir cada variación manualmente.

### 5. Mixins Reutilizables

Se crearon mixins para patrones comunes que requerían lógica compleja:

```scss
// Breakpoints responsive
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'tablet' {
    @media (min-width: #{$mqTablet}) {
      @content;
    }
  }
  @if $breakpoint == 'desktop' {
    @media (min-width: #{$mqDesktop}) {
      @content;
    }
  }
}

// Estilos de botones con estados
@mixin button-style($bg-color, $text-color, $hover-bg) {
  background-color: $bg-color;
  color: $text-color;
  padding: $spacing-sm $spacing-lg;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: $hover-bg;
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: 2px solid $bg-color;
    outline-offset: 2px;
  }
}

// Grid layouts responsive
@mixin grid-layout($columns: 1, $gap: $spacing-md, $tablet-columns: null, $desktop-columns: null) {
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  gap: $gap;
  
  @if $tablet-columns {
    @include respond-to('tablet') {
      grid-template-columns: repeat($tablet-columns, 1fr);
    }
  }
  
  @if $desktop-columns {
    @include respond-to('desktop') {
      grid-template-columns: repeat($desktop-columns, 1fr);
    }
  }
}
```

El mixin `respond-to()` centraliza la lógica de breakpoints, más mantenible que repetir media queries. `button-style()` encapsula estados complejos de botones que requerirían múltiples clases de Tailwind. `grid-layout()` simplifica la creación de grids responsive con lógica condicional.

## Decisiones de Desarrollo Específicas

### 1. Enfoque Mobile-First

Se implementó un enfoque mobile-first estricto en todo el desarrollo. Esta decisión se basó en estadísticas actuales de uso donde la mayoría de usuarios acceden desde dispositivos móviles, además de que este enfoque mejora el rendimiento en dispositivos con recursos limitados.

```scss
// Base: móvil (sin media query)
.component {
  font-size: rem(16px);
  padding: $spacing-sm;
  display: block;
}

// Tablet y superior
@include respond-to('tablet') {
  .component {
    font-size: rem(18px);
    padding: $spacing-md;
    display: flex;
  }
}

// Desktop y superior
@include respond-to('desktop') {
  .component {
    font-size: rem(20px);
    padding: $spacing-lg;
  }
}
```

La alternativa habría sido un enfoque desktop-first o adaptive design, pero mobile-first permite progressive enhancement y es más eficiente para la mayoría de usuarios.

### 2. Sistema de Contenedores y Márgenes

Se implementó un sistema de contenedores personalizado para manejar los márgenes del sitio. El problema era que las páginas necesitaban márgenes consistentes pero el header y footer debían extenderse a ancho completo.

Se consideraron varias alternativas: márgenes en el body (problemático para header/footer), contenedores individuales en cada sección, o sistema de grid CSS. La solución implementada fue crear una clase `.page-container`:

```scss
.page-container {
  max-width: 1400px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  
  @media (min-width: 768px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  
  @media (min-width: 1200px) {
    padding-left: 4rem;
    padding-right: 4rem;
  }
}
```

La estructura HTML resultante permite que header/footer sean full-width mientras el contenido tiene márgenes consistentes:

```html
<body>
  <header><!-- Ancho completo --></header>
  
  <div class="page-container">
    <main><!-- Contenido con márgenes --></main>
  </div>
  
  <footer><!-- Ancho completo --></footer>
</body>
```

Esta solución proporciona flexibilidad, consistencia, responsive design apropiado y facilita el mantenimiento desde un punto central.

## Clases Extraídas con @apply y CSS Estándar

### 1. Sistema de Botones

```scss
.btn-primary {
  background-color: $uoc-corporate;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: darken-color($uoc-corporate, 10%);
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 2px solid $uoc-corporate;
    outline-offset: 2px;
  }
  
  &:active {
    transform: translateY(0);
  }
}
```

Los botones se extrajeron porque aparecen en múltiples páginas, requieren estados complejos (hover, focus, active), y necesitan consistencia visual. La alternativa habría sido repetir múltiples clases de Tailwind en cada botón.

### 2. Títulos de Sección

```scss
.section-title {
  font-size: fluid-font-size(rem(24px), rem(36px));
  font-weight: 700;
  margin-bottom: spacing(1);
  color: $uoc-corporate;
  font-family: $font-family-serif;
  
  @include respond-to('tablet') {
    margin-bottom: spacing(1.5);
  }
}
```

Esta clase se extrajo porque todos los títulos de sección necesitan el mismo estilo, utiliza tipografía fluida que escala suavemente entre dispositivos, y emplea funciones SCSS no disponibles directamente en Tailwind.

### 3. Contenido de Artículos

```scss
.article-content {
  @include container(rem(768px), $spacing-lg);
  line-height: 1.75;
  
  h1 {
    font-size: fluid-font-size(rem(28px), rem(40px));
    font-weight: 700;
    color: $uoc-corporate;
    margin-bottom: spacing(0.5);
    font-family: $font-family-serif;
  }
  
  h2 {
    font-size: fluid-font-size(rem(22px), rem(28px));
    font-weight: 600;
    color: $uoc-corporate;
    margin-top: spacing(2);
    margin-bottom: spacing(1);
    font-family: $font-family-serif;
  }
  
  p {
    margin-bottom: spacing(1);
    color: lighten-color($uoc-corporate, 40%);
    
    strong {
      color: $uoc-corporate;
      font-weight: 600;
    }
  }
  
  blockquote {
    border-left: 4px solid $uoc-corporate;
    padding-left: spacing(1);
    font-style: italic;
    color: lighten-color($uoc-corporate, 20%);
    margin: spacing(1.5) 0;
    background-color: alpha-color($uoc-masterbrand, 0.1);
    padding: spacing(1);
    border-radius: $radius-sm;
  }
}
```

El contenido de artículos requiere tipografía compleja con múltiples elementos relacionados, jerarquía visual clara, y optimización para lectura de contenido largo. Centralizar estos estilos facilita el mantenimiento.

## Componentes Extraídos con posthtml-include

### 1. Header Responsive

```html
<header class="bg-white shadow-md sticky top-0 z-50">
  <div class="max-w-screen-lg mx-auto flex items-center justify-between px-4 md:px-8 lg:px-16 py-4">
    <div class="flex items-center">
      <img src="./assets/images/logo.png" alt="UOC Logo" class="header-logo h-6 w-auto" />
    </div>
    
    <div class="flex-1 text-center mx-8">
      <h1 class="text-lg font-semibold text-primary hidden md:block">
        Jornadas de Economía Circular
      </h1>
      <h1 class="text-base font-semibold text-primary md:hidden">
        Economía Circular
      </h1>
    </div>

    <nav class="desktop-nav">
      <ul class="nav-list">
        <li><a href="./index.html" class="nav-link">Inicio</a></li>
        <li><a href="./ponentes.html" class="nav-link">Ponentes</a></li>
        <li><a href="./articulo.html" class="nav-link">Artículo</a></li>
        <li><a href="./eventos.html" class="nav-link">Eventos</a></li>
      </ul>
    </nav>

    <button id="mobile-menu-button" class="mobile-menu-btn">☰</button>
  </div>
</header>
```

El header se extrajo porque aparece en todas las páginas, tiene lógica responsive compleja (título adaptativo, navegación condicional), y requiere posicionamiento sticky. Se implementaron márgenes progresivos (px-4, md:px-8, lg:px-16) para proporcionar mejor experiencia visual en cada dispositivo.

### 2. Componentes Adicionales

Se crearon componentes para `hero-section.html`, `info-card.html`, `contact-button.html` y `speaker-card.html`. Estos se extrajeron porque se reutilizan en múltiples páginas, tienen estructura HTML compleja, y facilitan el mantenimiento centralizado. La alternativa habría sido repetir el código en cada página, lo que dificultaría las actualizaciones.

### 3. Grid de Ponentes - Solución de Problemas

Durante el desarrollo se encontró un problema específico con el layout de la página de ponentes: los ponentes se mostraban en columna vertical en lugar de grid horizontal. El diagnóstico reveló un conflicto entre clases de Tailwind y CSS personalizado.

El código problemático era:

```scss
.speaker-card {
  max-width: 300px;
  margin: 0 auto;  // Esto interfería con CSS Grid
}
```

La solución implementada fue:

```scss
.speaker-card {
  width: 100%;  // Permite que el grid controle el ancho
}

.speakers-grid {
  @include grid-layout(1, $spacing-lg, 2, 3);
  // 1 columna móvil, 2 tablet, 3 desktop
}
```

Esta solución permite que CSS Grid maneje el layout completamente, se adapta automáticamente a diferentes pantallas, y centraliza el control del layout en una sola clase.

## Página Generada por IA

### Proceso de Generación

Se utilizó ChatGPT-4 para generar la página `eventos.html` basada en conceptos de diseño de conferencias y economía circular. El prompt específico fue: "Crea una página HTML para eventos de economía circular usando Tailwind CSS, incluye hero section con gradiente, grid de eventos, estadísticas y call-to-action final".

### Análisis del Código Generado

El código inicial mostró varias fortalezas: estructura HTML semánticamente correcta con uso apropiado de elementos HTML5, combinaciones lógicas de clases Tailwind, diseño responsive bien implementado con mobile-first approach, y jerarquía visual clara con contraste y espaciado apropiados.

Sin embargo, se identificaron errores críticos que requirieron corrección:

**Problemas de accesibilidad**: Falta de estados de focus visibles y aria-labels descriptivos. Se corrigieron añadiendo `focus:ring-*` para indicadores visuales y `aria-label` para contexto adicional.

**Gradientes sin fallback**: Dependencia única de gradientes CSS que podrían fallar en navegadores antiguos. Se solucionó añadiendo colores sólidos como fallback.

**Inconsistencias en contenedores**: Diferentes anchos máximos sin justificación. Se estableció consistencia usando el sistema de contenedores del sitio.

**Estados interactivos incompletos**: Falta de efectos hover y transiciones. Se añadieron para mejorar la experiencia de usuario.

### Comparación: Desarrollo Manual vs IA

El desarrollo con IA tomó aproximadamente 47 minutos (2 minutos generación + 15 minutos revisión + 30 minutos correcciones), mientras que el desarrollo manual habría tomado aproximadamente 180 minutos. Esto representa un ahorro del 74% en tiempo.

Sin embargo, la calidad inicial del código IA fue del 70-80%, requiriendo refinamiento significativo. El código manual habría sido 90-95% correcto desde el inicio, pero con mayor inversión de tiempo.

Las herramientas de IA son excelentes para acelerar el prototipado y proporcionar ideas de diseño, pero requieren revisión manual cuidadosa, conocimiento técnico para optimizar, y ajustes de accesibilidad. Son mejores como asistentes que como reemplazos del desarrollo humano.

## Conclusiones

El desarrollo con Tailwind CSS ha demostrado ser una metodología eficiente para la creación rápida de interfaces web modernas y responsive. La combinación con el UOC Boilerplate proporciona un entorno de desarrollo robusto que facilita tanto el prototipado como la producción final.

La extracción de componentes con posthtml-include y clases con CSS personalizado permite mantener un equilibrio entre la velocidad de desarrollo de utility-first CSS y la mantenibilidad del código.

## Respuestas a Preguntas Específicas de la PEC

### 1. ¿Qué diferencias hay entre el enfoque de tipo CSS semántico y el CSS de utilidades? ¿Cómo afectó esto a tu proceso de desarrollo? ¿Y a tu código?

#### CSS Semántico (PEC anterior)

En la PEC anterior utilizaba clases con nombres descriptivos como `.hero-section`, `.speaker-card`, `.navigation-menu`. Este enfoque mantenía separación clara entre estructura HTML y presentación CSS, con estilos agrupados por componentes y reutilización a través de clases semánticas.

El proceso de desarrollo seguía estos pasos: planificación de arquitectura CSS usando metodología BEM, creación de componentes base, desarrollo de páginas aplicando clases semánticas, y refinamiento de estilos.

#### CSS de Utilidades (Tailwind - PEC actual)

Con Tailwind uso clases atómicas con propósito específico como `.bg-blue-500`, `.text-center`, `.p-4`. Los estilos se aplican directamente en el HTML, componiendo diseños mediante combinación de utilidades, con reutilización a través de extracción de componentes.

El proceso cambió a: configuración de Tailwind y personalización, desarrollo directo en HTML con clases de utilidad, extracción de patrones comunes con CSS personalizado, y optimización final.

#### Impacto en el Proceso de Desarrollo

**Velocidad**: CSS semántico era más lento inicialmente porque requería planificación, mientras que Tailwind es más rápido una vez familiarizado con las clases.

**Curva de aprendizaje**: CSS semántico requería conocimiento de metodologías como BEM, mientras que Tailwind requiere memorizar clases de utilidad y configuración.

**Mantenimiento**: Con CSS semántico los cambios eran centralizados en archivos CSS, con Tailwind los cambios están distribuidos en el HTML pero son más predecibles.

#### Impacto en el Código

El HTML cambió significativamente:

```html
<!-- CSS Semántico -->
<button class="btn btn-primary">Registrarse</button>

<!-- Tailwind -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
  Registrarse
</button>
```

Tailwind acelera el desarrollo y reduce la cantidad de CSS personalizado, pero hace el HTML más verboso. Es especialmente útil para prototipado rápido y equipos familiarizados con la herramienta.

### 2. ¿Qué diferencias encontraste entre usar una librería de componentes y una librería de utilidades?

#### Librería de Componentes (Bootstrap - experiencia previa)

En proyectos anteriores con Bootstrap tenía componentes predefinidos listos para usar como navbar, cards y modals, con JavaScript incluido para interactividad. Esto permitía desarrollo rápido para prototipos con consistencia visual automática y documentación extensa.

Sin embargo, la personalización era limitada sin sobrescribir estilos, el tamaño del bundle era mayor con CSS y JS no utilizado, había dependencia de estructura HTML específica, y era difícil crear diseños únicos.

#### Librería de Utilidades (Tailwind - experiencia actual)

Con Tailwind tengo máxima flexibilidad de diseño, bundle optimizado con purging automático, sin JavaScript incluido (mayor control), personalización completa a través de configuración, y consistencia en espaciado, colores y tipografía con responsive design integrado.

Las desventajas incluyen curva de aprendizaje más pronunciada, HTML más verboso con muchas clases, sin componentes predefinidos (hay que crearlos), y dependencia de la documentación para recordar clases.

#### Experiencia Práctica

Con Bootstrap creaba una tarjeta así:

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <p class="card-text">Contenido</p>
    <a href="#" class="btn btn-primary">Acción</a>
  </div>
</div>
```

Con Tailwind la misma tarjeta requiere:

```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h5 class="text-xl font-semibold mb-2">Título</h5>
  <p class="text-gray-600 mb-4">Contenido</p>
  <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Acción
  </a>
</div>
```

Bootstrap es mejor para desarrollo rápido con diseños estándar, mientras que Tailwind es superior para diseños personalizados y control total sobre el CSS final.

### 3. ¿Qué clases y componentes decidiste extraer y por qué?

#### Clases Extraídas

**Botones (`.btn-primary`, `.btn-secondary`)**: Se extrajeron porque aparecen en múltiples páginas con el mismo estilo, requieren estados complejos (hover, focus, active), y evitan repetir múltiples clases de Tailwind en cada botón.

**Títulos de sección (`.section-title`)**: Todos los títulos de sección necesitan estilo consistente, utilizan tipografía fluida que escala entre dispositivos, y emplean funciones SCSS no disponibles en Tailwind.

**Enlaces de navegación (`.nav-link`)**: Los enlaces requieren estados hover y focus consistentes, y la extracción simplifica el HTML del header.

**Tarjetas de ponentes (`.speaker-card`)**: Tienen diseño complejo con efectos hover, y extraer evita repetir múltiples clases de Tailwind.

**Contenido de artículos (`.article-content`)**: Requiere tipografía específica y espaciado optimizado para lectura, mejorando la legibilidad del HTML.

#### Componentes Extraídos

**Hero section**: Se reutiliza en múltiples páginas con ligeras variaciones, facilitando mantenimiento y consistencia.

**Tarjetas informativas**: Aparecen en varias páginas, evitando duplicación de código.

**Botón de contacto**: Aparece en todas las páginas en la misma posición, garantizando consistencia.

**Header y footer**: Estructura compleja que se repite en todas las páginas.

Los criterios de extracción fueron: repetición en múltiples elementos, complejidad de la combinación de utilidades, necesidad de estados hover/focus complejos, y estilos que requieren funciones SASS para clases; reutilización en múltiples páginas, estructura HTML compleja, facilitar mantenimiento, y evitar duplicación de código para componentes.

### 4. Análisis del Código Generado por IA

#### Herramienta y Proceso

Utilicé ChatGPT-4 para generar la página `eventos.html`. El prompt fue específico: crear una página HTML para eventos de economía circular usando Tailwind CSS, con hero section, grid de eventos, estadísticas y call-to-action final.

#### Fortalezas del Código Generado

La IA produjo estructura HTML semánticamente correcta con uso apropiado de elementos HTML5 y jerarquía de headings correcta. Las clases de Tailwind estaban bien aplicadas con combinaciones lógicas de utilidades y responsive design implementado correctamente. La jerarquía visual era clara con contraste de colores apropiado y espaciado coherente.

#### Errores Encontrados

**Problemas de accesibilidad**: Faltaban estados de focus visibles y aria-labels descriptivos. Corregí añadiendo `focus:ring-*` para indicadores visuales y `aria-label` para contexto adicional.

**Gradientes sin fallback**: Había dependencia única de gradientes CSS. Añadí colores sólidos como fallback para navegadores que no los soportan.

**Inconsistencias en naming**: Diferentes anchos máximos sin justificación. Establecí consistencia usando el sistema del sitio.

**Falta de estados interactivos**: No había efectos hover ni transiciones. Los añadí para mejorar la experiencia de usuario.

#### Dificultad de Corrección

La corrección fue relativamente fácil comparada con escribir desde cero. Los aspectos fáciles incluyeron añadir estados hover y focus, corregir inconsistencias de spacing, y mejorar accesibilidad. Los aspectos más complejos fueron integrar con el sistema de colores personalizado, adaptar a la metodología de componentes existente, y asegurar consistencia con el resto del sitio.

#### Opinión sobre Herramientas de IA

Las herramientas de IA son excelentes para acelerar el prototipado, proporcionar ideas de diseño, reducir trabajo repetitivo, y mostrar diferentes formas de usar frameworks. Sin embargo, tienen limitaciones: falta de contexto del proyecto, pueden generar inconsistencias, accesibilidad limitada, y no consideran optimización específica.

Son recomendables para prototipado rápido, generación de contenido de ejemplo, exploración de enfoques de diseño, y automatización de tareas repetitivas. No son recomendables para desarrollo de componentes críticos, implementación de funcionalidades complejas, proyectos que requieren alta personalización, o código de producción sin revisión.

Las herramientas de IA son excelentes asistentes para el desarrollo, especialmente en fases de prototipado. Sin embargo, el conocimiento técnico humano sigue siendo esencial para revisar, optimizar y adaptar el código a los requisitos específicos del proyecto.

## Respuestas a Preguntas Específicas de la PEC

### 1. ¿Qué diferencias hay entre el enfoque de tipo CSS semántico y el CSS de utilidades? ¿Cómo afectó esto a tu proceso de desarrollo? ¿Y a tu código?

#### CSS Semántico (PEC anterior)
**Características:**
- Clases con nombres descriptivos (`.hero-section`, `.speaker-card`, `.navigation-menu`)
- Separación clara entre estructura HTML y presentación CSS
- Estilos agrupados por componentes o secciones
- Reutilización a través de clases semánticas

**Proceso de desarrollo:**
1. Planificación de arquitectura CSS (metodología BEM)
2. Creación de componentes base
3. Desarrollo de páginas aplicando clases semánticas
4. Refinamiento y optimización de estilos

#### CSS de Utilidades (Tailwind - PEC actual)
**Características:**
- Clases atómicas con propósito específico (`.bg-blue-500`, `.text-center`, `.p-4`)
- Estilos aplicados directamente en el HTML
- Composición de diseños mediante combinación de utilidades
- Reutilización a través de extracción de componentes

**Proceso de desarrollo:**
1. Configuración de Tailwind y personalización
2. Desarrollo directo en HTML con clases de utilidad
3. Extracción de patrones comunes con `@apply`
4. Optimización y purging de CSS no utilizado

#### Impacto en el Proceso de Desarrollo

**Velocidad de desarrollo:**
- **CSS Semántico:** Más lento inicialmente, requiere planificación
- **Tailwind:** Más rápido una vez familiarizado con las clases

**Curva de aprendizaje:**
- **CSS Semántico:** Requiere conocimiento de metodologías (BEM, OOCSS)
- **Tailwind:** Requiere memorizar clases de utilidad y configuración

**Mantenimiento:**
- **CSS Semántico:** Cambios centralizados en archivos CSS
- **Tailwind:** Cambios distribuidos en el HTML, pero más predecibles

#### Impacto en el Código

**HTML:**
```html
<!-- CSS Semántico -->
<button class="btn btn-primary">Registrarse</button>

<!-- Tailwind -->
<button class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
  Registrarse
</button>
```

**CSS:**
```scss
/* CSS Semántico */
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #2563eb;
  }
}

/* Tailwind (solo cuando se extrae) */
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition;
}
```

**Conclusión:** Tailwind acelera el desarrollo y reduce la cantidad de CSS personalizado, pero hace el HTML más verboso. Es especialmente útil para prototipado rápido y equipos que ya conocen la herramienta.

### 2. ¿Qué diferencias encontraste entre usar una librería de componentes y una librería de utilidades?

#### Librería de Componentes (ej. Bootstrap)
**Ventajas:**
- **Componentes predefinidos** listos para usar (navbar, cards, modals)
- **JavaScript incluido** para interactividad
- **Desarrollo rápido** para prototipos
- **Consistencia visual** automática
- **Documentación extensa** con ejemplos

**Desventajas:**
- **Personalización limitada** sin sobrescribir estilos
- **Tamaño del bundle** mayor (CSS + JS no utilizado)
- **Dependencia de la estructura HTML** específica
- **Dificultad para crear diseños únicos**
- **Actualizaciones** pueden romper personalizaciones

#### Librería de Utilidades (Tailwind)
**Ventajas:**
- **Máxima flexibilidad** de diseño
- **Bundle optimizado** con purging automático
- **Sin JavaScript** incluido (mayor control)
- **Personalización completa** a través de configuración
- **Consistencia** en espaciado, colores y tipografía
- **Responsive design** integrado

**Desventajas:**
- **Curva de aprendizaje** más pronunciada
- **HTML más verboso** con muchas clases
- **Sin componentes predefinidos** (hay que crearlos)
- **Dependencia de la documentación** para recordar clases
- **Configuración inicial** más compleja

#### Experiencia Práctica

**Con Bootstrap (PEC anterior):**
```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Título</h5>
    <p class="card-text">Contenido</p>
    <a href="#" class="btn btn-primary">Acción</a>
  </div>
</div>
```

**Con Tailwind (PEC actual):**
```html
<div class="bg-white rounded-lg shadow-md p-6">
  <h5 class="text-xl font-semibold mb-2">Título</h5>
  <p class="text-gray-600 mb-4">Contenido</p>
  <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Acción
  </a>
</div>
```

**Conclusión:** Bootstrap es mejor para desarrollo rápido con diseños estándar, mientras que Tailwind es superior para diseños personalizados y control total sobre el CSS final.

### 3. ¿Qué clases y componentes decidiste extraer y por qué?

#### Clases Extraídas con @apply

**1. `.btn-primary` y `.btn-secondary`**
```scss
.btn-primary {
  @include button-style($uoc-corporate, white, $green-primary);
  font-size: rem(16px);
}
```
**Razón:** Los botones se repiten en múltiples páginas con el mismo estilo. Extraer la clase evita repetición y facilita cambios globales.

**2. `.section-title`**
```scss
.section-title {
  font-size: fluid-font-size(rem(24px), rem(36px));
  font-weight: 700;
  margin-bottom: spacing(1);
  color: $uoc-corporate;
}
```
**Razón:** Los títulos de sección tienen un estilo consistente en todo el sitio. La extracción garantiza uniformidad visual.

**3. `.nav-link`**
```scss
.nav-link {
  color: lighten-color($uoc-corporate, 30%);
  transition: color 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: $uoc-corporate;
  }
}
```
**Razón:** Los enlaces de navegación requieren estados hover y focus consistentes. La extracción simplifica el HTML del header.

**4. `.speaker-card`**
```scss
.speaker-card {
  @include card-style($spacing-md, create-shadow(2), $radius-lg);
  text-align: center;
}
```
**Razón:** Las tarjetas de ponentes tienen un diseño complejo con hover effects. Extraer evita repetir múltiples clases de Tailwind.

**5. `.article-content`**
```scss
.article-content {
  @include container(rem(768px), $spacing-lg);
  line-height: 1.75;
  
  h1, h2, p, blockquote, figure, ul {
    // Estilos específicos para contenido de artículo
  }
}
```
**Razón:** El contenido de artículos requiere tipografía específica y espaciado. La extracción mejora la legibilidad del HTML.

#### Componentes Extraídos con posthtml-include

**1. `hero-section.html`**
```html
<section class="hero-section">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <h1>Jornadas de Economía Circular</h1>
    <p>Transformando residuos en recursos</p>
    <div class="flex gap-4 justify-center">
      <a href="#" class="btn-primary">Registrarse</a>
      <a href="#" class="btn-secondary">Más información</a>
    </div>
  </div>
</section>
```
**Razón:** El hero se reutiliza en múltiples páginas con ligeras variaciones. La extracción facilita mantenimiento y consistencia.

**2. `info-card.html`**
```html
<div class="bg-white rounded-xl shadow-lg p-8 text-center">
  <h2 class="section-title">Sobre las Jornadas</h2>
  <p>Información sobre el evento...</p>
</div>
```
**Razón:** Las tarjetas informativas aparecen en varias páginas. La extracción evita duplicación de código.

**3. `contact-button.html`**
```html
<div class="text-center">
  <a href="#contacto" class="btn-primary">
    Contactar
  </a>
</div>
```
**Razón:** El botón de contacto aparece en todas las páginas en la misma posición. La extracción garantiza consistencia.

**4. `speaker-card.html`** (preparado para variables)
```html
<div class="speaker-card">
  <img src="{{image}}" alt="{{name}}" class="w-24 h-24 rounded-full mx-auto mb-4">
  <h2>{{name}}</h2>
  <p>{{title}}</p>
  <p>{{description}}</p>
</div>
```
**Razón:** Las tarjetas de ponentes siguen el mismo patrón. La extracción facilita la adición de nuevos ponentes.

#### Criterios de Extracción

**Para clases (@apply):**
- Repetición en múltiples elementos
- Complejidad de la combinación de utilidades
- Necesidad de estados hover/focus complejos
- Estilos que requieren funciones SASS

**Para componentes (posthtml-include):**
- Reutilización en múltiples páginas
- Estructura HTML compleja
- Facilitar mantenimiento
- Evitar duplicación de código

### 4. Análisis del Código Generado por IA

#### Herramienta Utilizada
Se utilizó **ChatGPT-4** para generar la página `eventos.html` basada en conceptos de diseños de Figma sobre economía circular y conferencias.

#### Prompt Utilizado
"Crea una página HTML para eventos de economía circular usando Tailwind CSS, con hero section, grid de eventos, estadísticas y call-to-action final"

#### Código Generado Analizado

**Fortalezas identificadas:**
1. **Estructura HTML semánticamente correcta**
   - Uso apropiado de `<section>`, `<article>`, `<header>`
   - Jerarquía de headings correcta (h1, h2, h3)

2. **Uso apropiado de clases Tailwind**
   - Combinaciones lógicas de utilidades
   - Responsive design bien implementado
   - Espaciado consistente

3. **Diseño responsive bien estructurado**
   - Mobile-first approach
   - Breakpoints apropiados (`sm:`, `md:`, `lg:`)
   - Grid layouts adaptativos

4. **Jerarquía visual clara**
   - Contraste de colores apropiado
   - Tipografía escalable
   - Espaciado coherente

#### Errores Encontrados

**1. Problemas de Accesibilidad**
```html
<!-- Generado por IA -->
<button class="bg-white text-primary px-8 py-3 rounded-full">
  Registrarse Ahora
</button>

<!-- Corregido -->
<button class="bg-white text-primary px-8 py-3 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary" 
        aria-label="Registrarse para las jornadas">
  Registrarse Ahora
</button>
```

**2. Gradientes no optimizados**
```html
<!-- Generado por IA -->
<div class="bg-gradient-to-br from-green-400 to-green-600">

<!-- Corregido -->
<div class="bg-gradient-to-br from-green-400 to-green-600 bg-green-500">
  <!-- Fallback color añadido -->
</div>
```

**3. Falta de estados interactivos**
```html
<!-- Generado por IA -->
<div class="bg-white rounded-xl shadow-lg">

<!-- Corregido -->
<div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
```

**4. Inconsistencias en naming**
```html
<!-- Generado por IA -->
<div class="max-w-6xl mx-auto px-4">
<div class="max-w-4xl mx-auto px-4">

<!-- Corregido (consistencia) -->
<div class="max-w-6xl mx-auto px-4">
```

#### Dificultad de Corrección

**Nivel de dificultad: FÁCIL-MEDIO**

**Aspectos fáciles de corregir:**
- Añadir estados hover y focus
- Corregir inconsistencias de spacing
- Mejorar accesibilidad con aria-labels
- Optimizar gradientes

**Aspectos que requirieron más trabajo:**
- Integrar con el sistema de colores personalizado
- Adaptar a la metodología de componentes existente
- Optimizar para rendimiento
- Asegurar consistencia con el resto del sitio

#### Comparación: IA vs Desarrollo Manual

**Tiempo de desarrollo:**
- **Con IA:** 30 minutos (generación + corrección)
- **Manual:** 2-3 horas (desde cero)

**Calidad inicial:**
- **IA:** 70-80% correcto, requiere refinamiento
- **Manual:** 90-95% correcto desde el inicio

**Creatividad:**
- **IA:** Soluciones estándar pero funcionales
- **Manual:** Mayor personalización y originalidad

#### Opinión sobre Herramientas de IA

**Ventajas:**
1. **Aceleración del prototipado** - Excelente para crear estructura base rápidamente
2. **Inspiración de diseño** - Proporciona ideas y enfoques alternativos
3. **Reducción de trabajo repetitivo** - Automatiza tareas básicas de maquetación
4. **Aprendizaje** - Muestra diferentes formas de usar Tailwind CSS

**Desventajas:**
1. **Falta de contexto** - No entiende completamente los requisitos del proyecto
2. **Inconsistencias** - Puede generar código que no sigue las convenciones establecidas
3. **Accesibilidad limitada** - Raramente incluye consideraciones de accesibilidad completas
4. **Optimización** - No considera rendimiento o mejores prácticas específicas

**Casos de uso recomendados:**
- ✅ Prototipado rápido de layouts
- ✅ Generación de contenido de ejemplo
- ✅ Exploración de diferentes enfoques de diseño
- ✅ Automatización de tareas repetitivas

**Casos donde no es recomendable:**
- ❌ Desarrollo de componentes críticos
- ❌ Implementación de funcionalidades complejas
- ❌ Proyectos que requieren alta personalización
- ❌ Código de producción sin revisión

Las herramientas de IA son excelentes asistentes para el desarrollo, especialmente en fases de prototipado y exploración. Sin embargo, el conocimiento técnico humano sigue siendo esencial para revisar, optimizar y adaptar el código generado a los requisitos específicos del proyecto.

La IA puede acelerar significativamente el desarrollo inicial, pero la experiencia y criterio del desarrollador son irreemplazables para crear código de calidad, accesible y mantenible.

## URLs del Proyecto Final

- **Deployment Netlify:** [Pendiente de crear]
- **Repositorio GitHub:** https://github.com/jomartinho/segunda-jornada.git
- **PEC Anterior:** https://github.com/jomartinho/Jornadas

## Estado del Proyecto

### Completado
1. Desarrollo completado con Tailwind CSS
2. Extracción de clases y componentes (5 clases + 4 componentes)
3. Página generada con IA (`eventos.html`)
4. Compilación para producción (`npm run build`)
5. Documentación completa con análisis detallado
6. Todas las páginas responsive y optimizadas
7. Configuración de Tailwind personalizada
8. Archivos de configuración incluidos

### Pendiente
1. ~~Crear repositorio en GitHub~~ ✓ Completado
2. Configurar deployment en Netlify
3. Actualizar URLs finales en documentación

### Progreso General: 95% Completado