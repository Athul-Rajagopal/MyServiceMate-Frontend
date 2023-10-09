import React from 'react'
import { Footer, Navbar, SignIn } from '../components'

function SigninPage() {
  return (
    <div>
    <Navbar />
    <div className='flex justify-center items-center h-[calc(100vh - 5rem)] mt-20'>
        <SignIn />
    </div>
    <Footer className="mt-5" />
    </div>

  )
}

export default SigninPage