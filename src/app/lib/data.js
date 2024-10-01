import { Product, User } from "./models.js";
import { connectDb } from "./util.js";

export const fetchUsers = async (q, page = 1) => {
    const regex = new RegExp(q, 'i');
    const itemsPerPage = 2;
    try {
        await connectDb();
        const count = await User.find({ username: { $regex: regex } }).countDocuments();  // Corrected method name
        console.log("count", count);
        const users = await User.find({ username: { $regex: regex } })
            .limit(itemsPerPage)
            .skip(itemsPerPage * (page - 1));
        const data = {count, users}
        return data;
    } catch (error) {
        console.log("Error fetching users:", error);
    }
};

export const fetchUser = async (id) => {
    try {
        await connectDb();
        const users = await User.findById(id);
        return users;
    } catch (error) {
        console.log("Error fetching users:", error);
    }
};

export const fetchProducts = async (q, page = 1) => {
    const productRegex = new RegExp(q, 'i');
    const itemsPerPage = 2;
    try {
        await connectDb();
        const count = await Product.find({ name: { $regex: productRegex } }).countDocuments();  // Corrected method name
        const products = await Product.find({ name: { $regex: productRegex } })
            .limit(itemsPerPage)
            .skip(itemsPerPage * (page - 1));
        const data = {count, products}
        return data;
    } catch (error) {
        console.log("Error fetching users:", error);
    }
};

export const fetchProduct = async (id) => {
    try {
        await connectDb();
        const products = await Product.findById(id)
        return products;
    } catch (error) {
        console.log("Error fetching users:", error);
    }
};
