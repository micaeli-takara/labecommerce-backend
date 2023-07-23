import express, { Request, Response } from 'express'
import cors from 'cors';
import { db } from "./database/knex";
import { searchProductsByName } from "./query/query";

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send("Pong!")
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await db("users")
    res.status(200).send(users);

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await db.raw(`
    SELECT * FROM products;
    `)
    res.status(200).send(products);
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.get("/product/search", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;

    const result = await searchProductsByName(name)

    if (result.length === 0) {
      throw new Error("Não existe nenhum produto com este nome.");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToPurchases = req.params.id;

    const [purchase] = await db("purchases").where({ id: idToPurchases })

    if (!purchase) {
      res.status(404)
      throw new Error("Pedido não encontrado")
    }

    const [resultPurchases] = await db.select(
      "purchases.id AS purchaseId",
      "users.id AS buyerId",
      "users.name AS buyerName",
      "users.email AS buyerEmail",
      "purchases.total_price AS totalPrice",
      "purchases.created_at"
    ).from(
      "purchases"
    ).innerJoin(
      "users",
      "purchases.buyer",
      "=",
      "users.id"
    ).where("purchaseId", "=", idToPurchases);

    const resultProducts = await db.select(
      "purchases_products.products_id AS id",
      "products.name AS name",
      "products.price AS price",
      "products.description AS description",
      "products.image_url AS imageUrl",
      "purchases_products.quantity"
    ).from(
      "purchases_products"
    ).innerJoin(
      "products",
      "purchases_products.products_id",
      "=",
      "products.id")
      .where(
        "purchases_products.purchases_id",
        "=",
        idToPurchases);

    const results = {
      ...resultPurchases, products: resultProducts
    }

    res.status(200).send(results)
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!id || !email) {
      res.status(400).send("ID e Email são campos obrigatórios.");
      return;
    }

    const existingUser = await db.raw(`
      SELECT * FROM users 
      WHERE id = "${id}" OR email = "${email}"
    `);

    if (existingUser.length > 0) {
      res.status(409).send("Já existe um usuário com o mesmo id ou email.");
      return;
    }

    await db.raw(`
      INSERT INTO users (id, name, email, password, created_at)
      VALUES ("${id}", "${name}", "${email}", "${password}", DATETIME('now'))
    `);

    res.status(201).send({ message: "Cadastro criado com sucesso!" });
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const image_url = req.body.imageUrl as string

    if (!id) {
      res.status(400).send("O ID do produto é obrigatório!")
    }

    const productWithId = await db.raw(`
    SELECT * FROM products
    WHERE id = "${id}"
    `);

    if (productWithId.length > 0) {
      res.status(409).send("Já existe um produto cadastrado com o mesmo ID.");
      return;
    }

    await db.raw(`
    INSERT INTO products (id, name, price, description, image_url)
    VALUES ("${id}", "${name}", ${price}, "${description}", "${image_url}")
  `);
    res.status(201).send("Produto cadastrado com sucesso");

  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.post("/purchases", async (req: Request, res: Response) => {
  try {

    const id = req.body.id as string
    const buyer = req.body.buyer as string
    const products = req.body.products

    if (!id || !buyer || !products) {
      res.status(400).send("O ID do produto, preço e quantidades são obrigatório!")
    }

    let totalPrice = 0

    const allProducts = []

    for (let product of products) {
      const [result] = await db.raw(`
        SELECT
          products.id,
          products.price 
        FROM products
        WHERE id = "${product.id}";
      `);

      allProducts.push({ ...result, quantity: product.quantity });
    };

    for (let product of allProducts) {
      totalPrice += product.quantity * product.price;
    };

    const newPurchases = {
      id,
      buyer,
      total_price: totalPrice,
      created_at: new Date().toISOString()
    }

    await db('purchases').insert(newPurchases);

    for (let product of allProducts) {
      const newPurchasesProducts = {
        purchases_id: id,
        products_id: product.id,
        quantity: product.quantity
      }

      await db('purchases_products').insert(newPurchasesProducts);
    };

    res.status(201).send("Pedido realizado com sucesso cadastrado com sucesso");
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
})

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id

    const [user] = await db("users").where({ id: idToDelete })

    if (!user) {
      res.status(404)
      throw new Error("'id' não encontrada")
    }
    await db("users").del().where({ id: idToDelete })

    res.status(200).send({ message: "User deletado com sucesso" })
  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message)
  }
})

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDeleteProduct = req.params.id;

    const [product] = await db.select("*").from("products").where({ id: idToDeleteProduct })

    if (!product) {
      res.status(404)
      throw new Error("'id' não encontrada")
    }

    await db.delete().from("products").where({ id: idToDeleteProduct })
    res.status(200).send({ message: "Produto deletado com sucesso" })

  } catch (error: any) {
    console.log(error)
    res.status(500).send(error.message)
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDeletePurchase = req.params.id;

    const [purchase] = await db("purchases").where({ id: idToDeletePurchase })
    
    if (!purchase) {
      res.status(404)
      throw new Error("'id' não encontrada")
    }
    await db("purchases").del().where({ id: idToDeletePurchase })

    res.status(200).send({ message: "Pedido deletado com sucesso" })
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("O preço deve ser do tipo number");
      }
      if (newPrice <= 0) {
        res.status(400);
        throw new Error("O preço deve ser menor ou igual a zero");
      }
    }

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("O ID deve ser do tipo string");
      }

      if (newId.length <= 2) {
        res.status(400);
        throw new Error("O ID deve ter pelo menos um caracter");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("O nome deve ser do tipo string");
      }

      if (newName.length < 2) {
        res.status(400);
        throw new Error("O nome deve ter pelo menos um caracter");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("A descrição deve ser do tipo string");
      }

      if (newDescription.length <= 5) {
        res.status(400);
        throw new Error("A descrição deve ter pelo menos um caracter");
      }
    }

    if (newImageUrl !== undefined) {
      const regexURL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
      const isValidUrl = regexURL.test(newImageUrl)
      if (!isValidUrl) {
        res.statusCode = 400
        throw new Error("A imageUrl deve ter uma url, exemplo: 'https://br.pinterest.com/' .")
      }

      if (typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("A url deve ser do tipo string");
      }
    }

    const [products] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
    `);

    if (!products) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }

    await db.raw(`
      UPDATE products
      SET
        id = "${newId || products.id}",
        name = "${newName || products.name}",
        price = "${newPrice || products.price}",
        description = "${newDescription || products.description}",
        image_url = "${newImageUrl || products.image_url}"
      WHERE id = "${id}";
    `);

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    console.log(error)

    if (res.statusCode === 200) {
      res.status(500)
    }

    if (error instanceof Error) {
      res.send(error.message)
    } else {
      res.send("Erro inesperado")
    }
  }
});
