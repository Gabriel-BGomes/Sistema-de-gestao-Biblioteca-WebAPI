package com.biblioteca.biblioteca_api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "livros")
@Getter
@Setter
public class Livro {

    @Id
    @GeneratedValue(strategy =
            GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,
            length = 150)
    private String titulo;

    @Column(nullable = false,
            length = 100)
    private String autor;

    @Column(nullable = false,
            unique = true,
            length = 20)
    private String isbn;

    @Column(nullable = false)
    private Boolean disponivel = true;
}