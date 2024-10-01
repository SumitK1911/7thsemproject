import Image from "next/image"
import { MdSafetyCheck } from "react-icons/md"
import image from '../../../../../public/user.png'

const UserLatestTransaction = () => {

    const transactions = [
    {
        name: "Jhon Doe",
        status: "cleared",
        date: "14.02.2023",
        amount: "3.200"
    },
    {
        name: "Jhon Doe",
        status: "cancelled",
        date: "14.02.2023",
        amount: "5.200"
    },
    {
        name: "Jhon Doe",
        status: "cleared",
        date: "14.02.2023",
        amount: "2.200"
    },
    {
        name: "Jhon Doe",
        status: "pending",
        date: "14.02.2023",
        amount: "1.200"
    },
]

  return (
    <div>
        <table className="w-full bg-slate-900">
            <thead>
                <tr>
                <td>Name</td>
                <td>Status</td>             
                <td>Date</td>
                <td>Amount</td>
                </tr>
            </thead>
        {transactions.map((transaction, index) => (
            <tbody>
                <tr>
                <td className="flex gap-2 items-center"><Image src={image} height={50} className="rounded-full"/> Jhon Doe</td>
                <td> 
                <span className={`${transaction.status == "pending" ? "bg-yellow-600" : transaction.status =="cleared" ? "bg-slate-600" : "bg-red-700"} 
                p-2 mx-4 rounded-lg my-2`}>{transaction.status}</span></td>
                <td>14.0.2023</td>
                <td>$4.200</td>
                </tr>
            </tbody>
                ))}
        </table>

    </div>
  )
}

export default UserLatestTransaction