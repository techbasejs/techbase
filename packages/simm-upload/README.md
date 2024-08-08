# Simple Upload

## Main Features

1. Hỗ trợ đa nền tảng:

- Hỗ trợ cho cả trình duyệt và Node.js.
- Tương thích với các framework phổ biến như React, Vue.

2. Upload nhiều tệp cùng lúc:

- Cho phép người dùng upload nhiều tệp cùng một lúc.
- Hiển thị tiến trình upload của từng tệp.

3. Hỗ trợ các định dạng file phổ biến:

- Cho phép giới hạn loại file được upload (ví dụ: chỉ cho phép upload ảnh hoặc file PDF).
- Kiểm tra định dạng file trước khi upload.

4. Giới hạn kích thước tệp:

- Cho phép cấu hình kích thước tối đa của tệp được upload.
- Thông báo lỗi khi tệp vượt quá giới hạn.

5. Drag and Drop:

- Hỗ trợ chức năng kéo và thả file để upload.
- Tương thích với cả di động và desktop.

6. Hiển thị thông báo và lỗi:

- Thông báo khi upload thành công hoặc thất bại.
- Hiển thị các lỗi chi tiết (kích thước file quá lớn, định dạng file không hợp lệ, lỗi mạng,...). cho phép override các message

7. Tùy biến giao diện:

- Cho phép người dùng tùy chỉnh giao diện của khu vực upload file. ( có cả bao gồm preview nếu đó là ảnh )
- Hỗ trợ các theme hoặc cho phép người dùng tự định nghĩa CSS.

8. Xử lý file trước khi upload:

- Hỗ trợ resize, crop size, compress, ảnh trước khi upload.
- Cho phép mã hóa hoặc xử lý file theo nhu cầu trước khi upload.

9. Tích hợp với các dịch vụ lưu trữ:

- Hỗ trợ upload trực tiếp lên các dịch vụ lưu trữ như AWS S3, Google Cloud Storage, Azure Blob Storage. Ngoài ra có thể custom can thiệp vào logic upload.
- Cấu hình endpoint API tùy chỉnh.

## Install

Install package:

```sh
# using yarn
yarn add [your-library]

# using npm
npm install [your-library]

# using pnpm
pnpm install [your-library]
```

> Note:

## Usage

Guideline setup, usage, ...
