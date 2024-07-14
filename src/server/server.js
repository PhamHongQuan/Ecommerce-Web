const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

let users = [];
let carts =[];
let orders =[];
let products = [];
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Tên người dùng đã tồn tại.' });
    }

    const user = { id: Date.now(), username, email, password };
    carts.push({username: user.username, products: []});
    users.push(user);
    console.log('User registered:', user);
    console.log('Updated carts:', JSON.stringify(carts, null, 2));

    res.status(201).json({ message: 'Đăng ký thành công!', user });
});
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Username sai hoặc mật khẩu sai.' });
    }
    const userCartIndex = carts.findIndex(item=>item.username===username);
    const cart = carts[userCartIndex];
    res.status(200).json({ message: 'Đăng nhập thành công!', user ,cart});
});

app.post('/api/cart/add', (req, res) => {
    const { username, product } = req.body;


    const userCartIndex = carts.findIndex(cart => cart.username === username);
    if (userCartIndex !== -1) {
        const productsUser = carts[userCartIndex].products;
        const existProductIndex = productsUser.findIndex(
            item => item.id === product.id && item.size === product.size && item.color === product.color);

        if (existProductIndex >= 0) {
            carts[userCartIndex].products[existProductIndex].quantity += product.quantity ;
        } else {
            carts[userCartIndex].products.push({ ...product, quantity: product.quantity });
        }
    }

    console.log('Updated carts:', JSON.stringify(carts, null, 2));

    console.log('Product:', product);

    res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });
});

app.post('/api/cart/delete', (req, res) => {
    const { username, product } = req.body;


    const userCartIndex = carts.findIndex(cart => cart.username === username);
    if (userCartIndex !== -1) {
        const productsUser = carts[userCartIndex].products;
        const updatedProducts = productsUser.filter(item => !(item.id === product.id && item.color === product.color && item.size === product.size));
        carts[userCartIndex].products = updatedProducts;

    }

    console.log('Updated carts:', JSON.stringify(carts, null, 2));

    console.log('Product:', product);

    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
});

app.post('/api/cart/increase', (req, res) => {
    const { username, product } = req.body;

    const userCartIndex = carts.findIndex(cart => cart.username === username);
    if (userCartIndex !== -1) {
        const productsUser = carts[userCartIndex].products;
        const existProductIndex = productsUser.findIndex(
            item => item.id === product.id && item.size === product.size && item.color === product.color);

        if (existProductIndex >= 0) {
            carts[userCartIndex].products[existProductIndex].quantity += 1 ;
        }
    }

    console.log('Updated carts:', JSON.stringify(carts, null, 2));

    console.log('Product:', product);

    res.status(200).json({ message: 'Increase' });
});

app.post('/api/cart/decrease', (req, res) => {
    const { username, product } = req.body;

    const userCartIndex = carts.findIndex(cart => cart.username === username);
    if (userCartIndex !== -1) {
        const productsUser = carts[userCartIndex].products;
        const existProductIndex = productsUser.findIndex(
            item => item.id === product.id && item.size === product.size && item.color === product.color);

        if (existProductIndex >= 0 &&  carts[userCartIndex].products[existProductIndex].quantity>= 1) {
            carts[userCartIndex].products[existProductIndex].quantity -= 1 ;
        }
    }

    console.log('Updated carts:', JSON.stringify(carts, null, 2));

    console.log('Product:', product);

    res.status(200).json({ message: 'Decrease' });
});

app.post('/api/user/resetpassword', async (req, res) => {
    const {username, newPassword} = req.body;
    const userIndex = users.findIndex(user => user.username === username);
    if (userIndex != -1) {
        const user = users[userIndex];
        if (!user) {
            return res.status(404).json({message: 'Không tìm thấy user'});
        } else {
            if (user.password === newPassword) {
                return res.status(400).json({message: 'Mật khẩu mới trùng với mật khẩu cũ!'});
            } else {
                try {
                    users[userIndex].password = newPassword;
                    res.status(200).json({message: 'Password updated successfully'});
                } catch (error) {
                    res.status(500).json({message: 'Failed to update password'});
                }
            }
        }
    }
    console.log('Updated carts:', JSON.stringify(users));

});

app.post('/api/order/add', async (req, res) => {
    const {username, order,product} = req.body;
    orders.push({username:username, order_address:order, product: product});

    console.log('Updated carts:', JSON.stringify(orders, null, 2));

    console.log('Product:', product);
    console.log('Order: ',order);
    res.status(200).json({ message: 'Thêm sản phẩm vào giỏ hàng thành công' });

});
app.get('/', (req, res) => {
    res.send('Welcome to the server!');
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
