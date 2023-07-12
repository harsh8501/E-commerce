const express = require('express');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const cors = require('cors');
const Jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());
const jwtkey = "e-comm"        //secret-key

app.post('/register', VerifyToken, async (req, resp) => {
    let user = new User(req.body)
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtkey, { expiresIn: '1500h' }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong, Please try again after sometime!!" });
        }
        resp.send({ result, auth: token });
    })
})

app.post('/login', VerifyToken, async (req, resp) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select('-password');
        if (user) {
            Jwt.sign({ user }, jwtkey, { expiresIn: '1500h' }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try again after sometime!!" });
                }
                resp.send({
                    message: "Profile accessed",
                    token
                })
            })
        } else {
            resp.send({ result: "No User Found" });
        }
    } else {
        resp.status(403).send({ result: "Please Enter Password also" });
    }
})

app.post('/add', async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
})

app.put('/update/:id', async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    resp.send(result);
})

app.get('/products', async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No Products Found" })
    }
})

app.get('/product/:id', async (req, resp) => {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
        resp.send(product);
    } else {
        resp.send({ result: "No Record Found" });
    }
})

app.delete('/delete/:id', async (req, resp) => {
    let result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
})

app.get('/search/:key', async (req, resp) => {
    let result = await Product.find(
        {
            '$or': [
                { name: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
                { company: { $regex: req.params.key } }
            ]
        }
    )
    resp.send(result);
})

function VerifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, jwtkey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please Provide valid token" });
            } else {
                next();
            }
        })
    } else {
        resp.status(403).send({ result: "Please add token with headers" })
    }
}

app.listen(7006);