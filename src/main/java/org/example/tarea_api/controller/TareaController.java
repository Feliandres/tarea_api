package org.example.tarea_api.controller;

import org.example.tarea_api.model.Tarea;
import org.example.tarea_api.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")

public class TareaController {

    @Autowired
    private TareaService tareaService;

    @GetMapping
    public List<Tarea> getTareas() {
        return tareaService.getAllTareas();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarea createTarea(@RequestBody Tarea tarea) {
        return tareaService.createTarea(tarea);
    }

    @PutMapping("/{id}")
    public Tarea updateTarea(@PathVariable Long id, @RequestBody Tarea tarea) {
        return tareaService.updateTarea(id, tarea);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTarea(@PathVariable Long id) {
        tareaService.deleteTarea(id);
    }
}