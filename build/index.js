"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const resultCreateUser = (0, database_1.createUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99");
console.table(resultCreateUser);
const allUsers = (0, database_1.getAllUsers)();
console.table(allUsers);
const resultCreateProduct = (0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://images...");
const allProducts = (0, database_1.getAllProduct)();
const produtoEncontrado = (0, database_1.searchProductsByName)("SSD gamer");
if (produtoEncontrado) {
    console.table(produtoEncontrado);
}
else {
    console.log("Produto não encontrado");
}
//# sourceMappingURL=index.js.map