import { addUser } from "@/app/lib/actions"

const page = () => {
  return (
    <div className="bg-blue-900 rounded p-4 mt-5">
    <form action={addUser} className="w-full">
      <div className="flex justify-between p-3 mt-5">
      <div className="flex flex-col gap-3">
    <input type="text"  className="p-3  w-[30rem]" placeholder="username" name="username" required/>
    <input type="password"  className="p-3 " placeholder="password" name="password" required/>
    <select name="isAdmin" id="" className="p-3  w-[30rem]">
      <option disabled>Is Admin?</option>
      <option value="false">Client</option>
      <option value="true">Admin</option>
    </select>
      </div>
      <div className="flex flex-col gap-4">
  
    <input type="email" name="email"  className="p-3 " placeholder="email" required/>
    <input type="number" name="phone"  className="p-3 " placeholder="phone" required/>
    <select name="isActive" id="" className="p-3  w-[30rem]">
      <option disabled>Is Active?</option>
      <option value="true">Active</option>
      <option value="false">Not Active</option>
    </select>
      </div>
      </div>
      <textarea name="address" id=""  className="w-[88.5rem] h-[10rem]  flex m-auto mb-4 mt-4 p-3"
       placeholder="Address" required></textarea>
     <button className="w-[88.5rem] p-3 flex m-auto justify-center bg-green-700 rounded" type="submit">Submit</button>
    </form>
    </div>
  )
}

export default page