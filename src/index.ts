import { createProduct, createUser, getAllProduct, getAllUsers, searchProductsByName } from "./database";

//USERS
const resultCreateUser = createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99");
console.table(resultCreateUser);

const allUsers = getAllUsers();
console.table(allUsers); 


//PRODUCTS
const resultCreateProduct = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://images...");
console.table(resultCreateProduct);

const allProducts = getAllProduct();
console.table(allProducts);


//PRODURAR O PRODUTO
const produtoEncontrado = searchProductsByName("SSD gamer");
if (produtoEncontrado) {
  console.table(produtoEncontrado);
} else {
  console.log("Produto não encontrado");
}
