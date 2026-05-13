package com.biblioteca.biblioteca_api.controller;

import com.biblioteca.biblioteca_api.dto.UsuarioDTO;
import com.biblioteca.biblioteca_api.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(
            UsuarioService usuarioService) {

        this.usuarioService =
                usuarioService;
    }

    @PostMapping
    public UsuarioDTO salvar(
            @Valid
            @RequestBody
            UsuarioDTO dto) {

        return usuarioService.salvar(dto);
    }

    @GetMapping
    public List<UsuarioDTO>
    listarTodos() {

        return usuarioService.listarTodos();
    }
}