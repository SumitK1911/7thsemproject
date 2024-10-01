import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectDb } from "./util";
import { redirect } from "next/navigation";
import bcrypt from 'bcryptjs'

export const addUser = async(formData) => {
'use server'
const {username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
try {
    await connectDb();
    
    const newUser = new User({
        username,
        email,
        password : hashedPassword,
        phone,
        address,
        isAdmin,
        isActive
    });

    await newUser.save();
} catch (error) {
    console.log(error.errmsg);
    return 
}

revalidatePath('/dashboard/users')
redirect('/dashboard/users')
}

export const addProduct = async(formData) => {
'use server'
const {name, type, desc, price, img, color,size, stock} = Object.fromEntries(formData);
try {
    await connectDb();
    
    const newProduct = new Product({
        name, type, desc, price, img, color,size, stock
    });

    await newProduct.save();
} catch (error) {
    console.log(error.errmsg);
    return 
}

revalidatePath('/dashboard/products')
redirect('/dashboard/products')
}

export const deleteProduct = async(formData) => {
'use server'
const {id} = Object.fromEntries(formData);
try {
    await connectDb();
    await Product.findByIdAndDelete(id);
} catch (error) {
    console.log(error.errmsg);
    return 
}
revalidatePath('/dashboard/products')
}

export const deleteUser = async(formData) => {
'use server'
const {id} = Object.fromEntries(formData);
try {
    await connectDb();
    await User.findByIdAndDelete(id);
} catch (error) {
    console.log(error.errmsg);
    return 
}
revalidatePath('/dashboard/users')
}

export const updateUser = async(formData) => {
'use server'
const {id, username, email, password, phone, address, isAdmin, isActive} = Object.fromEntries(formData);
const hashedPassword = await bcrypt.hash(password, 10);
 
try {
    await connectDb();
const updateFields = {  username, email, password: hashedPassword, phone, address, isAdmin, isActive}
  Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);
 
  await User.findByIdAndUpdate(id, updateFields);
} catch (error) {
    console.log(error)
}
revalidatePath('/dashboard/users')
redirect('/dashboard/users')
}

export const updateProduct = async(formData) => {
'use server'
const {id, name, type, desc, price, img, color, size, stock} = Object.fromEntries(formData);
try {
    await connectDb();
const updateFields = { name, type, desc, price, img,size, color, stock}
  Object.keys(updateFields).forEach((key) => (updateFields[key] === "" || undefined) && delete updateFields[key]);
 
  await Product.findByIdAndUpdate(id, updateFields);
} catch (error) {
    console.log(error)
}
revalidatePath('/dashboard/products')
redirect('/dashboard/products')
}

