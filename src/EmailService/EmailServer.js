const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'qp57744@gmail.com',
        pass: 'muxd zvjv ajbj owzx',
    },
});

app.post('/send-email', (req, res) => {
    const { to_name, reset_link, subject } = req.body;

    let mailOptions = {
        from: 'qp57744@gmail.com',
        to: to_name,
        subject: subject,
        html: `<p>Click vào liên kết sau để đặt lại mật khẩu của bạn: <a href="${reset_link}">Đặt lại mật khẩu</a></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ error: error.toString() });
        }
        res.status(200).json({ message: 'Email đã được gửi thành công' });
    });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
