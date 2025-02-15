import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

interface Tarea {
  id?: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-card class="lista-card">
        <mat-card-title>Lista de Tareas</mat-card-title>
        <table mat-table [dataSource]="tareas" class="mat-elevation-z8">
          <ng-container matColumnDef="titulo">
            <th mat-header-cell *matHeaderCellDef>Título</th>
            <td mat-cell *matCellDef="let tarea">{{ tarea.titulo }}</td>
          </ng-container>

          <ng-container matColumnDef="descripcion">
            <th mat-header-cell *matHeaderCellDef>Descripción</th>
            <td mat-cell *matCellDef="let tarea">{{ tarea.descripcion }}</td>
          </ng-container>

          <ng-container matColumnDef="completada">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let tarea">
              <span *ngIf="tarea.completada" class="completado">Completado</span>
              <span *ngIf="!tarea.completada" class="incompleto">Incompleto</span>
            </td>
          </ng-container>

          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let tarea">
              <button mat-icon-button color="primary" (click)="editarTarea(tarea.id)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="eliminarTarea(tarea.id)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </mat-card>
    </div>
  `,
  styleUrls: ['./tarea-list.component.css']
})
export class TareaListComponent implements OnInit {
  tareas: Tarea[] = [];
  displayedColumns: string[] = ['titulo', 'descripcion', 'completada', 'acciones'];

  constructor(private tareaService: TareaService, private router: Router) {}

  ngOnInit() {
    this.tareaService.tareas$.subscribe((tareas) => {
      this.tareas = tareas;
    });
    this.obtenerTareas();
  }

  obtenerTareas() {
    this.tareaService.getTareas().subscribe(); // Obtiene las tareas iniciales
  }

  eliminarTarea(id: number | undefined) {
    if (id) {
      this.tareaService.deleteTarea(id).subscribe();
    }
  }

  editarTarea(id: number | undefined) {
    if (id) {
      this.router.navigate(['/tareas', id]);  // Navegar a la ruta de edición de la tarea
    }
  }
}
