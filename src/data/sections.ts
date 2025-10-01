import { Section } from '@/types';

export const sections: Section[] = [
  // FRONTEND
  {
    id: 'frontend-model',
    title: 'Model',
    category: 'frontend',
    color: 'yellow',
    description: 'Maneja el estado y los datos del frontend. Guarda la información y se comunica con la API.',
    responsibility: 'Estado de la aplicación, llamadas a la API',
    codeExample: `// UserModel.js - Estado del frontend
import { useState } from 'react';

export const useUserModel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const createUser = async (userData) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const newUser = await response.json();
    setUsers([...users, newUser]);
  };

  return { users, loading, getUsers, createUser };
};`,
    language: 'javascript'
  },
  {
    id: 'frontend-view',
    title: 'View',
    category: 'frontend',
    color: 'cyan',
    description: 'Componentes que solo muestran información. Reciben datos y emiten eventos.',
    responsibility: 'Mostrar datos, capturar eventos del usuario',
    codeExample: `// UserView.jsx - Componentes de presentación
import React from 'react';

export const UserList = ({ users, onUserSelect }) => (
  <div>
    <h2>Usuarios</h2>
    {users.map(user => (
      <div key={user.id} onClick={() => onUserSelect(user)}>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    ))}
  </div>
);

export const UserForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <input name="name" placeholder="Nombre" required />
    <input name="email" type="email" placeholder="Email" required />
    <button type="submit">Crear Usuario</button>
  </form>
);`,
    language: 'javascript'
  },
  {
    id: 'frontend-controller',
    title: 'Controller',
    category: 'frontend',
    color: 'pink',
    description: 'Conecta la Vista con el Modelo. Maneja eventos del usuario y coordina las acciones.',
    responsibility: 'Manejar eventos, coordinar Vista y Modelo',
    codeExample: `// UserController.jsx - Coordinador
import React, { useEffect } from 'react';
import { useUserModel } from './UserModel';
import { UserList, UserForm } from './UserView';

export const UserController = () => {
  const { users, loading, getUsers, createUser } = useUserModel();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await createUser({
      name: formData.get('name'),
      email: formData.get('email')
    });
    event.target.reset();
  };

  return (
    <div>
      <UserForm onSubmit={handleSubmit} />
      <UserList users={users} />
    </div>
  );
};`,
    language: 'javascript'
  },

  // BACKEND
  {
    id: 'backend-controller',
    title: 'Controller',
    category: 'backend',
    color: 'blue',
    description: 'Recibe las peticiones HTTP y devuelve respuestas. Usa DTOs (Data Transfer Objects) como contratos de comunicación con el frontend.',
    responsibility: 'Recibir requests HTTP, manejar DTOs, devolver responses',
    codeExample: `// UserController.java - API REST con DTOs
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserResponseDto> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public UserResponseDto createUser(@RequestBody CreateUserDto request) {
        return userService.createUser(request.getName(), request.getEmail());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}

// DTOs - Contratos de comunicación
class CreateUserDto {
    private String name;
    private String email;
    
    // getters y setters
    public String getName() { return name; }
    public String getEmail() { return email; }
}

class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private Boolean active;
    
    // getters y setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Boolean getActive() { return active; }
}`,
    language: 'java'
  },
  {
    id: 'backend-service',
    title: 'Service',
    category: 'backend',
    color: 'green',
    description: 'Coordina las operaciones. Usa el Modelo para aplicar reglas de negocio y Persistencia para guardar datos.',
    responsibility: 'Coordinar operaciones, orquestar Modelo y Persistencia',
    codeExample: `// UserService.java - Coordinador de operaciones
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(String name, String email) {
        // Usa el modelo para crear con reglas de negocio
        User user = User.create(name, email);
        
        // Usa persistencia para guardar
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        // Aplica reglas del modelo
        user.deactivate();
        
        // Guarda cambios
        userRepository.save(user);
    }
}`,
    language: 'java'
  },
  {
    id: 'backend-model',
    title: 'Model',
    category: 'backend',
    color: 'orange',
    description: 'Contiene las reglas del negocio. Valida datos y define cómo se comportan los objetos.',
    responsibility: 'Reglas de negocio, validaciones, comportamientos',
    codeExample: `// User.java - Modelo con reglas de negocio
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    private String name;
    private String email;
    private Boolean active = true;

    // Constructor privado - solo crear via factory method
    private User(String name, String email) {
        this.name = formatName(name);
        this.email = email.toLowerCase();
        this.active = true;
    }

    // Factory method con validaciones
    public static User create(String name, String email) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Nombre es requerido");
        }
        if (!email.contains("@")) {
            throw new IllegalArgumentException("Email inválido");
        }
        return new User(name, email);
    }

    // Regla de negocio: desactivar
    public void deactivate() {
        if (!this.active) {
            throw new IllegalStateException("Usuario ya está inactivo");
        }
        this.active = false;
    }

    // Regla de negocio: formatear nombre
    private String formatName(String name) {
        return name.trim().substring(0, 1).toUpperCase() + 
               name.trim().substring(1).toLowerCase();
    }

    // Getters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public Boolean isActive() { return active; }
}`,
    language: 'java'
  },
  {
    id: 'backend-persistence',
    title: 'Persistence',
    category: 'backend',
    color: 'red',
    description: 'Se encarga únicamente de guardar y buscar datos en la base de datos. No tiene lógica de negocio.',
    responsibility: 'Operaciones CRUD, acceso a base de datos',
    codeExample: `// UserRepository.java - Acceso a datos
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Operaciones básicas heredadas:
    // save(User user)
    // findById(Long id)
    // findAll()
    // deleteById(Long id)

    // Búsquedas específicas
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    List<User> findByActiveTrue();
    
    @Query("SELECT u FROM User u WHERE u.name LIKE %:name%")
    List<User> findByNameContaining(@Param("name") String name);
}`,
    language: 'java'
  }
];