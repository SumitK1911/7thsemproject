import Search from "@/app/_components/dashboard/search/Search"
import Image from "next/image"
import userImg from '../../../../public/user.png'
import { FcNext, FcPrevious } from "react-icons/fc";
import Link from "next/link"
import { MdSearch } from "react-icons/md"
import { fetchUsers } from "@/app/lib/data.js";

import Pagination from "@/app/_components/dashboard/pagination/Pagination";
import { deleteUser } from "@/app/lib/actions";

const Users = async({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
    var data = await fetchUsers(q, page);

  
  return (
    <div className="mt-3 bg-pink-300 p-[20px] rounded-[10px]">
      <div className="flex items-center justify-between">
      <Search placeholder="Search for a user..."/>
      <Link href="/dashboard/users/add">
      <button className="bg-purple-600 p-3 rounded-lg">Add New</button>
      </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created at</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.users.map((userData, index) => (
          <tr key={userData._id}>
            <td className="flex gap-3 items-center"><Image src={userData.img || userImg} className="rounded-full object-cover h-10 w-10"/> {userData.username}</td>
            <td>{userData.email}</td>
            <td>{userData.createdAt?.toString().slice(4,16)}</td>
            <td>{userData.isAdmin ? "Admin" : "Client"}</td>
            <td>{userData.isActive ? "Active"  :"passive"  }</td>
            <td className="flex gap-2"><Link href={`/dashboard/users/${userData._id}`} className="p-2 bg-green-700 rounded-lg">View</Link>
            <form action={deleteUser}>
              <input type="text" className="hidden" value={userData._id} name="id" />
            <button className="p-2 bg-red-700 rounded-lg">Delete</button>
            </form> 
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={data.count}/>
    </div>
  )
}

export default Users