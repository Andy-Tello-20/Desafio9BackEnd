import CartModel from './models/cart.model.js'


export default class CartMongoDAO {

    static async createCart(data) {
        const product = await CartModel.create(data);
        console.log(`Producto creado correctamente (${product._id}) `);
        return product;
    }


    static async getCart() {
        try {
            const cart = await CartModel.find({});
            return cart;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            throw error;
        }
    }


    static async getCartById(sid) {
        return await CartModel.findById(sid);


    }

    static async addProductToCart(idCart) {

        return await CartModel.findById(idCart)

      

    }

    static async updateCartById(sid, data) {
        await CartModel.updateOne({ _id: sid }, { $set: data });
        console.log(`Producto actualizado correctamente (${sid}) `);
    }

    static async deleteCartById(sid) {
        await CartModel.deleteOne({ _id: sid });
        console.log(`Carrito eliminado correctamente (${sid}) `);
    }







}