import React from 'react'
import Lottie from 'lottie-react'
import loaderAnimation from '../Lotties/Loading.json'

function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        animationData={loaderAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}

export default Loader