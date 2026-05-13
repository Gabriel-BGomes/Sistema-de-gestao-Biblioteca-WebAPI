package com.biblioteca.biblioteca_api.service;

import com.biblioteca.biblioteca_api.dto.UsuarioDTO;
import com.biblioteca.biblioteca_api.entity.Usuario;
import com.biblioteca.biblioteca_api.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(
            UsuarioRepository usuarioRepository) {

        this.usuarioRepository = usuarioRepository;
    }

    public UsuarioDTO salvar(
            UsuarioDTO dto) {

        Usuario usuario = new Usuario();

        usuario.setNome(dto.getNome());
        usuario.setEmail(dto.getEmail());
        usuario.setTelefone(dto.getTelefone());

        Usuario usuarioSalvo =
                usuarioRepository.save(usuario);

        UsuarioDTO response =
                new UsuarioDTO();

        response.setId(usuarioSalvo.getId());
        response.setNome(usuarioSalvo.getNome());
        response.setEmail(usuarioSalvo.getEmail());
        response.setTelefone(
                usuarioSalvo.getTelefone());

        return response;
    }

    public List<UsuarioDTO> listarTodos() {

        List<Usuario> usuarios =
                usuarioRepository.findAll();

        return usuarios.stream()
                .map(usuario -> {

                    UsuarioDTO dto =
                            new UsuarioDTO();

                    dto.setId(usuario.getId());
                    dto.setNome(
                            usuario.getNome());

                    dto.setEmail(
                            usuario.getEmail());

                    dto.setTelefone(
                            usuario.getTelefone());

                    return dto;
                })
                .toList();
    }
}