'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FcNext, FcPrevious } from "react-icons/fc";

const Pagination = ({count}) => {
    const usingSearchParams = useSearchParams();
    const params = new URLSearchParams(usingSearchParams);
    const {replace} = useRouter();
    const pathname = usePathname();
    const item_per_page = 2;
    const pageParams = usingSearchParams.get("page") || 1;
    const hasPrev = item_per_page * (parseInt(pageParams) - 1) > 0;
    const hasNext = item_per_page * (parseInt(pageParams) -1) + item_per_page < count;
    
    
    const handleChangePage = (type) => {
        if(type == 'prev'){
          params.set("page", (parseInt(pageParams) - 1));
        }else{
          params.set("page", (parseInt(pageParams) + 1));
        }
        replace(`${pathname}?${params}`);
        }
        
  return (
    <div className="flex justify-between mt-4">
    <button className={`p-2  rounded text-black flex items-center gap-2 ${!hasPrev ? 'cursor-not-allowed bg-gray-400' : 'bg-white'}`} disabled={!hasPrev} onClick={() => handleChangePage("prev")}><FcPrevious />Previous</button>
    <button className={`p-2 rounded text-black flex items-center gap-2 ${!hasNext ? 'cursor-not-allowed bg-gray-400 '  : 'bg-white'}`} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next<FcNext /></button>
  </div>
  )
}

export default Pagination