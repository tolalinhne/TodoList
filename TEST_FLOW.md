# 🧪 Test Flow - Linear Clone

Hướng dẫn test thủ công ứng dụng Linear Clone.

---

## 📋 Chuẩn bị

```bash
cd d:\Code\Team Web\google-antigravity\new\linear-clone
npm install
npm run dev
```

Mở trình duyệt: `http://localhost:5173`

---

## 🔐 Flow 1: Authentication

### 1.1 Register (Đăng ký)
1. Truy cập `/register`
2. Điền thông tin:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `123456`
   - Confirm Password: `123456`
3. Click **Create account**
4. ✅ Expected: Chuyển về trang Login

### 1.2 Login (Đăng nhập)
1. Tại trang `/login`
2. Điền:
   - Username: `testuser`
   - Password: `123456`
3. Click **Sign in**
4. ✅ Expected: Vào Dashboard, thấy sidebar và sample tasks

### 1.3 Logout (Đăng xuất)
1. Click **Sign out** ở sidebar dưới cùng
2. ✅ Expected: Quay về trang Login

---

## 📝 Flow 2: Task Management

### 2.1 Xem danh sách Tasks
1. Sau khi login, vào Dashboard `/`
2. ✅ Expected: Thấy 3 sample tasks được tạo sẵn
3. ✅ Expected: Tasks được nhóm theo status (To Do, In Progress, Done)

### 2.2 Tạo Task mới
1. Click **New Issue** trên Header
2. Modal hiện ra, điền:
   - Title: `Test Task 1`
   - Description: `This is a test`
   - Priority: `High`
   - Category: `Work`
   - Due Date: (chọn ngày mai)
3. Click **Create Issue**
4. ✅ Expected: Modal đóng, task mới xuất hiện trong danh sách

### 2.3 Xem chi tiết Task
1. Click vào bất kỳ task card nào
2. ✅ Expected: Chuyển đến `/tasks/:id`
3. ✅ Expected: Thấy title, description, status, priority, category, due date

### 2.4 Thay đổi Status
1. Trong trang Task Detail
2. Tìm dropdown **Status** ở sidebar phải
3. Đổi từ `To Do` → `In Progress`
4. ✅ Expected: Status được cập nhật ngay lập tức
5. Click **Back to Issues**
6. ✅ Expected: Task di chuyển sang nhóm "In Progress"

### 2.5 Xóa Task
1. Vào chi tiết một task
2. Click **Delete** (nút đỏ)
3. Confirm dialog hiện ra, click OK
4. ✅ Expected: Quay về Dashboard, task đã bị xóa

---

## 🔍 Flow 3: Filters & Categories

### 3.1 Filter theo Status
1. Tại Dashboard, click các filter buttons:
   - **All** - Hiện tất cả
   - **To Do** - Chỉ hiện TODO
   - **In Progress** - Chỉ hiện IN_PROGRESS
   - **Done** - Chỉ hiện DONE
2. ✅ Expected: Danh sách tasks được lọc đúng

### 3.2 Filter theo Category
1. Click vào category ở Sidebar (Work, Personal, Shopping)
2. ✅ Expected: URL đổi thành `/?category=1`
3. ✅ Expected: Chỉ hiện tasks của category đó

---

## 💾 Flow 4: Persistence (localStorage)

### 4.1 Kiểm tra dữ liệu lưu trữ
1. Mở DevTools (F12) → Application → Local Storage
2. ✅ Expected: Thấy các keys:
   - `linear_tasks`
   - `linear_categories`
   - `linear_user`

### 4.2 Refresh page
1. Tạo vài tasks mới
2. Refresh trang (F5)
3. ✅ Expected: Dữ liệu vẫn còn nguyên

### 4.3 Clear data
1. Trong DevTools → Local Storage → Right click → Clear
2. Refresh page
3. ✅ Expected: Sample data được tạo lại

---

## ✅ Checklist tổng kết

| Feature | Test | Pass? |
|---------|------|-------|
| Register | Tạo account mới | ☐ |
| Login | Đăng nhập thành công | ☐ |
| Logout | Đăng xuất | ☐ |
| View Tasks | Xem danh sách | ☐ |
| Create Task | Tạo task mới | ☐ |
| View Detail | Xem chi tiết task | ☐ |
| Change Status | Đổi status | ☐ |
| Delete Task | Xóa task | ☐ |
| Filter Status | Lọc theo status | ☐ |
| Filter Category | Lọc theo category | ☐ |
| Data Persistence | Dữ liệu lưu sau refresh | ☐ |

---

## 🐛 Bugs to Check

- [ ] Empty state hiện khi không có tasks
- [ ] Loading spinner hiện khi đang load
- [ ] Error message hiện khi title trống
- [ ] Overdue date hiển thị màu đỏ
- [ ] Sidebar categories load đúng

---

*Happy Testing! 🎉*
