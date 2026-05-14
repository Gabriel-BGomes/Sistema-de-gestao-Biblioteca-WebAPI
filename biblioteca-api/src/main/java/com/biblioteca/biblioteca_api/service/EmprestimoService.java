package com.biblioteca.biblioteca_api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.biblioteca.biblioteca_api.repository.EmprestimoRepository;
import com.biblioteca.biblioteca_api.repository.UsuarioRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import com.biblioteca.biblioteca_api.repository.LivroRepository;
import com.biblioteca.biblioteca_api.entity.Emprestimo;
import com.biblioteca.biblioteca_api.entity.Usuario;
import com.biblioteca.biblioteca_api.entity.Livro;
import com.biblioteca.biblioteca_api.entity.StatusEmprestimo;
import com.biblioteca.biblioteca_api.dto.EmprestimoDTO;
import java.time.LocalDate;
import java.util.List;


@Service
public class EmprestimoService {
    private final EmprestimoRepository emprestimoRepository;
    private final UsuarioRepository usuarioRepository;
    private final LivroRepository livroRepository;

    public EmprestimoService(
            EmprestimoRepository emprestimoRepository,
            UsuarioRepository usuarioRepository,
            LivroRepository livroRepository) {

        this.emprestimoRepository = emprestimoRepository;
        this.usuarioRepository = usuarioRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional
    public Emprestimo realizarEmprestimo(
        @Valid
        @RequestBody
        EmprestimoDTO dto) {
            Usuario usuario = 
                usuarioRepository.findById(dto.getUsuarioId())
                    .orElseThrow(() -> 
                    new RuntimeException(
                        "Usuário não encontrado"));
            Livro livro = 
                livroRepository.findById(dto.getLivroId())
                    .orElseThrow(() -> 
                    new RuntimeException(
                        "Livro não encontrado"));
            if (!livro.getDisponivel()) {
                throw new RuntimeException(
                    "Livro indisponível para empréstimo");
            }
            Emprestimo emprestimo = new Emprestimo();
            emprestimo.setUsuario(usuario);
            emprestimo.setLivro(livro);
            emprestimo.setStatus(StatusEmprestimo.EMPRESTADO);
            emprestimo.setDataEmprestimo(LocalDate.now());
            emprestimo.setDataPrevistaDevolucao(LocalDate.now().plusDays(7));
            livro.setDisponivel(false);
            livroRepository.save(livro);
            return emprestimoRepository.save(emprestimo);
    }

    public List<Emprestimo> listarTodos() {
        return emprestimoRepository.findAll();      
    }
}
