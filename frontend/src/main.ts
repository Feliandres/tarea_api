import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TareaFormComponent } from './app/tarea-form/tarea-form.component';  // Importar el componente
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';  // Importar el enrutador

// Definir las rutas
const routes: Route[] = [
  { path: '', component: AppComponent },  // Ruta principal
  { path: 'tareas', component: TareaFormComponent },  // Ruta para crear una tarea
  { path: 'tareas/:id', component: TareaFormComponent }  // Ruta para editar una tarea (con ID)
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes)  // Proveer las rutas aquí
  ]
}).catch(err => console.error(err));
