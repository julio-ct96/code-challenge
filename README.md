# Code Challenge: Todo List Refactoring

> Crea un gestor de tareas pendientes siguiendo **Test-Driven Development** (TDD) en Angular 21+

**Tiempo estimado**: 90–120 minutos

---

## 🎯 Objetivo

Refactorizar un código base para implementar una lista dinámica de tareas pendientes (TODOs) con:

- ✅ CRUD de tareas
- ✅ Filtrado por estado (completadas / incompletas)
- ✅ Ordenamiento por prioridad
- ✅ Cobertura de tests con TDD

---

## 📝 Requerimientos Funcionales

### Operaciones Básicas

- Agregar tareas dinámicamente con título y prioridad
- Marcar tareas como completadas o incompletas
- Eliminar tareas
- Filtrar: mostrar todas, solo completadas, o solo incompletas
- Las tareas con mayor prioridad aparecen primero

### Detalles Técnicos

- **List Items Dinámicos**: Los datos cambian conforme se agregan/actualizan tareas
- **Filtro de Completados**: Opción para visualizar solo completadas, solo incompletas, o todas
- **Ordenamiento por Prioridad**: Las tareas importantes aparecen primero

---

### Pautas de Estilo y Buenas Prácticas

- Código limpio y bien estructurado, con responsabilidades claras
- Comunica tus decisiones de diseño
- Documenta tu enfoque TDD: muestra cómo aplicaste Red → Green → Refactor
- Si consideras mejoras a futuro, menciónalas en los comentarios del código
- Opcionalmente, consume TODOs desde [dummyjson](https://dummyjson.com/docs/todos) para datos reales
- Ten en cuenta accesibilidad en la UI (ARIA labels, navegación por teclado, etc.)

**Nota**: Si encuentras algún error en el código base, intenta solucionarlo y explica tu solución.
