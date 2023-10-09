import React from 'react'
import { Footer, Navbar } from '../components'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <>
    <div>
        <Navbar/>

    </div>
    <div className='mx-auto mt-[150px] flex justify-center'>
        <div class="max-w-screen-md rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">

            <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#323232"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#323232"/>
            </svg>

                <div class="font-bold text-xl mb-2">WORKER</div>
                <p class="text-gray-700 text-base">
                    Are You Service Provider ? Login Here !!
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <Link to="Signin?type=worker" >
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><span>Sign in</span></button>
                </Link>
            </div>
        </div>
        <div class="max-w-screen-md rounded overflow-hidden shadow-lg ml-2">
            
            <div class="px-6 py-4">
            <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="#323232"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="#323232"/>
            </svg>

                <div class="font-bold text-xl mb-2">USER</div>
                <p class="text-gray-700 text-base">
                    Dear Customer ! Please Sign in Here ..
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <Link to="Signin?type=user" >
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"><span>Sign in</span></button>
                </Link>
            </div>
        </div>
    </div>

    <div>
        <Footer/>

    </div>

  </>
  )
}

export default LandingPage