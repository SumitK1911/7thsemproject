'use client'
import Image from "next/image"
import Car from '../../../../../public/car.png'
import { MdPlayArrow, MdPlaylistRemove, MdReadMore, MdWatch} from 'react-icons/md'

const RightBar = () => {
  return (
    <div className="fixed mr-2">
      <div className="relative bg-gradient-to-b from-slate-600 to-slate-900 p-4 rounded-xl mb-5">
        <div className="absolute bottom-5 right-1 w-[50%] h-[50%]">
          <Image src={Car} alt="" fill className="object-fill opacity-[0.2]"/>
        </div>
        <div>
          <span>
            🔥 Available Now
          </span>
            <h3 className="font-bold mb-4">How to use the new version of the admin dashboard?</h3>
            <span className="text-sm text-gray-300">Takes 4 minutes to learn</span>
            <p className="text-sm text-gray-300 mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, 
              voluptatem reprehenderit, consequuntur sed 
              modi repellendus laboriosam velit aliquam officiis ex 
              assumenda? Id accusantium autem ex accusamus, quam totam temporibus suscipit.</p>
              <button className="text-center flex items-center bg-purple-800 p-2 rounded justify-center mt-4 cursor-pointer">
                Watch Now <MdPlayArrow/>
              </button>
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-slate-600 to-slate-900 p-4 rounded-xl mb-5">
        <div className="absolute bottom-5 right-1 w-[50%] h-[50%]">
          <Image src={Car} alt="" fill className="object-fill opacity-[0.2]"/>
        </div>
        <div>
          <span>
            🔥 Available Now
          </span>
            <h3 className="font-bold mb-4">How to use the new version of the admin dashboard?</h3>
            <span className="text-sm text-gray-300">Takes 4 minutes to learn</span>
            <p className="text-sm text-gray-300 mt-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, 
              voluptatem reprehenderit, consequuntur sed 
              modi repellendus laboriosam velit aliquam officiis ex 
              assumenda? Id accusantium autem ex accusamus, quam totam temporibus suscipit.</p>
              <button className="text-center flex gap-2 items-center bg-purple-800 p-2 rounded  mt-4 cursor-pointer">
                Read More <MdReadMore size={20}/>
              </button>
        </div>
      </div>
  
      
    </div>
  )
}

export default RightBar