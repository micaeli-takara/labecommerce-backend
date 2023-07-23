"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/users", (req, res) => {
    try {
        const users = (0, database_1.getAllUsers)();
        res.status(200).send(users);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});
app.get("/products", (req, res) => {
    try {
        const name = req.query.name;
        console.log(name, "aqui um name");
        if (name) {
            if (name.length < 2) {
                res.status(400);
                throw new Error("O 'name' deve possuir pelo menos um caractere.");
            }
            const products = (0, database_1.searchProductsByName)(name);
            if (products.length === 0) {
                res.status(404);
                throw new Error("Produto não encontrado.");
            }
            res.send(products);
        }
        const products = (0, database_1.getAllProduct)();
        res.status(200).send(products);
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
});
app.get("/product/search", (req, res) => {
    const name = req.query.name;
    const result = database_1.product.filter((products) => products.name.toLowerCase().includes(name.toLowerCase()));
    res.status(200).send(result);
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userWithId = database_1.user.find(users => users.id === id);
        if (userWithId) {
            throw new Error("Já existe um usuário com o mesmo ID.");
        }
        const userWithEmail = database_1.user.find(users => users.email === email);
        if (userWithEmail) {
            throw new Error("Já existe um usuário com o mesmo e-mail.");
        }
        const result = (0, database_1.createUser)(id, name, email, password);
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const imageUrl = req.body.imageUrl;
        const productWithId = database_1.product.find(products => products.id === id);
        if (productWithId) {
            throw new Error("Já existe um produto com o mesmo ID.");
        }
        const result = (0, database_1.createProduct)(id, name, price, description, imageUrl);
        res.status(201).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    const idToDeleteUser = req.params.id;
    try {
        const userIndex = database_1.user.findIndex((user) => user.id === idToDeleteUser);
        if (userIndex >= 0) {
            database_1.user.splice(userIndex, 1);
            res.status(200).send("Item deletado com sucesso");
        }
        else {
            res.status(404).send("Usuário não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    const idToDeleteProduct = req.params.id;
    try {
        const productIndex = database_1.product.findIndex((product) => product.id === idToDeleteProduct);
        if (productIndex >= 0) {
            database_1.product.splice(productIndex, 1);
            res.status(200).send("Item deletado com sucesso");
        }
        else {
            res.status(404).send("Produto não encontrado");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const idToEdit = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newDescription = req.body.description;
        const newImageUrl = req.body.imageUrl;
        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400);
                throw new Error("O preço deve ser do tipo number");
            }
            if (newPrice < 0) {
                res.status(400);
                throw new Error("O preço deve ser maior ou igual a zero");
            }
        }
        const productIndex = database_1.product.findIndex((product) => product.id === idToEdit);
        if (productIndex === -1) {
            res.status(404);
            throw new Error("Produto não encontrado");
        }
        const productToUpdate = database_1.product[productIndex];
        productToUpdate.id = newId || productToUpdate.id;
        productToUpdate.name = newName || productToUpdate.name;
        productToUpdate.description = newDescription || productToUpdate.description;
        productToUpdate.imageUrl = newImageUrl || productToUpdate.imageUrl;
        if (newPrice !== undefined) {
            productToUpdate.price = newPrice;
        }
        res.status(200).send("Atualização realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
//# sourceMappingURL=index.js.map