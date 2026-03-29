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

## Decisiones y proceso

Primero me asegure de que el proyecto no tuviera la dependencia vulnerable de Angular 21 para instalar instale una version segura.

Luego vi el componente todo-list y casi me da algo cuando vi todos los antipatrones de Angular. El radar me pitaba en muchas direcciones:

- toggleClass manipulando el DOM directamente con classList.toggle, en lugar de usar los bindings de clase... (existe Renderer2 para manipular el DOM de forma segura).
- document.querySelectorAll('#todoList>li').length dentro de un effect para contar elementos en lugar de usar una computed o el length de los elementos que se renderizan pero claro no hay elementos en el controlador para renderizar dinamicamente..
- Los items estaban hardcodeados en el HTML.
- Todos los id duplicados (task1Checkbox en cada <li>).
- CommonModule importado sin usar ninguna directiva de el.

Decidi empezar encapsulando el SVG y quitando el CommonModule, luego dije... mejor me dejo esto para lo ultimo.

A continuacion me puse con el TDD. Cuando fui a pasar el primer test me di cuenta de que no habia un motor de testing instalado. Asumi que por defecto venia Jest por los ficheros de config, pero al ver que se me dejo el package.json sin el motor de testing dije: aaaaaaaa buena trampa pues voy a quitar Jest y lo reemplazo por Vitest, que es el nuevo estandar de Angular 21+, ademas es mucho mas rapido, tiene soporte nativo para ES modules y la config es minima, si se usa a traves del CLI reutiliza la del tsconfig.

Despues me puse a crear componentes tontos y a hacer el TDD. Hubo un fichero que me llamo la atencion porque no sigue el estandar: global_styles.css (normalmente el estandar es styles). Cuando entre me di cuenta de que la version de Tailwind no era la correcta, no se pq pase desapercibido el fichero tailwind config. Y tampoco me di cuenta al revisar en primer lugar el package.json porque iba muy enfocado en la vulnerabilidad. Agregue el plugin @tailwindcss/postcss que descarta todas las clases no utilizadas a la hora de empaquetar la aplicacion, es un must.

Para la arquitectura use una tipica de 3 capas (presentacion, logica de negocio, datos) porque para un proyecto tan pequeño no tiene sentido aplicar una clean architecture con domain, infrastructure, application, presentation... habria subido la complejidad accidental y el boilerplate para poco valor real.

Subi el target del tsconfig a ES2023 para poder usar toSorted(). El module se quedo en ES2022 porque es la ultima opcion valida de module en TypeScript, no existe ES2023 para module.

Creando componentes me canse de poner a mano el OnPush y lo configure en el angular.json, descartando tambien el fichero CSS ya que usamos Tailwind. Tambien me di cuenta de que faltaba el app.config y que no habia la convencion tipica del app.ts, estaba todo en el main.ts. Me llama la atencion lo de <app-root>Loading...</app-root>, que me di cuenta de ello cuando estaba haciendo el layout y simule la conexion lenta para ver el estado loading que yo habia puesto. Supongo que es lo tipico de StackBlitz, asi que lo deje.

El proceso red green se puede ver en los commits y las ramas dedicadas.

En el angular.json faltan los budgets de tamaño para los paquetes pero no me ha parecido relevante agregarlos, al igual que tmpoco quitar el useDefineForClassFields que es legacy, no se si stackblitz lo usa para algo o que cosa. 

## Mejoras futuras

- Editar todo inline
- Modificar el prioridad del todo inline
- Mostrar errores de validacion 
- Confirmacion antes de eliminar
- Deshacer accion despues de eliminar via snackbar
- Contador de caracteres visible
- Filtro por texto
- Filtro por prioridad
- Si la lista crece mucho, paginacion normal o hacer scroll infinito con virtual scroll