package com.biblioteca.biblioteca_api.repository;

import com.biblioteca.biblioteca_api.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository
        extends JpaRepository<Usuario, Long> {

}