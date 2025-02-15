import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TareaListComponent } from './tarea-list/tarea-list.component';
import { TareaFormComponent } from './tarea-form/tarea-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, TareaListComponent, TareaFormComponent],  // Importa Material y otros componentes
  template: `
    <h1>Lista de Tareas</h1>
    <app-tarea-list></app-tarea-list>
    <app-tarea-form></app-tarea-form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mi aplicación de tareas';
}
