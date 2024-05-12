import CartMongoDAO from "../dao/cartMongoDAO.js";

export default class CartsController {



    static createCart = async (req, res) => {

        try {
            const newCart = {
                products: []
            }

            await CartMongoDAO.createCart(newCart)

            res.status(201).json(newCart)

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }


    }

    static getCartById = async (req, res) => {

        try {
            const idcart = req.params.cid
    
            if (idcart) {
    
    
                const showCart = await CartMongoDAO.getCartById(idcart)

                if (!showCart) {
                    throw new Error('Producto no encontrado.');
                }

    
                res.status(201).json(showCart)
    
            } else {
                res.send({ error: 'No se proporcionó un PID válido' })
            }
    
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    
    }

    static addProduct = async (req, res) => {

        try {
            const carritoId = req.params.cid
            const productoId = req.params.pid
    
            const productoEncontrado = await CartMongoDAO.addProductToCart(carritoId)
    
            if (productoEncontrado) {

                const existingProduct = productoEncontrado.products.find((i) => { return i.product === productoId })
    
    
                if (existingProduct) {
                    // Si el producto ya está en el carrito, aumentar la cantidad en una unidad
                    existingProduct.quantity++;
                } else {
                    // Si el producto no está en el carrito, agregarlo como nuevo
                    productoEncontrado.products.push({ product: productoId, quantity: 1 });
                }
    
                await productoEncontrado.save();
                return res.status(200).json(productoEncontrado)
    
            } else {
    
                const mensaje = "no se encontro ningun producto 😪"
    
                return mensaje
            }
    
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error interno del servidor' })
        }
    }

}