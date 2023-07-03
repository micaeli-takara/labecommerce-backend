"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProduct = exports.createProduct = exports.getAllUsers = exports.createUser = exports.product = exports.user = void 0;
exports.user = [
    {
        id: "u001",
        name: "Fulano",
        email: "fulano@email.com",
        password: "fulano123",
        createdAt: new Date().toISOString()
    }, {
        id: "u002",
        name: "Beltrana",
        email: "beltrana@gmail.com",
        password: "beltrana00",
        createdAt: new Date().toISOString()
    }
];
exports.product = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    }, {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
function createUser(id, name, email, password) {
    const createdAt = new Date().toISOString();
    const newUser = { id, name, email, password, createdAt };
    exports.user.push(newUser);
    return "Cadastro realizado com sucesso";
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.user;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = { id, name, price, description, imageUrl };
    exports.product.push(newProduct);
    return "Produto criado com sucesso";
}
exports.createProduct = createProduct;
function getAllProduct() {
    return exports.product;
}
exports.getAllProduct = getAllProduct;
function searchProductsByName(name) {
    const nameLowerCase = name.toLowerCase();
    const foundProduct = exports.product.find((produto) => produto.name.toLowerCase() === nameLowerCase);
    return foundProduct || null;
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map