import { db } from "./database/knex";
import { TUsers, TProducts } from "./types";

export const user: TUsers[] = [
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
]

export const product: TProducts[] = [
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
]



export function getAllUsers(): TUsers[] {
    return user;
}


//PRODUCTS
export function createProduct(id: string, name: string, price: number, description: string, imageUrl: string) {
    const newProduct: TProducts = { id, name, price, description, imageUrl };
    product.push(newProduct);
    return "Produto criado com sucesso";
}

export function getAllProduct(): TProducts[] {
    return product;
}


