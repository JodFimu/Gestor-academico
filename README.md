# Gestor Academico

## Colección de Postman
Para facilitar las pruebas de la API, se proporciona una colección de Postman. Esta colección incluye varios endpoints para la gestión de usuarios y cursos.

### Importar la Colección
1. Abre Postman.
2. Haz clic en el botón `Import`.
3. Selecciona el archivo `GestorAcademico.postman_collection.json` ubicado en el directorio `configs`.
4. Haz clic en `Import`.

### Endpoints



#### Endpoints de Usuario
- **Registrar Estudiante**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/auth/registerStudent`
  - **Método:** `POST`
  - **Cuerpo:** 
    ```json
    {
      "name": "jose",
      "surname": "figueroa",
      "email": "jfigueroa-2023015@kinal.edu.gt",
      "password": "12345678",
      "profilePicture": "<ruta_a_la_foto_de_perfil>",
      "phone": "12345678"
    }
    ```

- **Registrar Maestro**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/auth/registerTeacher`
  - **Método:** `POST`
  - **Cuerpo:** 
    ```json
    {
      "name": "Braulio",
      "surname": "Echeverria",
      "email": "braulio@gmail.com",
      "password": "87654321",
      "profilePicture": "<ruta_a_la_foto_de_perfil>",
      "phone": "09876543"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/auth/login`
  - **Método:** `POST`
  - **Cuerpo:** 
    ```json
    {
      "email": "braulio@gmail.com",
      "password": "87654321"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/finduser/:uid`
  - **Método:** `GET`

- **Listar Usuarios**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/deleteUser/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/updatePassword/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:** 
    ```json
    {
      "newPassword": "09876543"
    }
    ```

- **Actualizar Usuario**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/updateUser/:uid`
  - **Método:** `PUT`
  - **Cuerpo:** 
    ```json
    {
      "name": "david",
      "surname": "muñoz"
    }
    ```

- **Actualizar Foto de Perfil**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/updateProfilePicture/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:** 
    ```json
    {
      "profilePicture": "<ruta_a_la_foto_de_perfil>"
    }
    ```

- **Asignar Curso a Usuario**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/user/asingCourse/:uid`
  - **Método:** `PATCH`
  - **Cuerpo:** 
    ```json
    {
      "cid": "course_id"
    }
    ```

#### Endpoints de Curso
- **Crear Curso**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/createCourse`
  - **Método:** `POST`
  - **Cuerpo:** 
    ```json
    {
      "name": "Taller",
      "description": "Curso de Taller",
      "coursePicture": "<ruta_a_la_foto_del_curso>",
      "teacher": "teacher_id"
    }
    ```

- **Listar Cursos**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/getCourses`
  - **Método:** `GET`

- **Obtener Curso por ID**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/getCourseById/:cid`
  - **Método:** `GET`

- **Eliminar Curso**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/deleteCourse/:cid`
  - **Método:** `DELETE`

- **Actualizar Curso**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/updateCourse/:cid`
  - **Método:** `PUT`

- **Obtener Cursos por Maestro**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/getCoursesByTeacher/:tid`
  - **Método:** `GET`

- **Obtener Cursos de Estudiante**
  - **URL:** `http://localhost:3000/gestorAcademico/v1/course/getStudentCourses/:uid`
  - **Método:** `GET`


## Ejecutar el Proyecto
Para ejecutar el proyecto, sigue estos pasos:
1. Clona el repositorio.
2. Instala las dependencias usando `npm install`.
3. Inicia el servidor usando `npm start`.
