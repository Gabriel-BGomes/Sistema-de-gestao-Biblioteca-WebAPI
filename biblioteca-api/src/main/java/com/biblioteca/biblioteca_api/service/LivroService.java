package com.biblioteca.biblioteca_api.service;

import org.springframework.stereotype.Service;

import com.biblioteca.biblioteca_api.repository.LivroRepository;
import com.biblioteca.biblioteca_api.entity.Livro;
import java.util.List;

@Service
public class LivroService {
    private final LivroRepository livroRepository;

    public LivroService(
            LivroRepository livroRepository) {

        this.livroRepository = livroRepository;
    }

    public Livro salvar(
            Livro livro) {
        if (livroRepository
                .findByIsbn(livro.getIsbn())
                .isPresent()) {

            throw new RuntimeException(
                    "ISBN já cadastrado");
        } 
            return livroRepository.save(livro);
    }

    public List<Livro> listarTodos() {

        return livroRepository.findAll();
    }

    public Livro buscarPorIsbn(
            String isbn) {

        return livroRepository
            .findByIsbn(isbn)
             .orElseThrow(() ->
                new RuntimeException(
                        "Livro não encontrado"));
    }
}
