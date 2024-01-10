const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async addProduct(newObject) {
        let { title, description, price, image, code, stock } = newObject;

        if (!title || !description || !price || !image || !code || !stock) {
            console.log("Todos los datos son obligatorios, por favor completar todos los campos")
            return;
        }

        var existingProducts = await this.readFile();

        if (existingProducts.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            image,
            code,
            stock
        }

        existingProducts.push(newProduct);

        // guardamos el array en el archivo
        await this.saveFile(existingProducts);  
        return newProduct;
    }

    async getProducts() {
        try {
            const arrayProducts = await this.readFile();
            return arrayProducts;
        

        } catch (error) {
            console.log("Error al leer el archivo", error)
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const search = arrayProducts.find(item => item.id === id);

            if (!search) {
                console.log("Producto no encontrado");
            } else {
                console.log("Producto encontrado exitosamente");
                return search;
            }

        } catch (error) {
            console.log("Error al leer el archivo", error)
        }

    }

    async readFile() {
        try {
            const answer = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(answer);
            ProductManager.ultId = arrayProducts.length;
            return arrayProducts;

        } catch (error) {
            console.log("Error al leer un archivo", error);
        }
    }

    async saveFile(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));

        } catch (error) {
            console.log("Error al guardar el archivo", error)
        }
    }

    // actualizo un producto
    async updateProduct(id, productUpdated) {
        try {
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                // puedo usar el metodo de array splice para reemplazar el objeto en la posicion del index
                arrayProducts.splice(index, 1, productUpdated);
                await this.saveFile(arrayProducts);
                return productUpdated;
            } else {
                console.log("No se encontro el producto");

            }

        } catch (error) {
            console.log("Error al actualizar el producto", error);
        }
    }

    async deleteProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const index = arrayProducts.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
                return true;
            } else {
                console.log("Producto no encontrado");
                return false;
            }

        } catch (error) {
            console.log("Error al eliminar el producto", error);
        }
    }



}

module.exports = ProductManager;

