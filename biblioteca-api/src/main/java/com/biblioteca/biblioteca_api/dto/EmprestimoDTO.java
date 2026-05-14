package com.biblioteca.biblioteca_api.dto;

import jakarta.validation.constraints.NotNull;

public class EmprestimoDTO {

    @NotNull(message =
            "Usuário obrigatório")
    private Long usuarioId;

    @NotNull(message =
            "Livro obrigatório")
    private Long livroId;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public Long getLivroId() {
        return livroId;
    }
}