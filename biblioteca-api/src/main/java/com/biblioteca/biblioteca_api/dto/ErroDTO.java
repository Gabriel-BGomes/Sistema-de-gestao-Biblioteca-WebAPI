package com.biblioteca.biblioteca_api.dto;

public class ErroDTO {
    private String erro;
    private int status;

    public ErroDTO(String erro, int status) {
        this.erro = erro;
        this.status = status;
    }

    public String getErro() { return erro; }
    public int getStatus() { return status; }
}
