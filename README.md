# BÀI THỰC HÀNH LAB 05: QUẢN LÝ BÀI VIẾT, LƯU TRỮ ASYNCSTORAGE & CHỌN ẢNH AVATAR (REACT NATIVE EXPO)

Dự án ứng dụng di động xây dựng bằng **React Native & Expo**, đáp ứng đầy đủ 100% các tiêu chí và yêu cầu kỹ thuật của bài tập:
1. **Posts (Gọi API & hiển thị FlatList)** (25%)
2. **Favorite (Đánh dấu yêu thích & lưu trữ AsyncStorage)** (30%)
3. **Favorites Screen (Màn hình đọc & hiển thị bài viết yêu thích từ AsyncStorage)** (20%)
4. **Avatar (Tích hợp thư viện Image Picker chọn ảnh từ thiết bị & lưu URI)** (25%)

---

## 👨‍💻 Thông tin sinh viên & Dự án
- **Họ và tên**: Nguyễn Đăng Vĩnh
- **Môn học**: Lập trình thiết bị di động (React Native)
- **Công nghệ chính**: React Native 0.88, Expo SDK 58, `@react-native-async-storage/async-storage`, `expo-image-picker`, `@expo/vector-icons`
- **GitHub Repository**: [https://github.com/nguyendangvinh/lab05-posts-favorites](https://github.com/nguyendangvinh/lab05-posts-favorites)

---

## 📱 1. Các tính năng chính của ứng dụng

### 1.1. Posts (Hiển thị danh sách từ API)
- Gọi Public API `https://jsonplaceholder.typicode.com/posts?_limit=20` để tải chính xác **20 bài viết**.
- Tối ưu hiệu năng hiển thị bằng thành phần **`FlatList`**.
- Có cơ chế **Pull-to-refresh (`RefreshControl`)** để làm mới dữ liệu.
- Tích hợp thanh tìm kiếm bài viết theo tiêu đề hoặc `#ID` và các nút lọc nhanh (`Tất cả`, `Đã thích`, `Chưa thích`).
- Có dữ liệu dự phòng (Fallback resilience) giúp ứng dụng hoạt động ổn định và mượt mà ngay cả khi mất mạng.

### 1.2. Favorite (Đánh dấu yêu thích & AsyncStorage)
- Người dùng có thể nhấn nút **Ngôi sao (Star / Favorite)** ở bất kỳ bài viết nào để thêm hoặc hủy yêu thích.
- **Lưu trữ bền vững (Local Persistence)**: Danh sách bài viết yêu thích được tự động chuyển thành JSON và lưu vào thiết bị bằng **`AsyncStorage`** qua key `@lab05_favorites`.
- Có Toast thông báo phản hồi thao tác tức thì và badge số lượng đếm tự động cập nhật trên thanh điều hướng.

### 1.3. Favorites Screen (Màn hình danh sách yêu thích)
- Màn hình/tab riêng biệt tự động đọc danh sách bài viết đã lưu từ `AsyncStorage` mỗi khi khởi chạy ứng dụng.
- Hiển thị danh sách bằng `FlatList`.
- Người dùng có thể bỏ thích bất kỳ bài viết nào trực tiếp tại màn hình này.
- Có tính năng **"Xóa tất cả"** kèm hộp thoại Modal xác nhận an toàn.
- Thiết kế trạng thái rỗng (`EmptyState`) đẹp mắt cùng nút tắt dẫn sang tab khám phá bài viết.

### 1.4. Avatar (Chọn ảnh từ thiết bị với Image Picker)
- Tích hợp thư viện chuẩn **`expo-image-picker`**.
- Hỗ trợ chọn ảnh từ thư viện thiết bị (`launchImageLibraryAsync`) và chụp ảnh trực tiếp từ Camera (`launchCameraAsync`).
- Lưu trữ đường dẫn ảnh (`URI`) vào bộ nhớ cục bộ bằng **`AsyncStorage`** qua key `@lab05_avatar_uri`.
- Hiển thị ảnh đại diện Avatar tròn lớn tại màn hình Profile và ảnh thu nhỏ (Mini Avatar) trên thanh Header ở tất cả các màn hình.
- Có nút đặt lại ảnh đại diện về mặc định.

---

## 📂 2. Cấu trúc thư mục dự án

```text
Lab05/
├── assets/                       # Ảnh icon, splash screen và tài nguyên
├── src/
│   ├── api/
│   │   └── postsApi.js           # Xử lý fetch API 20 bài viết từ JSONPlaceholder
│   ├── components/
│   │   ├── BottomTabBar.js       # Thanh điều hướng Bottom Tab có Badge & Mini Avatar
│   │   ├── EmptyState.js         # Giao diện thông báo khi danh sách rỗng
│   │   ├── Header.js             # Thanh tiêu đề trên cùng có avatar & số lượng star
│   │   ├── PostCard.js           # Thẻ hiển thị bài viết với nút Star/Unstar
│   │   └── Toast.js              # Thông báo nổi phản hồi thao tác người dùng
│   ├── context/
│   │   └── AppContext.js         # Quản lý State toàn cục & đồng bộ với AsyncStorage
│   ├── screens/
│   │   ├── FavoritesScreen.js    # Màn hình hiển thị các bài viết đã lưu trong AsyncStorage
│   │   ├── PostsScreen.js        # Màn hình FlatList 20 bài viết từ API + Tìm kiếm & Lọc
│   │   └── ProfileScreen.js      # Màn hình chọn ảnh Avatar (Image Picker) & Thống kê
│   ├── services/
│   │   └── storageService.js     # Đóng gói thao tác CRUD AsyncStorage (@react-native-async-storage)
│   └── styles/
│       └── theme.js              # Design token: Màu sắc, khoảng cách, bo góc, bóng mờ
├── App.js                        # Điểm khởi chạy chính & tích hợp MainNavigator
├── app.json                      # Cấu hình Expo và quyền truy cập thư viện ảnh (Image Picker)
├── index.js                      # Đăng ký root component Expo
├── package.json                  # Cấu hình dependencies
└── README.md                     # Tài liệu hướng dẫn cài đặt và kịch bản video demo
```

---

## 🚀 3. Hướng dẫn chạy dự án

### Bước 1: Cài đặt thư viện (nếu chưa cài)
```bash
npm install
```

### Bước 2: Khởi chạy môi trường phát triển
- **Chạy trên trình duyệt Web (Rất tiện lợi để test nhanh & quay video)**:
  ```bash
  npm run web
  ```
  *(Ứng dụng sẽ tự động mở trên `http://localhost:8081`)*

- **Chạy trên thiết bị di động (Expo Go)**:
  ```bash
  npm run start
  ```
  *Mở ứng dụng Expo Go trên điện thoại Android hoặc iOS để quét mã QR.*

- **Chạy trên Android Emulator**:
  ```bash
  npm run android
  ```

---

## 🎬 4. Kịch bản quay Video Demo (Thời lượng 60 – 90 giây)

| Thời gian | Phân đoạn | Hành động trên màn hình | Lời thuyết minh gợi ý |
| :--- | :--- | :--- | :--- |
| **00:00 – 00:20** | **1. Màn hình Posts (API & FlatList)** | - Mở ứng dụng, hiển thị Header và danh sách 20 bài viết được tải từ `jsonplaceholder.typicode.com`.<br>- Kéo vuốt FlatList mượt mà.<br>- Thử kéo xuống để kích hoạt `Pull-to-refresh`.<br>- Nhập từ khóa tìm kiếm và bấm nút lọc "Tất cả / Đã thích". | *"Xin chào thầy cô/các bạn, đây là ứng dụng Lab 05. Đầu tiên là màn hình Posts hiển thị 20 bài viết được tải trực tiếp từ JSONPlaceholder API qua FlatList, có hỗ trợ tìm kiếm và pull-to-refresh."* |
| **00:20 – 00:40** | **2. Thao tác Favorite (AsyncStorage)** | - Nhấn vào biểu tượng ngôi sao ở các bài viết số **#1, #3, #7**.<br>- Biểu tượng đổi sang màu vàng cam (⭐) tức thì, hiển thị Toast "Đã thêm vào mục yêu thích".<br>- Badge số lượng trên Tab Bar tăng từ `0` lên `3`. | *"Tiếp theo là tính năng Star/Favorite. Khi nhấn vào ngôi sao ở bất kỳ bài viết nào, dữ liệu sẽ được lưu tự động vào bộ nhớ cục bộ bằng AsyncStorage và hiển thị Toast thông báo."* |
| **00:40 – 01:05** | **3. Màn hình Favorites Screen** | - Nhấn chuyển sang Tab **"Yêu thích"** (⭐).<br>- Màn hình đọc và hiển thị chính xác các bài viết đã được lưu trong AsyncStorage.<br>- Thử bỏ thích 1 bài viết.<br>- Tải lại hoặc mở lại ứng dụng để chứng minh dữ liệu vẫn được lưu nguyên vẹn từ AsyncStorage. | *"Sang Tab Yêu thích, danh sách các bài viết đã lưu từ AsyncStorage được hiển thị đầy đủ. Thao tác bỏ thích hoặc tải lại app thì dữ liệu vẫn được lưu trữ bền vững."* |
| **01:05 – 01:30** | **4. Chọn ảnh Avatar (Image Picker)** | - Chuyển sang Tab **"Tài khoản"** (👤).<br>- Nhấn nút **"Chọn ảnh từ thư viện thiết bị"** (hoặc biểu tượng camera).<br>- Trình chọn ảnh của hệ thống mở ra, chọn 1 bức ảnh.<br>- Ảnh đại diện lập tức cập nhật lên avatar tròn lớn và icon thu nhỏ trên Header.<br>- Đường dẫn URI được lưu bền vững vào AsyncStorage. | *"Cuối cùng là tính năng đổi ảnh Avatar bằng thư viện Image Picker. Người dùng chọn ảnh từ thiết bị, ảnh sẽ được hiển thị ngay lập tức và đường dẫn URI được lưu vào AsyncStorage."* |

---

## 💯 5. Tiêu chí đánh giá bài tập (Bảng kiểm tra)

| Tiêu chí | Trọng số | Trạng thái | Chi tiết triển khai |
| :--- | :---: | :---: | :--- |
| **Gọi API và hiển thị FlatList** | **25%** | ✅ Đạt | `postsApi.js` fetch 20 bài từ `jsonplaceholder.typicode.com/posts?_limit=20`, `PostsScreen.js` render bằng `FlatList` với `RefreshControl` |
| **Xử lý lưu trữ AsyncStorage** | **30%** | ✅ Đạt | `storageService.js` sử dụng `@react-native-async-storage/async-storage` lưu và đồng bộ danh sách bài viết yêu thích (`@lab05_favorites`) |
| **Tích hợp Image Picker (Chọn ảnh)** | **25%** | ✅ Đạt | `expo-image-picker` tích hợp tại `ProfileScreen.js`, lưu `URI` vào AsyncStorage (`@lab05_avatar_uri`), hiển thị avatar ở Profile và Header |
| **Tổng thể (Giao diện, luồng, code)** | **20%** | ✅ Đạt | Giao diện hiện đại theo design system chuẩn, kiến trúc mã nguồn phân tầng rõ ràng (api, components, context, screens, services, styles) |
