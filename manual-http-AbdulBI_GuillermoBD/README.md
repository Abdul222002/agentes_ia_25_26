# Parte 4: Thunder Client – CRUD Students API

Este apartado muestra el desarrollo de las pruebas realizadas con **Thunder Client** para la API de estudiantes usando la base de datos `db.json`.

---

## 4.1 ⚙ Configuración

Dado que la versión free de Thunder Client **no permite colecciones ni entornos de variables**, todas las peticiones se realizaron directamente con la URL completa.

* **Base URL**: `http://localhost`
* **Puerto**: `4000`
* **Recurso principal**: `/students`
* **Recursos secundarios**: `/enrollments`

Ejemplo de endpoint completo:
`http://localhost:4000/students`

---

## 4.2 📡 Peticiones

Se realizaron las siguientes peticiones HTTP contra la API de estudiantes:

1. **CREATE Student (POST)**
2. **GET All Students (GET)**
3. **GET Student by ID (GET)**
4. **UPDATE Student (PUT)**
5. **PATCH Student (PATCH)**
6. **DELETE Student (DELETE)**

---

## 4.3 📸 Capturas de pantalla

A continuación se muestran las capturas de pantalla de cada petición realizada con Thunder Client.

### 1. CREATE Student (POST)

Request a `http://localhost:4000/students` con body en formato JSON.

![create\_student](images/thunderClient/create_student.png)

Headers usados en la petición:
![create\_student\_headers](images/thunderClient/create_student_headers.png)

---

### 2. GET All Students (GET)

Request a `http://localhost:4000/students` para listar todos los estudiantes.
![get\_all\_students](images/thunderClient/getAllStudents.png)

---

### 3. GET Student by ID (GET)

Request a `http://localhost:4000/students/1` para consultar un estudiante en particular.
![get\_student\_by\_id](images/thunderClient/getStudentById.png)

---

### 4. UPDATE Student (PUT)

Request a `http://localhost:4000/students/2` con body JSON para reemplazar los datos de un estudiante.

* Debido a que es una operación de reemplazo total, es necesario enviar todos los campos del recurso.

Los datos antes y después de la actualización son:

![update\_student\_before](images/thunderClient/putBefore.png)

![update\_student\_after](images/thunderClient/putAfter.png)

---

### 5. PATCH Student (PATCH)

Request a `http://localhost:4000/students/3` con body parcial en JSON para modificar solo algunos campos.

Los datos antes y después de la actualización son:

![update\_student\_before](images/thunderClient/patchBefore.png)

![update\_student\_after](images/thunderClient/patchStudent.png)

---

### 6. DELETE Student (DELETE)

Request a `http://localhost:4000/enrollments/4` para eliminar un estudiante.
![delete\_student](images/thunderClient/deleteEnrollments.png)

---

## 4.4 📝 Documentación

Para usar Thunder Client con esta API:

1. Instalar la dependencia JSON Server si no está instalada:

   ```bash
   npm install -g json-server
   ```

2. Iniciar el servidor JSON Server con el archivo `db.json`:

   ```bash
   json-server --watch db.json --port 4000
   ```

# Parte 5: REST Client – CRUD Students API

Este apartado muestra el desarrollo de las pruebas realizadas con **REST Client** de VS Code para la API de estudiantes usando la base de datos `db.json`. Se incluyen operaciones CRUD completas, filtros y el uso de variables configuradas para mantener el archivo limpio y organizado.

---

## 5.1 ⚙ Configuración

Se creó un archivo llamado `peticiones-crud.http` en la raíz del proyecto con todas las operaciones CRUD.

   **Archivo**: `peticiones-crud.http`
   **Variables definidas en el archivo**:

```http
@baseUrl = http://localhost
@port = 4000
@apiUrl = {{baseUrl}}:{{port}}/students
@ContentType = application/json
```

 **Notas**:

  * REST Client **no lee `.env`**, por lo que todas las variables deben definirse dentro del archivo `.http`.
  * Cada petición está separada con `###` y tiene comentarios descriptivos para facilitar la comprensión.

---

## 5.2 📡 Peticiones realizadas

Se implementaron las siguientes operaciones CRUD sobre el recurso `students`:

1. **CREATE Student (POST)** – Crear un nuevo estudiante (ejemplo: Abdul y Guillermo Bazán).
2. **READ All Students (GET)** – Obtener todos los estudiantes.
3. **READ Student by ID (GET)** – Consultar un estudiante específico.
4. **READ Students activos (GET)** – Filtrar estudiantes cuyo campo `active` sea `true`.
5. **READ Students por nivel (GET)** – Filtrar estudiantes por el campo `level`.
6. **UPDATE Student (PUT)** – Actualizar todos los campos de un estudiante.
7. **PATCH Student (PATCH)** – Actualizar campos específicos de un estudiante.
8. **DELETE Student (DELETE)** – Eliminar un estudiante.

---

## 5.3 📸 Capturas de pantalla

Cada captura debe mostrar **request completa** (método, URL, headers y body) y **response completa** (status, headers y body).

### 1. CREATE Student (POST)

Request a `{{apiUrl}}` con body en JSON.

* Estudiantes de ejemplo: Abdul y Guillermo Bazán.

**Captura ejemplo**:
![create\_student](images/http/createStudent.png)

---

### 2. GET All Students (GET)

Request a `{{apiUrl}}` para listar todos los estudiantes.

**Captura ejemplo**:
![get\_all\_students](images/http/getAllStudents.png)

---

### 3. GET Student by ID (GET)

Request a `{{apiUrl}}/2` para consultar Guillermo Bazán.

**Captura ejemplo**:
![get\_student\_by\_id](images/http/getStudentById.png)

---

### 4. GET Students activos (GET)

Request a `{{apiUrl}}?active=true` para filtrar solo estudiantes activos.

**Captura ejemplo**:
![get\_active\_students](images/http/getActiveStudents.png)

---

### 5. GET Students por nivel (GET)

Request a `{{apiUrl}}?level=intermediate` para filtrar por nivel.

**Captura ejemplo**:
![get\_students\_level](images/http/getStudentsLevel.png)

---

### 6. UPDATE Student (PUT)

Request a `{{apiUrl}}/2` para actualizar todos los campos de Guillermo Bazán.

* Body completo en JSON.
* Antes y después de la actualización.

**Capturas ejemplo**:
![update\_student](images/http/putStudent.png)

---

### 7. PATCH Student (PATCH)

Request a `{{apiUrl}}/2` para actualizar solo campos específicos (`Abdul Ramirez`).

**Capturas ejemplo**:
![patch\_student](images/http/patchStudent.png)

---

### 8. DELETE Student (DELETE)

Request a `{{apiUrl}}/3` para eliminar un estudiante de prueba.

**Captura ejemplo**:
![delete\_student](images/http/deleteStudent.png)

---

## 5.4 📝 Notas finales

1. Para ejecutar las pruebas:

   * Abrir `peticiones-crud.http` en VS Code.
   * Hacer clic en **Send Request** sobre cada petición.
2. Todas las variables (`@baseUrl`, `@port`, `@apiUrl`, `@ContentType`) se definen **dentro del archivo**.
3. Cada petición está separada con `###` y contiene comentarios explicativos.
4. Las capturas de pantalla deben mostrar **request y response completas**, incluyendo headers, método, URL y body.
