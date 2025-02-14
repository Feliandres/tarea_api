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
        Optional<Tarea> tareaExistente = tareaRepository.findById(id);
        if (!tareaExistente.isPresent()) {
            throw new RuntimeException("Tarea no encontrada con ID: " + id);
        }
        tarea.setId(id);  // Aseguramos que la tarea a actualizar tenga el ID correcto
        return tareaRepository.save(tarea);
    }
    // Elimina una tarea
    public void deleteTarea(Long id) {
        tareaRepository.deleteById(id);
    }
}
