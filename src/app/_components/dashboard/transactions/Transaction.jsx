import UserLatestTransaction from "./UserLatestTransaction"

const Transaction = () => {
  return (
    <div className="bg-slate-900 p-5 rounded-xl">
     <h1>Latest Transaction</h1>
     <div className="">
      <UserLatestTransaction/>
     </div>
    </div>
  )
}

export default Transaction