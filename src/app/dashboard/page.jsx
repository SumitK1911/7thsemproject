import { MdFace } from "react-icons/md"
import Card from "../_components/dashboard/card/Card"
import Chart from "../_components/dashboard/chart/Chart"
import RightBar from "../_components/dashboard/rightbar/RightBar"
import Transaction from "../_components/dashboard/transactions/Transaction"

const Dashboard = () => {
  return (
    <div className="flex gap-[20px] mt-[20px] bg-blue-900">
   <div className="flex-[3] flex flex-col gap-[20px]">
    <div className="flex gap-[20px] justify-between">
      <Card/>
      <Card/>
      <Card/>
    </div>
      <Transaction/>
      <Chart/>
   </div>
    <div className="flex-1">
      <RightBar/>
    </div>
    </div>
  )
}

export default Dashboard