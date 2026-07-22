package com.biblioteca.biblioteca_api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import com.biblioteca.biblioteca_api.dto.ErroDTO;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> tratarValidacao(MethodArgumentNotValidException ex) {
        Map<String, String> erros = new HashMap<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        erros.put(error.getField(), error.getDefaultMessage())
                );

        return erros;
    }

        @ExceptionHandler(RegraNegocioException.class)
        @ResponseStatus(HttpStatus.CONFLICT)
        public ErroDTO tratarRegraNegocio(RegraNegocioException ex) {
        return new ErroDTO(ex.getMessage(), 409);
        }
}