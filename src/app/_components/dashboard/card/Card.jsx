'use client'
import Image from "next/image"
import { MdSupervisedUserCircle } from "react-icons/md"

const Card = () => {
  return (
    <div className="flex gap-3 w-full bg-slate-900 p-4 items-start rounded-xl hover:bg-gray-500">
        <MdSupervisedUserCircle size={24}/>
        <div className="flex flex-col gap-3">
            <p className="text-white capitalize">title</p>
            <h2 className="text-white text-2xl font-bold">10.920</h2>
            <p className="flex gap-2 text-white text-[14px]"><span className="text-green-500">20%</span>more than previous week</p>
        </div>
    </div>
  )
}

export default Card