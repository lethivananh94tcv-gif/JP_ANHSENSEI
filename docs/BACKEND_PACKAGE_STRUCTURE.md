# HƯỚNG DẪN CẤU TRÚC PACKAGE BACKEND SPRING BOOT (ANH SENSEI)

Tài liệu này hệ thống hóa toàn bộ cấu trúc Package trong nguồn backend của dự án **ANH SENSEI** từ mức độ tổng quan (Macro) đến chi tiết từng lớp bên trong (Micro), cùng các kiến thức nền tảng về Spring Boot.

---

## 📌 1. Tổng Quan Cấu Trúc Gói (Top-Level Package Architecture)

* **Gốc mã nguồn Java**: `com.anhsensei`
* **Điểm khởi chạy duy nhất**: [`AnhSenseiApplication.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/AnhSenseiApplication.java) (Chứa `@SpringBootApplication` và hàm `main()`).

Hệ thống được thiết kế theo mô hình **Modular Monolith**, phân chia thành 10 gói chính (Top-level packages):

```text
com.anhsensei
├── AnhSenseiApplication.java    # File chạy chính của ứng dụng Spring Boot
├── common                        # Gói nền tảng dùng chung (Security, Exception, Config, Response)
├── identity                      # Module Quản lý User, Roles, Authentication, JWT Token
├── curriculum                    # Module Quản lý Nội dung giáo trình (Level, Lesson, Vocab, Kanji, Grammar)
├── learning                      # Module Quản lý Tiến độ học (Progress, Activities, Streak, Favorites)
├── flashcard                     # Module Spaced Repetition, Review Queue & Flashcards
├── assessment                    # Module Ngân hàng câu hỏi, Quiz, Attempts & Tự động chấm điểm
├── media                         # Module Nội dung Đọc (Reading), Nghe (Listening) & Metadata Media
├── importing                     # Module Strict Excel Import (.xlsx Engine)
├── ai                            # Module AI Tutor, Knowledge RAG & Vector Search (pgvector)
└── operations                    # Module Cấu hình hệ thống, Audit Logs, Reminders, Notifications
```

---

## 🔍 2. Mô Tả Chi Tiết Các Package Từ Lớn Đến Bé (Macro to Micro)

### A. Gói Nền Tảng Dùng Chung (`com.anhsensei.common`)

Nhiệm vụ: Cung cấp các cấu hình hệ thống, bộ xử lý lỗi tập trung, bộ lọc bảo mật JWT và công cụ tiện ích mà **tất cả các module khác đều dùng chung**.

* 📂 `common.config`: Chứa các Lớp cấu hình hệ thống (`@Configuration`).
  * `SecurityConfig.java`: Cấu hình Spring Security filter chain, vô hiệu hóa CSRF, mở CORS, phân quyền các đường dẫn Public (`/api/v1/auth/**`) và Protected (`/api/v1/admin/**`).
  * `CorsConfig.java`: Cấu hình Cross-Origin Resource Sharing cho phép Frontend Next.js truy cập API.
  * `OpenApiConfig.java`: Tự động tạo giao diện thử nghiệm API Swagger UI tại `/api/v1/swagger-ui.html`.
* 📂 `common.security`: Bộ xử lý bảo mật và Token JWT.
  * `JwtTokenProvider.java`: Tạo, mã hóa chữ ký HMAC-SHA512, giải mã và validate Access Token.
  * `JwtAuthenticationFilter.java`: Interceptor chặn mọi HTTP Request để kiểm tra Header `Authorization: Bearer <Token>`.
* 📂 `common.exception`: Bộ xử lý ngoại lệ tập trung (Global Exception Handling).
  * `GlobalExceptionHandler.java`: Sử dụng `@RestControllerAdvice` để bắt tất cả các lỗi xảy ra trong ứng dụng và biến thành JSON chuẩn trả về cho Client.
  * `AppException.java`, `ResourceNotFoundException.java`: Các Ngoại lệ tùy chỉnh cho dự án.
* 📂 `common.response`:
  * `ApiResponse.java`: Đóng gói chuẩn đầu ra của tất cả API dạng:
    ```json
    {
      "success": true,
      "code": 200,
      "message": "Thành công",
      "data": { ... }
    }
    ```
* 📂 `common.util`: Chứa các hàm tiện ích tính toán dùng chung (DateUtils, SecurityUtils,...).

---

### B. Cấu Trúc Nạp Chuẩn Bên Trong Mỗi Module Nghiệp Vụ (`identity`, `curriculum`, `learning`,...)

Mỗi Module nghiệp vụ tuân thủ nghiêm ngặt mô hình **3 Tầng Chuẩn (Layered Architecture)** kết hợp **Domain-Driven Design (DDD)** với 5-6 gói con sau:

```text
com.anhsensei.[module_name]
├── controller (web)  --> 1. Tầng Tiếp nhận Request & Trả về Response API
├── dto               --> 2. Tầng Gói Dữ Liệu Vận Chuyển (Validation & Filtering)
├── service           --> 3. Tầng Xử lý Logic Nghiệp vụ & Transaction
├── domain            --> 4. Tầng Thực thể Cơ sở dữ liệu (JPA Entities)
├── repository        --> 5. Tầng Truy vấn Cơ sở dữ liệu (Spring Data JPA)
└── validation        --> 6. (Tùy chọn) Chứa các quy chuẩn kiểm tra dữ liệu riêng biệt
```

#### 1. 📂 `[module].controller` (hoặc `web`) — Tầng Cửa Ngõ API
* **Nhiệm vụ**: Tiếp nhận Request từ Client, kích hoạt validation đầu vào, gọi Service xử lý và trả về HTTP Response.
* **Annotation Spring Boot thường dùng**:
  * `@RestController`: Đánh dấu class trả về dữ liệu dạng JSON.
  * `@RequestMapping("/api/v1/...")`: Định nghĩa đường dẫn gốc.
  * `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Ánh xạ các HTTP Method.
  * `@Valid`: Kích hoạt tự động kiểm tra quy tắc validation trong Request DTO.

#### 2. 📂 `[module].dto` — Tầng Vận Chuyển Dữ Liệu
* **Nhiệm vụ**: Chứa các Java Class đóng gói dữ liệu đi vào (Request) và đi ra (Response). Giúp giấu các cột bảo mật trong DB (như `password_hash`).
* **Phân loại**:
  * `[Feature]Request.java`: Chứa tham số Client gửi lên kèm Annotation Validate (`@NotBlank`, `@Email`, `@Min`, `@Size`).
  * `[Feature]Response.java`: Chứa thông tin an toàn dùng hiển thị trên màn hình Frontend.

#### 3. 📂 `[module].service` — Tầng Logic Nghiệp Vụ (Bộ Não)
* **Nhiệm vụ**: Chứa toàn bộ câu lệnh kiểm tra điều kiện, tính toán điểm số, mã hóa mật khẩu, kiểm tra quyền hạn, điều phối thao tác ghi DB và xử lý giao dịch.
* **Annotation Spring Boot thường dùng**:
  * `@Service`: Đánh dấu đây là một Spring Managed Bean chứa logic.
  * `@Transactional`: Đảm bảo tính toàn vẹn giao dịch (Tự động Rollback nếu có lỗi xảy ra).

#### 4. 📂 `[module].domain` (hoặc `model` / `entity`) — Tầng Thực Thể Database
* **Nhiệm vụ**: Ánh xạ trực tiếp 1-1 giữa Java Class và Bảng dữ liệu trong PostgreSQL.
* **Annotation JPA / Hibernate thường dùng**:
  * `@Entity`: Đánh dấu class đại diện cho 1 Bảng SQL.
  * `@Table(name = "users")`: Chỉ định tên bảng thực tế trong DB.
  * `@Id` + `@GeneratedValue(strategy = GenerationType.IDENTITY)`: Khai báo Khóa chính (Primary Key) tự tăng.
  * `@Column(name = "email", nullable = false)`: Chỉ định thuộc tính của Cột.
  * `@ManyToOne`, `@OneToMany`: Thiết lập mối quan hệ Nối bảng (Foreign Key).

#### 5. 📂 `[module].repository` — Tầng Truy Vấn Database
* **Nhiệm vụ**: Giao tiếp trực tiếp với PostgreSQL thông qua Spring Data JPA mà không cần viết lệnh SQL thủ công.
* **Cách thức hoạt động**:
  * Kế thừa `JpaRepository<Entity, Long>`.
  * **Derived Query Methods**: Tự động sinh câu lệnh SQL từ tên hàm Java.
    * *Ví dụ trong [`GrammarPointRepository.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/curriculum/repository/GrammarPointRepository.java)*:
      `findByLesson_LessonIdOrderBySortOrderAsc(Long lessonId)`
      $\rightarrow$ Tự động chuyển thành SQL: `SELECT * FROM grammar_points WHERE lesson_id = ? ORDER BY sort_order ASC`.
  * **Custom Query (`@Query`)**: Viết câu lệnh JPQL hoặc Native SQL tùy chỉnh cho các truy vấn phức tạp.

---

## 🧠 3. Kiến Thức Nền Tảng Spring Boot Cần Nắm Cho Dự Án

### 1. IoC Container & Dependency Injection (DI)
* **IoC (Inversion of Control)**: Spring Boot chịu trách nhiệm quản lý việc khởi tạo và quản lý vòng đời của các Object (gọi là **Spring Beans**).
* **Dependency Injection (DI)**: Thay vì tự viết `new AuthService()`, bạn chỉ cần khai báo `private final AuthService authService;` kèm `@RequiredArgsConstructor` của Lombok, Spring sẽ tự động tiêm (inject) instance vào cho bạn.

### 2. Spring Security & Stateless JWT Authentication
* Dự án chạy theo cơ chế **Stateless** (Không dùng HTTP Session trên server).
* Khi đăng nhập thành công, Server trả về JWT Token. Mọi request sau đó Client tự đính kèm Token trong Header để Server xác thực.

### 3. Vòng Đời Của 1 Request (Request Lifecycle)

```text
[Client Browser] 
      │ (HTTP Request qua Port 80)
      ▼
[Nginx Reverse Proxy] 
      │ (Chuyển tiếp đến Port 8080 /api/v1/...)
      ▼
[Spring Security Filter Chain] --> Kiểm tra JWT Token & Cấp Quyền
      │
      ▼
[DispatcherServlet] --> Điều hướng đến đúng Controller
      │
      ▼
[Controller] --> Validate Request DTO
      │
      ▼
[Service] --> Xử lý Logic Nghiệp vụ & Quản lý Transaction
      │
      ▼
[Repository] --> Thực thi câu lệnh SQL qua Spring Data JPA
      │
      ▼
[PostgreSQL Database]
```

---

📌 **Các file ví dụ chuẩn trong codebase để đọc thử**:
* File Controller mẫu: [`AuthController.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/identity/controller/AuthController.java)
* File Service mẫu: [`AuthService.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/identity/service/AuthService.java)
* File Repository mẫu: [`GrammarPointRepository.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/curriculum/repository/GrammarPointRepository.java)
* File DTO mẫu: [`LoginRequest.java`](file:///c:/Users/Lenovo%20LEGION%205/OneDrive/Documents/JP_ANHSENSEI/backend/src/main/java/com/anhsensei/identity/dto/LoginRequest.java)
