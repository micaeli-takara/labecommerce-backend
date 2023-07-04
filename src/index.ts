import { createProduct, createUser, product, user } from "./database";
import  express, { Request, Response} from 'express'
import cors from 'cors';
import { TUsers } from "./types";

 
const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
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

// //PRODUCTS
// const resultCreateProduct = createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação", "https://images...");
// console.table(resultCreateProduct);

// const allProducts = getAllProduct();
// console.table(allProducts);


// //PRODURAR O PRODUTO
// const produtoEncontrado = searchProductsByName("SSD gamer");
// if (produtoEncontrado) {
//   console.table(produtoEncontrado);
// } else {
//   console.log("Produto não encontrado");
// };