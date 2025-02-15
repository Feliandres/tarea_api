import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule
  ],
  template: `
    <mat-card class="tarea-card">
      <mat-card-header>
        <mat-card-title>{{ tarea.id ? 'Editar' : 'Agregar' }} Tarea</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Título</mat-label>
            <input matInput placeholder="Título de la tarea" [(ngModel)]="tarea.titulo" name="titulo" required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Descripción</mat-label>
            <textarea matInput placeholder="Descripción opcional" [(ngModel)]="tarea.descripcion" name="descripcion"></textarea>
          </mat-form-field>

          <mat-checkbox [(ngModel)]="tarea.completada" name="completada">
            Completada
          </mat-checkbox>

          <mat-card-actions>
            <button mat-raised-button color="primary" type="submit">{{ tarea.id ? 'Guardar Cambios' : 'Agregar Tarea' }}</button>
          </mat-card-actions>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./tarea-form.component.css']
})
export class TareaFormComponent implements OnInit {
  tarea: Tarea = { titulo: '', descripcion: '', completada: false };

  constructor(
    private tareaService: TareaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar si la tarea se está editando
    const tareaId = this.route.snapshot.paramMap.get('id');
    if (tareaId) {
      this.tareaService.getTareas().subscribe((tareas) => {
        const tareaEncontrada = tareas.find(t => t.id === Number(tareaId));
        if (tareaEncontrada) {
          this.tarea = tareaEncontrada;
        }
      });
    }
  }

  onSubmit() {
    if (this.tarea.titulo.trim()) {
      if (this.tarea.id) {
        // Si tiene id, es una edición
        this.tareaService.updateTarea(this.tarea.id, this.tarea).subscribe(() => {
          this.resetFormulario();  // Resetear el formulario después de editar
          this.router.navigate(['/']);
        });
      } else {
        // Si no tiene id, es una nueva tarea
        this.tareaService.addTarea(this.tarea).subscribe(() => {
          this.resetFormulario();  // Resetear el formulario después de agregar
          this.router.navigate(['/']);
        });
      }
    }
  }

  // Función para resetear el formulario
  resetFormulario() {
    this.tarea = { titulo: '', descripcion: '', completada: false };
  }
}
