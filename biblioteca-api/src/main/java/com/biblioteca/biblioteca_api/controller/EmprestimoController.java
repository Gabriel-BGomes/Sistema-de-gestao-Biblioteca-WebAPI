package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.dto.EmprestimoDTO;
import com.biblioteca.biblioteca_api.entity.Emprestimo;
import com.biblioteca.biblioteca_api.service.EmprestimoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;



@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {
    
    private final EmprestimoService emprestimoService;

    public EmprestimoController(
            EmprestimoService emprestimoService) {

        this.emprestimoService =
                emprestimoService;
    }

    @PostMapping
    public Emprestimo criar(
            @RequestBody EmprestimoDTO dto) {

        return emprestimoService.realizarEmprestimo(dto);
    }

    @GetMapping
    public List<Emprestimo> listarTodos() {
        return emprestimoService.listarTodos();
    }
    
    @PutMapping("/{id}/devolver")
    public Emprestimo devolver(
            @PathVariable Long id) {

        return emprestimoService.devolverLivro(id);
    }
    
}
