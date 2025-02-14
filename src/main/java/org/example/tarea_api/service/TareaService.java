package org.example.tarea_api.service;

import org.example.tarea_api.model.Tarea;
import org.example.tarea_api.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    @Autowired
    private TareaRepository tareaRepository;

    // Devuelve todas las tareas
    public List<Tarea> getAllTareas() {
        return tareaRepository.findAll();
    }
    // Crea una nueva tarea
    public Tarea createTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }
    // Actualiza una tarea
    public Tarea updateTarea(Long id, Tarea tarea) {
        Optional<Tarea> existingTarea = tareaRepository.findById(id);
        if (existingTarea.isPresent()) {
            Tarea updatedTarea = existingTarea.get();
            updatedTarea.setTitulo(tarea.getTitulo());
            updatedTarea.setDescripcion(tarea.getDescripcion());
            updatedTarea.setCompletada(tarea.isCompletada());
            return tareaRepository.save(updatedTarea);
        } else {
            throw new RuntimeException("Tarea no encontrada con ID: " + id);
        }
    }
    // Elimina una tarea
    public void deleteTarea(Long id) {
        tareaRepository.deleteById(id);
    }
}
