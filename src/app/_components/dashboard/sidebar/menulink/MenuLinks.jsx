'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

const MenuLinks = ({item}) => {
  const pathname = usePathname();
  return (
    <Link href={item.path} className={`mx-[5px] px-[5px] rounded-xl p-[10px] flex items-center gap-[15px] hover:bg-gray-700 ${pathname === item.path && 'bg-gray-700'}`}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLinks