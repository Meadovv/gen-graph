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

### Các cấu hình chính

### `FIT_VIEW: true`

Khớp đồ thị vào màn hình. Ví dụ giá trị: `true`

### `
    NODE_NUMBER_RANGE: {
        MIN: 1,
        MAX: 1000
    }
`

Giá trị lớn nhất và nhỏ nhất của số node của đồ thị.

### `
    WEIGHT_NUMBER_RANGE: {
        MIN: -20,
        MAX: 20
    }
`

Giá trị lớn nhất và nhỏ nhất của trọng số của cạnh

### `FIT_VIEW: true`

Khớp đồ thị vào màn hình. Ví dụ giá trị: `true`


### Các cấu hình về hình ảnh

### `NODE_SIZE: 6`

Độ lớn của node. Ví dụ giá trị: `6`

### `NODE_LABEL_FONT_SIZE: 16`

Độ lớn phông của tên node. Ví dụ giá trị: `16`

### `LINK_WIDTH: 1`

Độ rộng của cạnh. Ví dụ giá trị: `1`

### `LINK_LABEL_FONT_SIZE: 16`

Độ lớn phông của trọng số cạnh. Ví dụ giá trị: `16`

### `DISTANCE_FROM_LABEL_AND_LINK: 3`

Khoảng cách giữa trọng số và cạnh. Ví dụ giá trị: `3`

### Các cấu hình màu sắc

### `NODE_COLOR: "#00308F"`

Màu của node, ví dụ giá trị ![#00308F](https://placehold.co/15x15/00308F/00308F.png) `#00308F`

### `NODE_IN_PATH_COLOR: "#FF7F50"`

Màu của các node trên đường đi ngắn nhất, ví dụ giá trị ![#FF7F50](https://placehold.co/15x15/FF7F50/FF7F50.png) `#FF7F50`

### `SOURCE_NODE_COLOR: "#006A4E"`

Màu của node bắt đầu, ví dụ giá trị ![#006A4E](https://placehold.co/15x15/006A4E/006A4E.png) `#006A4E`

### `TARGET_NODE_COLOR: "#AA0000"`

Màu của node kết thúc, ví dụ giá trị ![#AA0000](https://placehold.co/15x15/AA0000/AA0000.png) `#AA0000`

### `NODE_LABEL_FONT_COLOR: "#ffffff"`

Màu của phông chữ của node, ví dụ giá trị ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff`

### `LINK_COLOR: "#72A0C1"`

Màu của cạnh, ví dụ giá trị ![#72A0C1](https://placehold.co/15x15/72A0C1/72A0C1.png) `#72A0C1`

### `LINK_IN_PATH_COLOR: "#FF4500"`

Màu của cạnh trong đường đi ngắn nhất, ví dụ giá trị ![#FF4500](https://placehold.co/15x15/FF4500/FF4500.png) `#FF4500`

### `LINK_LABEL_FONT_COLOR: "#000000"`

Màu phông chữ của cạnh, ví dụ giá trị ![#000000](https://placehold.co/15x15/000000/000000.png) `#000000`

