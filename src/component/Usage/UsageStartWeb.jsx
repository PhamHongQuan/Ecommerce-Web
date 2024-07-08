import React from 'react';

function UsageStartWeb() {
    return (
        <>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 1: Vào Terminal nhập: "cd/src/server" để chuyển đến thư mục server.</p>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 2: Tại thư mục server, nhập câu lệnh: "json-server db.json --port 9000 --watch" để chạy file db.json trên port 9000.</p>
            <p className="sub-item-box-u" style={{ color: 'white' }}>Bước 3: Sau khi thành công, mở 1 Terminal khác và nhập: "npm start" để chạy trên trình duyệt.</p>
        </>
    );
}

export default UsageStartWeb;