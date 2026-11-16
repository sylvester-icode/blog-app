"use client"
import { FaRegCircleCheck } from "react-icons/fa6";

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  
    return <div data-testid="notification" className={`w-screen inset-0 min-w-md py-35 flex absolute  justify-center align-middle top-0 bg-black/84 backdrop-blur-lg h-full z-600`}>
        <div bg-white className= {` min-w-md  ${type === "success" ? "bg-gray-900 "  : "bg-red-500"}  h-90 absolute rounded-lg shadow-xl p-4 z-500`}>
          <ul className="flex justify-center items-center gap-5 flex-col my-9 ">
             <FaRegCircleCheck className="text-9xl text-emerald-900" />
            <p className="text-2xl font-medium mt-6">{message}</p>
          </ul>
        </div>
    </div>
}