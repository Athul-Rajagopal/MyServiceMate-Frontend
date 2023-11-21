import React from 'react'

function Footer() {
  return (
    <div className='w-full mt-20 border-t-2 bg-gray-100 flex-shrink-0 h-full'>
      <div className='max-w-[1500px] mx-auto'>
        <div className='border-t bg-white h-[250px] flex flex-col text-left p-4'>
          <h1 class="font-bold text-xl mt-2 pl-4">About Us</h1>
          <div class="pl-4 pr-4">
            <p class="mb-2"><span class="font-bold">MyServiceMate</span> is an online free service booking app where you can find solutions to all your house maintenance problems.</p>
            <div className='flex items-center mt-2'>
              <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#000000" stroke-width="2" strokeLineCap="round" strokeLinejoin="round"/>
                        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
                        </svg>
              <p class="text-sm">myservicemate@gmail.com</p>
            </div>
            <div className='flex items-center '>
              <svg width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none" class="mr-2">
                        <path d="M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6"/><path d="M37.86,51.1A47,47,0,0,1,32,56.7"/><path d="M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85"/><path d="M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24"/><line x1="10.37" y1="19.9" x2="53.75" y2="19.9"/><line x1="32" y1="6.99" x2="32" y2="56.7"/><line x1="11.05" y1="45.48" x2="37.04" y2="45.48"/><line x1="7.14" y1="32.46" x2="56.86" y2="31.85"/>
                        <path d="M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,.0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z"/>
                        </svg>
              <p class="text-sm">www.myservicemate.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Footer