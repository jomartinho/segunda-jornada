# Jornadas de Economía Circular - Tailwind CSS

Proyecto desarrollado para la **PEC 3** de la asignatura **Herramientas HTML y CSS II** de la **Universitat Oberta de Catalunya (UOC)**.

Sitio web responsive sobre jornadas de economía circular, desarrollado utilizando el paradigma **Atomic CSS** con **Tailwind CSS v4** y el **UOC Boilerplate**.

## 🌐 Demo

- **Sitio web:** [Pendiente de deployment]
- **Repositorio:** [Este repositorio]

## 🛠️ Tecnologías

- **HTML5** - Estructura semántica
- **SCSS/Sass** - Preprocesador CSS con funciones, mixins y variables
- **Tailwind CSS v4** - Framework de utilidades CSS
- **Parcel** - Bundler y servidor de desarrollo
- **PostHTML Include** - Sistema de componentes
- **PostCSS** - Procesamiento de CSS

Basado en UOC Boilerplate v3.x para los cursos de Herramientas HTML y CSS.

## Requirements

[Node.js](http://nodejs.org/) >= 18.x

## Getting started

Clone this repository with `git clone`, or download a .zip file using the top right green button.

Using the Terminal, navigate to the project folder and run `npm install`.

## Features

- Uses [Parcel v2](https://parceljs.org) module bundler.
- NPM scripts for fast development and production build (see Commands below).

### Stylesheets

- [Sass/SCSS](https://sass-lang.com) to CSS compilation (`@parcel/transformer-sass`).
- Transpilation of modern CSS synthax to support older bvrowsers, based on `browserslist`, including vendor prefixing and synthax lowering, with [PostCSS](https://postcss.org/) (`@parcel/transformer-postcss`).
- Minification and optimization of CSS files on production builds with [`lightningcss`](https://github.com/parcel-bundler/lightningcss) (`@parcel/optimizer-css`).

### HTML

- Minification and optimization of CSS files on production builds [`htmlnano`](https://github.com/posthtml/htmlnano) (`@parcel/optimizer-htmlnano`).
- [PostHTML](https://github.com/posthtml/posthtml) (`@parcel/transformer-posthtml`) features:
  - Include partial HTML files with [`posthtml-include`](https://github.com/posthtml/posthtml-include).

### Scripts

- Transpilation of modern JavaScript synthax to support older browsers, based on `browserslist`, with with [Babel](https://babeljs.io/) (`@parcel/transformer-babel`).
- Minification and optimization of JS code with [SWC](https://swc.rs/) (`@parcel/optimizer-swc`).

### Images

- Image transformation with [`sharp`](https://sharp.pixelplumbing.com/) ([`@parcel/transformer-image`](https://parceljs.org/recipes/image/)).

### Development

- Development server launch and live reloading on file changes.
- Friendly error reporting.

## How to use this boilerplate

Content lives inside the `src/` folder. If you do not want to change the configuration or are unsure about what you are doing, do not edit files outside the `src/` folder.

Always run the following commands during the development stage and for production builds. Please note that it is expected that all projects built with this boilerplate are compiled using `npm run build` before they are published.

### Commands

| Command         | Description                                                                                                                                                                                                                                                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`   | Runs a local web server for development and opens the browser to display it. Automatically compiles styles and scripts whenever a file in `src/` is changed, and live reloads the browser. This is what _must be run_ on the development stage.                                                                                                                     |
| `npm run build` | Compiles and minifies and optimizes the files in the assets folder. The generated compiled and optimized files are located in the `dist/` folder. This is what _must be run_ before publishing the project. This is also the build command to be run by external deployment services such as Netlify. The publishable files are then located in the `dist/` folder. |
| `npm run clean` | Deletes the current `/dist` folder and cache folders.                                                                                                                                                                                                                                                                                                               |
| `npm run test`  | Displays a success message if everything is working as expected.                                                                                                                                                                                                                                                                                                    |

## Need help? / Want to help out?

Feel free to create a [new issue](https://github.com/uoc-advanced-html-css/uoc-boilerplate/issues/new/) or drop me a line at jorditarrida@uoc.edu.

Are you using this Boilerplate for your projects or for educational purposes? I would love to hear about it!
