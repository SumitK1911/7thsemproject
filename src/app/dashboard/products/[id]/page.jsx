import Image from "next/image"
import user from '../../../../../public/user.png'
import { fetchProduct } from "@/app/lib/data";
import { updateProduct } from "@/app/lib/actions";

const page = async({params}) => {
   const {id} = params;
   const products =  await fetchProduct(id);
    
  return (
    <div className="flex justify-between mt-5">
        {/* User Profile name  */}
        <div className="flex flex-col gap-2 p-3 h-[22rem] rounded ">
         <Image src={products.img || user} width={400} height={400} alt="user" className="w-72 h-72 rounded"/>
         <h1 className="capitalize">{products.name}</h1>
        </div>
          <form action={updateProduct}>
       <input type="hidden" name="id" value={products.id} id="" />
        <div className=" flex flex-col mr-[10rem] p-5 rounded gap-3">
         <label htmlFor="name">Product Name</label>
         <input type="text" name="name" id="name" placeholder={products.name}  className="p-3 w-[50rem]"/>
         <label htmlFor="email">Category</label>
         <input type="text" id="type" name="type" placeholder={products.type}  className="p-3 w-[50rem]"/>
         <label htmlFor="password">Description</label>
         <input type="text" id="desc" placeholder={products.desc}  name="desc" className="p-3 w-[50rem]"/>
         <label htmlFor="phone">Price</label>
         <input type="number" id="price" name="price" placeholder={products.price}  className="p-3 w-[50rem]"/>
         <label htmlFor="address">img</label>
         <input type="text" id="img" name="img" placeholder={products.img} className="p-3 w-[50rem]"/>
         <label htmlFor="address">Color</label>
         <input type="text" id="color" name="color" placeholder={products.color} className="p-3 w-[50rem]"/> 
         <label htmlFor="address">Size</label>
         <input type="number" id="size" name="size" placeholder={products.size}  className="p-3 w-[50rem]"/>
         <label htmlFor="address">Stock</label>
         <input type="number" id="stock" name="stock" placeholder={products.stock}  className="p-3 w-[50rem]"/>
         <button className="bg-green-600 mt-5 p-3 rounded" type="submit">Update</button>
        </div>
        </form>

    </div>
  )
}

export default page