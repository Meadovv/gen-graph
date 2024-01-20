# MÔ PHỎNG MỘT SỐ THUẬT TOÁN TÌM ĐƯỜNG ĐI NGẮN NHẤT

Dự án này mô tả một số thuật toán tìm đường đi ngắn nhất bằng cách sử dụng một đồ thị đã được tạo trước.

## Quan trọng

Khi bạn mới clone dự án này từ github, bạn cần chạy những lệnh sau trong thư mục dự án:

### `npm run install-client`

Cài đặt các thư viện liên quan cho client.

### `npm run install-server`

Cài đặt các thư viện liên quan cho server.

## Các lệnh khả dụng

Trong thư mục dự án, bạn có thể chạy:

### `npm run app`

Chạy ứng dụng ở chế độ phát triển.\
Mở [http://localhost:3000](http://localhost:3000) để xem nó trong trình duyệt của bạn.

Trang sẽ tải lại khi bạn thực hiện thay đổi.\
Bạn cũng có thể thấy bất kỳ lỗi nào trong console.

**Lưu ý**\
Bạn phải cài đặt các thư viện liên quan dành cho cả client và server trước khi chạy câu lệnh này.\
Môi trường phát triển của bạn phải có [Nodejs](https://nodejs.org/en/download) với phiên bản tối thiểu v18.0.0.

## Cấu hình dự án

Bạn hãy tìm tới file config.js với đường dẫn ./src/Config/config.js\
Tại đây, bạn có thể chỉnh sửa một số cấu hình sau:

### `NODE_COLOR: "#00308F"`

Màu của node, ví dụ giá trị ![#00308F](https://placehold.co/15x15/00308F/00308F.png) `#00308F`

### `NODE_IN_PATH_COLOR: "#FF7F50"`

Màu của các node trên đường đi ngắn nhất, ví dụ giá trị ![#FF7F50](https://placehold.co/15x15/FF7F50/FF7F50.png) `#FF7F50`

### `SOURCE_NODE_COLOR: "#006A4E"`

Màu của node bắt đầu, ví dụ giá trị ![#006A4E](https://placehold.co/15x15/006A4E/006A4E.png) `#006A4E`

### `TARGET_NODE_COLOR: "#AA0000"`

Màu của node bắt đầu, ví dụ giá trị ![#AA0000](https://placehold.co/15x15/AA0000/AA0000.png) `#AA0000`

### `NODE_LABEL_FONT_COLOR: "#ffffff"`

Màu của phông chữ của node, ví dụ giá trị ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff`

### `LINK_COLOR: "#72A0C1"`

Màu của cạnh, ví dụ giá trị ![#72A0C1](https://placehold.co/15x15/72A0C1/72A0C1.png) `#72A0C1`

