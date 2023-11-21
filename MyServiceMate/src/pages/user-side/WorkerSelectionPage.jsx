import React from 'react';
import Navbar from '../../components/Navbar';
import WorkerSelection from '../../components/WorkerSelection';
import  Footer from '../../components/Footer';


function WorkerSelectionPage() {
  return (
    <>
    < Navbar/>
    <div>
        <WorkerSelection/>
    </div>
    <div className='mt-10'>
    <Footer/>
    </div>
    </>
  )
}

export default WorkerSelectionPage