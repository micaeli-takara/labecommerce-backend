import { createProduct, createUser, getAllProduct, getAllUsers, product, searchProductsByName, user } from "./database";
import express, { Request, Response } from 'express'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});


app.get("/users", (req: Request, res: Response) => {
  try {
    const users = getAllUsers();
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error)
    if (res.statusCode === 200) {
      res.status(500)
    }
    res.send(error.message)

  }
})


app.get("/products", (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    console.log(name, "aqui um name")

    if (name) {

      if (name.length < 2) {
        res.status(400)
        throw new Error("O 'name' deve possuir pelo menos um caractere.");
      }

      const products = searchProductsByName(name);

      if (products.length === 0) {
        res.status(404)
        throw new Error("Produto não encontrado.");
      }

      res.send(products);
    }

    const products = getAllProduct();
    res.status(200).send(products);

  } catch (error: any) {
    console.log(error)
    res.send(error.message)
  }
})


app.get("/product/search", (req: Request, res: Response) => {
  const name = req.query.name as string;

  const result = product.filter(
    (products) => products.name.toLowerCase().includes(name.toLowerCase()));

  res.status(200).send(result);
})


app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string


    const userWithId = user.find(users => users.id === id);
    if (userWithId) {
      throw new Error("Já existe um usuário com o mesmo ID.");
    }

    const userWithEmail = user.find(users => users.email === email);
    if (userWithEmail) {
      throw new Error("Já existe um usuário com o mesmo e-mail.");
    }

    const result = createUser(id, name, email, password);

    res.status(201).send(result);
  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }

})


app.post("/products", (req: Request, res: Response) => {

  try {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const productWithId = product.find(products => products.id === id);
    if (productWithId) {
      throw new Error("Já existe um produto com o mesmo ID.");
    }

    const result = createProduct(id, name, price, description, imageUrl);

    res.status(201).send(result);

  } catch (error: any) {
    console.log(error)
    res.status(400).send(error.message)
  }
})


app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDeleteUser = req.params.id;

  try {
    const userIndex = user.findIndex((user) => user.id === idToDeleteUser);

    if (userIndex >= 0) {
      user.splice(userIndex, 1);
      res.status(200).send("Item deletado com sucesso");
    } else {
      res.status(404).send("Usuário não encontrado");
    }
  } catch (error) {
    res.status(500).send("Erro ao deletar o usuário");
  }
})


app.delete("/products/:id", (req: Request, res: Response) => {
  const idToDeleteProduct = req.params.id;

  try {
    const productIndex = product.findIndex((product) => product.id === idToDeleteProduct);

    if (productIndex >= 0) {
      product.splice(productIndex, 1);
      res.status(200).send("Item deletado com sucesso");
    } else {
      res.status(404).send("Produto não encontrado");
    }
  } catch (error) {
    res.status(500).send("Erro ao deletar o produto");
  }
});

app.put("/products/:id", (req: Request, res: Response) => {
  const idToEdit = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newDescription = req.body.description as string | undefined
  const newImageUrl = req.body.imageUrl as string | undefined

  const products = product.find((products) => products.id === idToEdit)

  if (products) {
    products.id = newId || products.id;
    products.name = newName || products.name;
    products.description = newDescription || products.description;
    products.imageUrl = newImageUrl || products.imageUrl;

    products.price = isNaN(Number(newPrice)) ? products.price : newPrice as number
  }

  res.status(200).send("Atualização realizada com sucesso")
})