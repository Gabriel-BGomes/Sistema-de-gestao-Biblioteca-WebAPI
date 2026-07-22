package com.biblioteca.biblioteca_api.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import com.biblioteca.biblioteca_api.dto.EmprestimoDTO;
import com.biblioteca.biblioteca_api.entity.Emprestimo;
import com.biblioteca.biblioteca_api.entity.Livro;
import com.biblioteca.biblioteca_api.entity.Usuario;
import com.biblioteca.biblioteca_api.exception.RegraNegocioException;
import com.biblioteca.biblioteca_api.repository.EmprestimoRepository;
import com.biblioteca.biblioteca_api.repository.LivroRepository;
import com.biblioteca.biblioteca_api.repository.UsuarioRepository;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmprestimoServiceTest {

    @Mock
    LivroRepository livroRepository;

    @Mock
    UsuarioRepository usuarioRepository;

    @Mock
    EmprestimoRepository emprestimoRepository;

    @InjectMocks
    EmprestimoService emprestimoService;

    @Test
    void deveLancarExcecaoQuandoLivroIndisponivel() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);

        Livro livro = new Livro();
        livro.setDisponivel(false);

        EmprestimoDTO dto = new EmprestimoDTO();
        dto.setUsuarioId(1L);
        dto.setLivroId(1L);

        when(usuarioRepository.findById(1L))
            .thenReturn(Optional.of(usuario));
        when(livroRepository.findById(1L))
            .thenReturn(Optional.of(livro));

        // Act + Assert
        assertThrows(RegraNegocioException.class, () ->
            emprestimoService.realizarEmprestimo(dto)
        );
    }

    @Test
    void deveRealizarEmprestimoComSucesso() {
        // Arrange
        Usuario usuario = new Usuario();
        usuario.setId(1L);

        Livro livro = new Livro();
        livro.setDisponivel(true);

        EmprestimoDTO dto = new EmprestimoDTO();
        dto.setUsuarioId(1L);
        dto.setLivroId(1L);

        when(usuarioRepository.findById(1L))
            .thenReturn(Optional.of(usuario));
        when(livroRepository.findById(1L))
            .thenReturn(Optional.of(livro));
        when(emprestimoRepository.save(any()))
            .thenReturn(new Emprestimo());

        // Act
        Emprestimo resultado = emprestimoService.realizarEmprestimo(dto);

        // Assert
        assertFalse(livro.getDisponivel());
        verify(emprestimoRepository).save(any());
    }
}