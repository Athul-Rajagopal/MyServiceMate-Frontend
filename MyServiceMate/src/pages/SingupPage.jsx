import React from 'react'
import { Footer, Navbar } from '../components'
import {Signup} from '../components'

function SingupPage() {
  return (
    <div>
        <div>
    <Navbar />
    <div className='flex justify-center items-center h-[calc(100vh - 5rem)] mt-20'>
        <Signup />
    </div>
    <Footer className="mt-3" />
    </div>
    </div>
  )
}

export default SingupPage