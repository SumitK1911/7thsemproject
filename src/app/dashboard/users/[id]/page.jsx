import Image from "next/image"
import userImg from '../../../../../public/user.png'
import { fetchUser } from "@/app/lib/data";
import { updateUser } from "@/app/lib/actions";

const page = async({params}) => {
  const {id} = params;
  const user = await fetchUser(id);

  return (
    <div className="flex justify-between mt-5">
        {/* User Profile name  */}
        <div className="flex flex-col gap-2 p-3 h-[22rem] rounded bg-slate-900">
         <Image src={user?.img || userImg} alt="user" className="w-72 h-72 rounded"/>
         <h1 className="capitalize">{user.username}</h1>
        </div>
      <form action={updateUser}>
        <input type="hidden" name="id" value={user.id}/>
        <div className="bg-slate-900 flex flex-col mr-[10rem] p-5 rounded gap-3">
         <label htmlFor="name">Username</label>
         <input type="text" name="username" id="name" placeholder={user.username} className="p-3 bg-slate-950 w-[50rem]"/>
         <label htmlFor="email">Email</label>
         <input type="email" id="email" name="email" placeholder={user.email}  className="p-3 bg-slate-950 w-[50rem]"/>
         <label htmlFor="password">Password</label>
         <input type="password" id="password"  name="password" placeholder="***" className="p-3 bg-slate-950 w-[50rem]"/>
         <label htmlFor="phone">phone</label>
         <input type="number" id="phone" name="phone" placeholder={user.phone}  className="p-3 bg-slate-950 w-[50rem]"/>
         <label htmlFor="address">Address</label>
         <input type="text" id="address" name="address" placeholder={user.address}  className="p-3 bg-slate-950 w-[50rem]"/>
         <label htmlFor="isadmin">isAdmin</label>
         <select name="isadmin" id="isadmin" className="p-3 bg-slate-950 w-[50rem]">
            <option value="false">No</option>
            <option value="true">Yes</option>
         </select>
         <label htmlFor="isactive">isActive</label>
         <select name="isactive" id="isactive" className="p-3 bg-slate-950 w-[50rem]">
            <option value="true">Yes</option>
            <option value="false">No</option>
         </select>
         <button className="bg-green-600 mt-5 p-3 rounded" type="submit">Sumbit</button>
        </div>
       </form>

    </div>
  )
}

export default page