import React from 'react'
import success from '../../../assets/successful_payment.png'
import { Link } from 'react-router-dom'
function PaymentSuccess() {
    
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="mb-8">
        <img src={success} alt="success" className="w-32 h-32" />
      </div>
      <div className="text-2xl font-semibold mb-4">Payment Successful!</div>
      <div className="text-gray-600 mb-8">
        Thank you for your payment. Your transaction was successful.
      </div>
      <Link to={'/app/location'}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full">
        Back to Home
      </button>
      </Link>
    </div>
  )
}

export default PaymentSuccess