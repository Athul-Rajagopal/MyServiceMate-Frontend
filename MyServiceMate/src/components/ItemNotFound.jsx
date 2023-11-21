import React from 'react'
import Lottie from 'lottie-react'
import notFoundAnimation from '../Lotties/not_found.json'

function ItemNotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 200 }}
      />
    </div>
  )
}

export default ItemNotFound