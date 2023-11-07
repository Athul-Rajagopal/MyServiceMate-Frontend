import React from 'react'
import { Navbar } from '../../components'
import logo from '../../assets/worker.png'
import { Link } from 'react-router-dom'


function ProfileCreationSuccesfulPage() {
    return (
        <div>
            <Navbar/>

            <div class="flex h-screen">
          <div class="w-1/2 bg-white">
          <div className="flex flex-shrink-0 md:mt-36 md:pl-20">
                <img
                  className=" w-auto"
                  src={logo}
                  alt="Your Company"
                />
              </div>
          </div>
          <div class="w-1/2 bg-white p-20 ">
          
          <div className="  w-96 h-60 md:mt-36 rounded-2xl bg-blue-500 flex-row items-center justify-center space-x-5">
                    <p className='text-4xl pt-12 pl-11 text-white font-mono'>Congratulations!</p>
                    <p className='pt-6 pl-3 mb-4 text-white'>
                        Your registration has been completed. Our admin will verify it and respond to you soon. Now you can logout the Profile</p>
                    <div className='pl-28'>
                        {/* <Link to="/">
                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <span className="sr-only">Icon description</span>
                                Back to Home
                                <svg className="w-4 h-4 pl-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>
                        </Link> */}
                    </div>


                </div>


          </div>
        </div>





          

        </div>
    )
}

export default ProfileCreationSuccesfulPage