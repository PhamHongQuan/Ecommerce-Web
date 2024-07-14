const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var accessKey = 'F8BBA842ECF85';
var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.post("/payment", async (req, res) => {
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:3000/';
    var ipnUrl = 'https://d2fc-115-76-48-234.ngrok-free.app/callback';
    var requestType = "captureWallet";
    var amount = '1000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData ='';
    var orderGroupId ='';
    var autoCapture = true;
    var lang = 'vi';

    var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');

    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });

    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    };

    try {
        const result = await axios(options);
        const payUrl = result.data.payUrl;

        if (!payUrl) {
            return res.status(400).json({ message: "payUrl không tồn tại trong phản hồi" });
        }

        return res.status(200).json({ payUrl: payUrl });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            statusCode: 500,
            message: "server error",
            error: error.response ? error.response.data : error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
