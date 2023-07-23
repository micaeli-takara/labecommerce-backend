
# Documentação da API Labecommerce-backend

A API Labecommerce-backend oferece recursos para gerenciar produtos, usuários e listas de compras. A documentação inclui endpoints para realizar operações como obter informações, criar, pesquisar e excluir registros.

## Documentação

[Documentação](https://documenter.getpostman.com/view/27685885/2s946maAAb#59e670e7-8656-4f14-840e-2e0b561e3a94)


# GET All Users

```http
  GET /users
```

### Parâmetros de caminho

Nenhum parâmetro de caminho necessário.

# Exemplo de resposta:

```json
[
    {
        "id": "u001",
        "name": "Astrodev",
        "email": "astrodev@email.com",
        "password": "abc123",
        "created_at": "2023-07-20 20:24:52"
    },
    {
        "id": "u002",
        "name": "Joaquina",
        "email": "joaquina@email.com",
        "password": "joaninha123",
        "created_at": "2023-07-20 20:24:52"
    }
]
```

# GET All Products

```http
  GET /products
```

### Parâmetros de caminho

Nenhum parâmetro de caminho necessário.

# Exemplo de resposta:

```json
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "image_url": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod002",
        "name": "Placa de Vídeo",
        "price": 2569.99,
        "description": "Placa de Vídeo daora",
        "image_url": "https://www.kabum.com.br/produto/470146/placa-de-video-rtx-4060-xlr8-verto-epic-x-gaming-pny-nvidia-geforce-8gb-gddr6-rgb-dlss-ray-tracing-vcg40608tfxxpb1"
    },
    {
        "id": "prod003",
        "name": "HD SSD",
        "price": 599,
        "description": "HD SSD para o seu PC voar de tão rápido",
        "image_url": "https://www.kabum.com.br/produto/290922/hd-ssd-externo-sandisk-1tb-portatil-sdssde30-1t00-g25-preto"
    }
]
```

# GET Search Product

```http
  GET /product/search?name=${name}
```

### Parâmetros de consulta:

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. O ID do item que você quer |

# Exemplo de resposta:
### Exemplo de Request
```http
  GET /product/search?name=Gamer
```

```json
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "image_url": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod004",
        "name": "Headset Gamer",
        "price": 249.99,
        "description": "Headset para escutar",
        "image_url": "https://www.kabum.com.br/produto/227818/headset-gamer-redragon-zeus-x-chroma-mk-ii-rgb-surround-7-1-usb-drivers-53mm-preto-vermelho-h510-rgb"
    }
]
```

# GET Purchases by ID

```http
  GET /purchases/:id
```

### Parâmetros de caminho:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

# Exemplo de resposta:
### Exemplo de Request

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `pur001` | **Obrigatório**. A chave da sua API |

```json
{
    "purchaseId": "pur001",
    "buyerId": "u001",
    "buyerName": "Astrodev",
    "buyerEmail": "astrodev@email.com",
    "totalPrice": 8509.97,
    "created_at": "2023-07-22T15:57:00.187Z",
    "products": [
        {
            "id": "prod002",
            "name": "Placa de Vídeo",
            "price": 2569.99,
            "description": "Placa de Vídeo daora",
            "imageUrl": "https://www.kabum.com.br/produto/470146/placa-de-video-rtx-4060-xlr8-verto-epic-x-gaming-pny-nvidia-geforce-8gb-gddr6-rgb-dlss-ray-tracing-vcg40608tfxxpb1",
            "quantity": 3
        },
        {
            "id": "prod005",
            "name": "Controle Remoto",
            "price": 100,
            "description": "Controle para abrir",
            "imageUrl": "https://www.kabum...",
            "quantity": 8
        }
    ]
}
```

# POST Create User
```http
  POST /users
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do novo usuário |
| `name` | `string` | **Obrigatório**. Nome do novo usuário |
| `email` | `string` | **Obrigatório**. E-mail do novo usuário |
| `password` | `string` | **Obrigatório**. Senha do novo usuário |

### Exemplo de corpo da requisição:

```json
{
  "id": "u004",
  "name": "joao",
  "email": "joao@email.com",
  "password": "joao1234"
}
```

### Exemplo de resposta:

```json
{
  "message": "Cadastro criado com sucesso!"
}

```

# POST Create Products
```http
   POST /products
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do novo usuário |
| `name` | `string` | **Obrigatório**. Nome do novo usuário |
| `price` | `number` | **Obrigatório**. Preço do novo produto |
| `description` | `string` | **Obrigatório**. Descrição do novo produto |
| `imageUrl` | `string` | **Obrigatório**. URL da imagem do novo produto |

### Exemplo de corpo da requisição:

```json
{
  "id": "prod007",
  "name": "Caneta",
  "price": 1.99,
  "description": "Canetinha marota",
  "imageUrl": "https://images.com"
}
```

### Exemplo de resposta:

```json
{
  "message": "Produto cadastrado com sucesso"
}
```

# POST Create Purchases
```http
  POST /purchases
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID da nova lista de compras |
| `buyer` | `string` | **Obrigatório**. ID do comprador |
| `products` | `string` | **Obrigatório**. Array contendo objetos de produtos com seus IDs e quantidades |


### Exemplo de corpo da requisição:

```json
{
  "id": "pur002",
  "buyer": "u002",
  "products": [
    {
      "id": "prod004",
      "quantity": 4
    },
    {
      "id": "prod002",
      "quantity": 1
    }
  ]
}
```

### Exemplo de resposta:

```json
{
  "message": "Pedido realizado com sucesso cadastrado com sucesso"
}
```

# DEL Delete User by Id
```http
  DELETE /users/:id
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do usuário a ser deletado |

### Exemplo de resposta:

```json
{
  "message": "User deletado com sucesso"
}
```

# DEL Delete Products by Id
```http
  DELETE /products/:id
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do produto a ser deletado |

### Exemplo de resposta:

```json
{
  "message": "Produto deletado com sucesso"
}
```

# DEL Delete Purchase by Id
```http
  DELETE /purchases/:id
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID da lista de compras a ser deletada |

### Exemplo de resposta:

```json
{
  "message": "Pedido deletado com sucesso"
}
```

# PUT Edit Product by Id
```http
  PUT /products/:id
```

### Cria um novo usuário.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. ID do produto a ser editado |
| `name` | `string` | **Obrigatório**. Novo nome do produto |
| `price` | `number` | **Obrigatório**. Novo preço do produto |
| `description` | `string` | **Obrigatório**. Nova descrição do produto |
| `imageUrl` | `string` | **Obrigatório**. Nova URL da imagem do produto |

### Exemplo de corpo da requisição:

```json
{
  "id": "prod006",
  "name": "Cabo USB",
  "price": 15.59,
  "description": "Cabo USB para conectar coisas",
  "imageUrl": "https://picsum.photos.com"
}
```

### Exemplo de resposta:

```json
{
  "message": "Atualização realizada com sucesso"
}
```