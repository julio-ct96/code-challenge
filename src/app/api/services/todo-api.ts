import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TodoApiResponseDto } from '@api/dtos/TodoApiResponseDto';
import { ApiResponse } from '@api/interfaces/ApiResponse';
import { TodoMapper } from '@api/mappers/TodoMapper';
import { Todo } from '@interfaces/Todo';
import { catchError, map, Observable, of, startWith } from 'rxjs';

// este servicio esta provisto en root, no guarda ningun estado es un servicio que solo hace llamadas a la API
// pero normalmente por consistencia si fuera un servicio que consume una API especifica de una vista
// lo ideal seria proveerlo en el componente
@Injectable({
  providedIn: 'root',
})
export class TodoApi {
  readonly #http = inject(HttpClient);
  readonly #apiUrl = 'https://dummyjson.com/todos';

  // Aqui no decidi utilizar httpResource aun porque no es estable,
  // en su lugar encapsule tambien de igual manera los estados de error y de carga
  // en un ApiResponse, en el servicio hago un toSignal para poder sacar computadas/linked
  // de los 3 estados, data, load y error, esto me permite
  // desacoplar el componente de la interfaz de ApiResponse

  // tambien como mejora aqui se podria crear un operador para reutilizar el codigo de la gestion de estado en todos los metodos http
  // o crear una clase en la que encapsulemos la logica de la gestion de estado para que todos los servicios que vayan a usar http 
  // tengan esa funcionalidad de manera automatica, expondriamos nuestros propios metodos http, 
  // y esa seria la unica clase que inyectaria  el HttpClient en principio, como siempre, todo depende de las necesidades del proyecto
  loadTodos(): Observable<ApiResponse<Todo[]>> {
    return this.#http.get<TodoApiResponseDto>(this.#apiUrl).pipe(
      map(response => ({
        // utilizo el mapper para devolver directamente en data el objeto de "mi dominio" y no el de la API
        data: response.todos.map(TodoMapper.fromApi),
        isLoading: false,
        error: null,
      })),
      catchError(() => of({
        data: [] as Todo[],
        isLoading: false,
        error: 'Error loading todos',
      })),
      startWith({ data: [] as Todo[], isLoading: true, error: null }),
    );
  }
}