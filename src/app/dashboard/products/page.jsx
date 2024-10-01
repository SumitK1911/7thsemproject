import Search from "@/app/_components/dashboard/search/Search"
import Link from "next/link"
import { fetchProducts } from "@/app/lib/data";
import Pagination from "@/app/_components/dashboard/pagination/Pagination";

const Products = async({searchParams}) => {
   const q = searchParams?.q || ""
   const page = searchParams?.page || 1;
   const product = await fetchProducts(q, page);
  return (
    <div className="mt-3 bg-white p-[20px] rounded-[10px]">
    <div className="flex items-center justify-between">
    <Search placeholder="Search for a user..."/>
    <Link href="/dashboard/products/add">
    <button className="bg-purple-600 p-3 rounded-lg">Add New</button>
    </Link>
    <div className="bg-slate-500 rounded-md">
            <h1 >Access Qdrant Dashboard</h1>
            <a href="http://localhost:6333/dashboard#/collections" target="_blank" rel="noopener noreferrer">
                Go to Qdrant Dashboard
            </a>
        </div>
    </div>
    
   <Pagination count={product?.count}/>
  </div>
  )
}

export default Products

