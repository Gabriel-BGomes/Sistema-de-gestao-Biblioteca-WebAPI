package com.biblioteca.biblioteca_api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.biblioteca.biblioteca_api.entity.Emprestimo;

public interface EmprestimoRepository 
    extends JpaRepository<Emprestimo, Long> {

    
} 
