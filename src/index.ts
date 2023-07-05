import { createProduct, createUser, product, user } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});


app.get("/users", (req: Request, res: Response) => {
  res.status(200).send(user);
})


app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(product);
})


app.get("/product/search", (req: Request, res: Response) => {
  const name = req.query.name as string;

  const result = product.filter(
    (products) => products.name.toLowerCase().includes(name.toLowerCase()));

    res.status(200).send(result);
})


app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string
  const name = req.body.name as string
  const email = req.body.email as string
  const password = req.body.password as string

  const result = createUser(id, name, email, password);

  res.status(201).send(result);
})


app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string
  const name = req.body.name as string
  const price = req.body.price as number
  const description = req.body.description as string
  const imageUrl = req.body.imageUrl as string

  const result = createProduct(id, name, price, description, imageUrl);

  res.status(201).send(result);
})


app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDeleteUser = req.params.id;

  const userIndex = user.findIndex((user) => user.id === idToDeleteUser);

  if (userIndex >= 0) {
    user.splice(userIndex, 1)
  };

  res.status(200).send("Item deletado com sucesso");
})


app.delete("/products/:id", (req: Request, res: Response) => {
  const idToDeleteProduct = req.params.id

  const productIndex = product.findIndex((product) => product.id === idToDeleteProduct)

  if (productIndex >= 0) {
    product.splice(productIndex, 1)
  }

  res.status(200).send("Item deletado com sucesso");
})

app.put("/products/:id", (req: Request, res: Response) => {
  const idToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined

  const products = product.find((products) => products.id === idToEdit)

  if(products) {
    products.id = newId || products.id;
    products.name = newName || products.name;
    products.description = newDescription || products.description;
    products.imageUrl = newImageUrl || products.imageUrl;

    products.price = isNaN(Number(newPrice)) ? products.price : newPrice as number
  }

  res.status(200).send("Atualização realizada com sucesso")
})





// //PRODUCTS
// const resultCreateProduct = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://images...");
// console.table(resultCreateProduct);

// const allProducts = getAllProduct();
// console.table(allProducts);


// //PRODURAR O PRODUTO
// const produtoEncontrado = searchProductsByName("SSD gamer");
//
// if (result) {
//   res.status(200).send(result);
// } else {
//   res.status(404).send("Produto não encontrado");
// };