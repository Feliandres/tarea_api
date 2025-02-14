package org.example.tarea_api.controller;

import org.example.tarea_api.model.Tarea;
import org.example.tarea_api.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// Define la ruta base de la API
@RequestMapping("/api/tareas")

public class TareaController {

    @Autowired
    // Permite inyectar la instancia del servicio
    private TareaService tareaService;

    @GetMapping
    // Metodo para obtener todas las tareas
    public List<Tarea> getTareas() {
        return tareaService.getAllTareas();
    }

    @PostMapping
    // Metodo para crear una tarea
    @ResponseStatus(HttpStatus.CREATED) // Indica que la respuesta debe ser un código 201
    public Tarea createTarea(@RequestBody Tarea tarea) {
        // Verificamos que el título no sea nulo
        if (tarea.getTitulo() == null || tarea.getTitulo().isEmpty()) {
            throw new IllegalArgumentException("El título de la tarea es obligatorio.");
        }
        return tareaService.createTarea(tarea);
    }

    @PutMapping("/{id}")
    // Metodo para actualizar una tarea por id
    public Tarea updateTarea(@PathVariable Long id, @RequestBody Tarea tarea) {
        // Verificamos que el título no sea nulo
        if (tarea.getTitulo() == null || tarea.getTitulo().isEmpty()) {
            throw new IllegalArgumentException("El título de la tarea es obligatorio.");
        }
        return tareaService.updateTarea(id, tarea);
    }

    @DeleteMapping("/{id}")
    // Metodo para eliminar una tarea por id
    @ResponseStatus(HttpStatus.NO_CONTENT) // Indica que la respuesta debe ser un código 204
    public void deleteTarea(@PathVariable Long id) {
        tareaService.deleteTarea(id);
    }
}