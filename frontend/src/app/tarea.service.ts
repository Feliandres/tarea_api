import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:8080/api/tareas';

  private tareasSubject = new BehaviorSubject<Tarea[]>([]);
  tareas$ = this.tareasSubject.asObservable(); // Observable para obtener las tareas

  private tareaEnEdicionSubject = new BehaviorSubject<Tarea | null>(null);
  tareaEnEdicion$ = this.tareaEnEdicionSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl).pipe(
      tap((tareas) => {
        this.tareasSubject.next(tareas);  // Actualizar la lista de tareas
      })
    );
  }

  addTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.apiUrl, tarea).pipe(
      tap(() => {
        this.getTareas();  // Recargar la lista de tareas después de agregar
      })
    );
  }

  updateTarea(id: number, tarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.apiUrl}/${id}`, tarea).pipe(
      tap(() => {
        this.getTareas();  // Recargar la lista de tareas después de actualizar
      })
    );
  }

  deleteTarea(id: number | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.getTareas();  // Recargar la lista de tareas después de eliminar
      })
    );
  }

  setTareaEnEdicion(tarea: Tarea): void {
    this.tareaEnEdicionSubject.next(tarea);
  }
}
