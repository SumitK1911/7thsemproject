'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce';

const Search = ({placeholder}) => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const pathname = usePathname();

  
  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
   
    params.set("page", 1);

    if(e.target.value){
        params.set('q', e.target.value);
         
      }else {
        params.delete('q');
      }

    replace(`${pathname}?${params}`)
  }, 500)


  return (
    <div className="flex w-1/4 items-center gap-[10px] bg-gray-700 p-[10px] rounded-xl">
    <MdSearch size={23}/>
    <input type="text" placeholder='placeholder' className="flex bg-transparent  focus:outline-none" onChange={handleSearch}/>
  </div>
  )
}

export default Search