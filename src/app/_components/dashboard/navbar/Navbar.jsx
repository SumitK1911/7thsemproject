'use client'
import { usePathname } from "next/navigation"
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md"

const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className="flex justify-between items-center rounded-[10px] p-[20px] bg-slate-900">
      <div className="capitalize font-bold text-slate-400">{pathname.split('/').pop()}</div>
      <div className="flex items-center gap-[20px]">
        <div className="flex items-center gap-[10px] bg-gray-700 p-[10px] rounded-xl">
          <MdSearch size={23}/>
          <input type="text" placeholder="Search..." className="flex bg-transparent  focus:outline-none" />
        </div>
        <div className="flex gap-[20px]">
        <MdOutlineChat size={20}/>
        <MdNotifications size={20}/>
        <MdPublic size={20}/>
        </div>
      </div>

    </div>
  )
}

export default Navbar