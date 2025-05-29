# GTA4STARS®

Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.2.

## Acerca de

**GTA4STARS®** es una aplicación web diseñada para exhibir y vender autos inspirados en el universo de Grand Theft Auto (GTA). Proporciona una plataforma elegante e interactiva para que los usuarios exploren y compren vehículos.

## Novedades 🔥

- Se **sustituyó completamente el `localStorage` por Supabase** como base de datos en la nube.
- **Registro (`Register`) funcional:** los usuarios nuevos se registran correctamente y sus datos se almacenan directamente en Supabase.
- **Inicio de sesión (`Login`) funcional:** validación de credenciales y gestión de sesión activa implementadas con Supabase.
- Si el usuario ya está logueado, al ir a la ruta `/profile` se mostrará **toda su información cargada desde la base de datos**.
- La **galería de vehículos**, tanto el carrusel como la vista completa, **carga los autos desde la base de datos** en tiempo real.
- Las **reseñas (`Reviews`) también se cargan dinámicamente** desde Supabase.
- En la ruta `/admin`, se pueden ver las **tablas de usuarios, carros y ventas**:
  - Se puede **eliminar y editar usuarios**.
  - Los carros y ventas actualmente son solo de lectura.
- El proceso de **compra de vehículos está funcional**, cargando y procesando correctamente el vehículo seleccionado.

✅ En resumen: **toda la app ya está integrada con Supabase**, y cada módulo clave ahora se conecta y trabaja directamente con la base de datos.

## Servidor de desarrollo

Para iniciar un servidor de desarrollo local, ejecuta:

```bash
ng serve
```

Luego navega a `http://localhost:4200/`. La app se recargará automáticamente al detectar cambios.

O también puedes usar:

```bash
ng serve --open
```

## Construcción

Para compilar el proyecto para producción:

```bash
ng build
```

Esto generará los archivos optimizados en el directorio `dist/`.

## Pruebas unitarias

Para ejecutar pruebas unitarias con Karma:

```bash
ng test
```

## Pruebas de extremo a extremo (e2e)

Para pruebas end-to-end:

```bash
ng e2e
```

*Nota:* Angular CLI no incluye framework de e2e por defecto. Puedes integrar uno como Cypress o Playwright según tus necesidades.

---
---

**Autores:**  

- **ROSTIN SANTIAGO ALZATE MONTOYA**

- **MIGUEL HERAZO DOMINGUEZ**  

- **DANIEL HENAO METAUTE**  

---
