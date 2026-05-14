package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.entity.Livro;
import com.biblioteca.biblioteca_api.service.LivroService;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/livros")
public class LivroController {
    
    private final LivroService livroService;

    public LivroController(
            LivroService livroService) {

        this.livroService =
                livroService;
    }

    @PostMapping
    public Livro salvar(
            @RequestBody Livro livro) {

        return livroService.salvar(livro);
    }

    @GetMapping
    public List<Livro> listarTodos() {

        return livroService.listarTodos();
    }

    
    @GetMapping("/listarIsbn/{isbn}")
    public Livro buscarPorIsbn(
        @PathVariable String isbn) {
        return livroService.buscarPorIsbn(isbn);
    }


    
    
    /*
    @GetMapping("/buscar")
    public Livro buscarPorIsbn(
        @RequestBody String isbn) {
        return livroService.buscarPorIsbn(isbn);
    }
    */

}
