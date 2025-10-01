import { Section } from '@/types';

export const sections: Section[] = [
  // FRONTEND
  {
    id: 'frontend-model',
    title: 'Frontend Model',
    category: 'frontend',
    color: 'yellow',
    description: 'Gestiona el estado y los datos del lado del cliente. Se encarga de mantener la información, realizar validaciones básicas y comunicarse con el backend.',
    responsibility: 'Gestionar estado, validaciones del cliente, comunicación con APIs',
    codeExample: `// UserModel.js - Estado y lógica del cliente
import { useState, useCallback } from 'react';

export const useUserModel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener usuarios del backend
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Error al cargar usuarios');
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo usuario
  const createUser = useCallback(async (userData) => {
    // Validación básica en el cliente
    if (!userData.name || !userData.email) {
      throw new Error('Nombre y email son requeridos');
    }

    setLoading(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Error al crear usuario');
      
      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
  };
};`,
    language: 'javascript'
  },
  {
    id: 'frontend-view',
    title: 'Frontend View',
    category: 'frontend',
    color: 'cyan',
    description: 'Componentes de presentación que solo se encargan de mostrar la interfaz. Reciben datos como props y emiten eventos, pero no contienen lógica de negocio.',
    responsibility: 'Presentar datos, capturar eventos del usuario, UI/UX',
    codeExample: `// UserView.jsx - Componentes de presentación
import React from 'react';

// Componente para mostrar lista de usuarios
export const UserList = ({ users, loading, error, onUserSelect }) => {
  if (loading) return <div className="spinner">Cargando usuarios...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-list">
      <h2>Lista de Usuarios</h2>
      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id} onClick={() => onUserSelect(user)}>
              <div className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className={user.active ? 'active' : 'inactive'}>
                  {user.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Componente para formulario de creación
export const UserForm = ({ onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="user-form">
      <h2>Crear Nuevo Usuario</h2>
      
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          placeholder="Ingresa el nombre"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          placeholder="Ingresa el email"
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Usuario'}
      </button>
    </form>
  );
};

// Componente para mostrar detalles de un usuario
export const UserDetail = ({ user, onEdit, onDelete }) => {
  if (!user) return <div>Selecciona un usuario</div>;

  return (
    <div className="user-detail">
      <h2>Detalles del Usuario</h2>
      <div className="user-info">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Nombre:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Estado:</strong> {user.active ? 'Activo' : 'Inactivo'}</p>
      </div>
      
      <div className="actions">
        <button onClick={() => onEdit(user)}>Editar</button>
        <button onClick={() => onDelete(user.id)}>Eliminar</button>
      </div>
    </div>
  );
};`,
    language: 'javascript'
  },
  {
    id: 'frontend-controller',
    title: 'Frontend Controller',
    category: 'frontend',
    color: 'pink',
    description: 'Coordina la interacción entre el Model y la View. Maneja eventos del usuario, actualiza el modelo y coordina la comunicación con el backend.',
    responsibility: 'Manejar eventos, coordinar Model y View, comunicarse con backend',
    codeExample: `// UserController.jsx - Coordinador principal
import React, { useEffect, useState } from 'react';
import { useUserModel } from './UserModel';
import { UserList, UserForm, UserDetail } from './UserView';

export const UserController = () => {
  const {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
  } = useUserModel();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Manejar selección de usuario
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowForm(false);
  };

  // Manejar envío del formulario
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    try {
      await createUser(userData);
      setShowForm(false);
      event.target.reset();
      // Mensaje de éxito
      alert('Usuario creado exitosamente');
    } catch (err) {
      // El error ya está manejado en el modelo
      alert('Error al crear usuario: ' + err.message);
    }
  };

  // Manejar edición (simplificado)
  const handleEdit = (user) => {
    console.log('Editando usuario:', user);
    // Aquí iría la lógica de edición
  };

  // Manejar eliminación (simplificado)
  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro?')) {
      console.log('Eliminando usuario:', userId);
      // Aquí iría la lógica de eliminación
    }
  };

  return (
    <div className="user-app">
      <header>
        <h1>Gestión de Usuarios</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nuevo Usuario'}
        </button>
      </header>

      <main className="app-content">
        <div className="left-panel">
          <UserList 
            users={users}
            loading={loading}
            error={error}
            onUserSelect={handleUserSelect}
          />
        </div>

        <div className="right-panel">
          {showForm ? (
            <UserForm 
              onSubmit={handleFormSubmit}
              loading={loading}
            />
          ) : (
            <UserDetail 
              user={selectedUser}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </main>
    </div>
  );
};`,
    language: 'javascript'
  },

  // BACKEND
  {
    id: 'backend-controller',
    title: 'Backend Controller',
    category: 'backend',
    color: 'blue',
    description: 'Punto de entrada para las peticiones HTTP. Recibe requests, valida datos básicos, transforma DTOs y delega la lógica de negocio a los servicios.',
    responsibility: 'Recibir HTTP requests, validar entrada, transformar DTOs, manejar responses',
    codeExample: `// UserController.java - Controlador REST con Spring Boot
package com.example.layermap.controller;

import com.example.layermap.dto.CreateUserDto;
import com.example.layermap.dto.UserResponseDto;
import com.example.layermap.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users - Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        try {
            List<UserResponseDto> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // GET /api/users/{id} - Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        try {
            UserResponseDto user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // POST /api/users - Crear nuevo usuario
    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@Valid @RequestBody CreateUserDto createUserDto) {
        try {
            // El controlador solo valida y delega
            UserResponseDto createdUser = userService.createUser(createUserDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // PUT /api/users/{id} - Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDto> updateUser(
            @PathVariable Long id, 
            @Valid @RequestBody CreateUserDto updateUserDto) {
        try {
            UserResponseDto updatedUser = userService.updateUser(id, updateUserDto);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // DELETE /api/users/{id} - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}`,
    language: 'java'
  },
  {
    id: 'backend-service',
    title: 'Backend Service',
    category: 'backend',
    color: 'green',
    description: 'Coordinador de la lógica de aplicación. Orquesta operaciones complejas, maneja transacciones y delega la lógica de negocio al modelo de dominio.',
    responsibility: 'Coordinar operaciones, manejar transacciones, orquestar llamadas entre capas',
    codeExample: `// UserService.java - Servicio coordinador
package com.example.layermap.service;

import com.example.layermap.dto.CreateUserDto;
import com.example.layermap.dto.UserResponseDto;
import com.example.layermap.model.User;
import com.example.layermap.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    // Obtener todos los usuarios
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Obtener usuario por ID
    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        return convertToDto(user);
    }

    // Crear nuevo usuario
    public UserResponseDto createUser(CreateUserDto createUserDto) {
        // 1. Validar email único (regla de negocio)
        validateUniqueEmail(createUserDto.getEmail());

        // 2. Crear modelo de dominio (aplica lógica de negocio)
        User user = User.create(createUserDto.getName(), createUserDto.getEmail());

        // 3. Persistir usando el repositorio
        User savedUser = userRepository.save(user);

        // 4. Coordinar efectos secundarios
        emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getName());

        // 5. Devolver DTO de respuesta
        return convertToDto(savedUser);
    }

    // Actualizar usuario existente
    public UserResponseDto updateUser(Long id, CreateUserDto updateUserDto) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Validar email único si cambió
        if (!existingUser.getEmail().equals(updateUserDto.getEmail())) {
            validateUniqueEmail(updateUserDto.getEmail());
        }

        // Aplicar cambios usando lógica del modelo
        existingUser.updateInfo(updateUserDto.getName(), updateUserDto.getEmail());

        User savedUser = userRepository.save(existingUser);
        return convertToDto(savedUser);
    }

    // Eliminar usuario
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Aplicar lógica de negocio para eliminación
        user.deactivate();
        userRepository.save(user);

        // Coordinar efectos secundarios
        emailService.sendGoodbyeEmail(user.getEmail(), user.getName());
    }

    // Método privado para validaciones
    private void validateUniqueEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("El email ya está registrado");
        }
    }

    // Convertir entidad a DTO
    private UserResponseDto convertToDto(User user) {
        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .active(user.isActive())
                .createdAt(user.getCreatedAt())
                .build();
    }
}`,
    language: 'java'
  },
  {
    id: 'backend-model',
    title: 'Backend Model',
    category: 'backend',
    color: 'orange',
    description: 'Modelo de dominio que contiene toda la lógica de negocio. Implementa validaciones, reglas del negocio, cálculos y comportamientos del dominio.',
    responsibility: 'Lógica de negocio, validaciones, reglas del dominio, comportamientos de entidad',
    codeExample: `// User.java - Modelo de dominio con lógica de negocio
package com.example.layermap.model;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es requerido")
    @Column(nullable = false)
    private String name;

    @Email(message = "Email debe ser válido")
    @NotBlank(message = "El email es requerido")
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructor protegido - usar factory method
    protected User() {}

    private User(String name, String email) {
        this.name = formatName(name);
        this.email = normalizeEmail(email);
        this.active = true;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Factory method - aplica lógica de negocio en la creación
    public static User create(String name, String email) {
        // Validaciones de negocio
        validateName(name);
        validateEmail(email);

        return new User(name, email);
    }

    // Lógica de negocio: actualizar información
    public void updateInfo(String newName, String newEmail) {
        validateName(newName);
        validateEmail(newEmail);

        this.name = formatName(newName);
        this.email = normalizeEmail(newEmail);
        this.updatedAt = LocalDateTime.now();
    }

    // Lógica de negocio: desactivar usuario
    public void deactivate() {
        if (!this.active) {
            throw new IllegalStateException("El usuario ya está inactivo");
        }
        this.active = false;
        this.updatedAt = LocalDateTime.now();
    }

    // Lógica de negocio: reactivar usuario
    public void activate() {
        if (this.active) {
            throw new IllegalStateException("El usuario ya está activo");
        }
        this.active = true;
        this.updatedAt = LocalDateTime.now();
    }

    // Regla de negocio: validar nombre
    private static void validateName(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre no puede estar vacío");
        }
        if (name.trim().length() < 2) {
            throw new IllegalArgumentException("El nombre debe tener al menos 2 caracteres");
        }
        if (name.trim().length() > 100) {
            throw new IllegalArgumentException("El nombre no puede exceder 100 caracteres");
        }
    }

    // Regla de negocio: validar email
    private static void validateEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("El email no puede estar vacío");
        }
        
        String emailRegex = "^[A-Za-z0-9+_.-]+@([A-Za-z0-9.-]+\\.[A-Za-z]{2,})$";
        if (!Pattern.matches(emailRegex, email)) {
            throw new IllegalArgumentException("El formato del email es inválido");
        }
    }

    // Lógica de negocio: formatear nombre
    private static String formatName(String name) {
        return name.trim()
                .replaceAll("\\s+", " ") // Múltiples espacios a uno solo
                .toLowerCase()
                .replaceAll("\\b.", match -> match.group().toUpperCase()); // Primera letra mayúscula
    }

    // Lógica de negocio: normalizar email
    private static String normalizeEmail(String email) {
        return email.trim().toLowerCase();
    }

    // Getters (sin setters para mantener inmutabilidad)
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Boolean isActive() { return active; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}`,
    language: 'java'
  },
  {
    id: 'backend-persistence',
    title: 'Backend Persistence',
    category: 'backend',
    color: 'red',
    description: 'Capa de acceso a datos que maneja únicamente operaciones CRUD. No contiene lógica de negocio, solo abstrae el acceso a la base de datos.',
    responsibility: 'Operaciones CRUD, queries a la base de datos, abstracción de persistencia',
    codeExample: `// UserRepository.java - Capa de persistencia
package com.example.layermap.repository;

import com.example.layermap.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Operaciones CRUD básicas (heredadas de JpaRepository):
    // save(User user)
    // findById(Long id)
    // findAll()
    // deleteById(Long id)
    // existsById(Long id)

    // Queries específicas del dominio (solo acceso a datos)
    
    // Buscar por email (único)
    Optional<User> findByEmail(String email);
    
    // Verificar si existe email
    boolean existsByEmail(String email);
    
    // Buscar usuarios activos
    List<User> findByActiveTrue();
    
    // Buscar usuarios inactivos
    List<User> findByActiveFalse();
    
    // Buscar por nombre (contiene texto)
    List<User> findByNameContainingIgnoreCase(String name);
    
    // Buscar usuarios creados después de una fecha
    List<User> findByCreatedAtAfter(LocalDateTime date);
    
    // Query personalizada: usuarios activos con email específico
    @Query("SELECT u FROM User u WHERE u.active = true AND u.email LIKE %:domain%")
    List<User> findActiveUsersByEmailDomain(@Param("domain") String domain);
    
    // Query nativa para estadísticas simples
    @Query(value = "SELECT COUNT(*) FROM users WHERE active = true", nativeQuery = true)
    Long countActiveUsers();
    
    @Query(value = "SELECT COUNT(*) FROM users WHERE active = false", nativeQuery = true)
    Long countInactiveUsers();
    
    // Buscar usuarios por rango de fechas
    @Query("SELECT u FROM User u WHERE u.createdAt BETWEEN :startDate AND :endDate")
    List<User> findUsersByDateRange(
        @Param("startDate") LocalDateTime startDate, 
        @Param("endDate") LocalDateTime endDate
    );
}

// Implementación personalizada si se necesita (opcional)
// UserRepositoryCustom.java
package com.example.layermap.repository;

import com.example.layermap.model.User;
import java.util.List;

public interface UserRepositoryCustom {
    List<User> findUsersWithComplexCriteria(String searchTerm, Boolean active);
}

// UserRepositoryCustomImpl.java
package com.example.layermap.repository;

import com.example.layermap.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class UserRepositoryCustomImpl implements UserRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> findUsersWithComplexCriteria(String searchTerm, Boolean active) {
        StringBuilder jpql = new StringBuilder("SELECT u FROM User u WHERE 1=1");
        
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            jpql.append(" AND (u.name LIKE :searchTerm OR u.email LIKE :searchTerm)");
        }
        
        if (active != null) {
            jpql.append(" AND u.active = :active");
        }
        
        jpql.append(" ORDER BY u.createdAt DESC");
        
        TypedQuery<User> query = entityManager.createQuery(jpql.toString(), User.class);
        
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            query.setParameter("searchTerm", "%" + searchTerm + "%");
        }
        
        if (active != null) {
            query.setParameter("active", active);
        }
        
        return query.getResultList();
    }
}`,
    language: 'java'
  }
];