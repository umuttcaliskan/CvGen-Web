import React from 'react'
import Header from '@/components/Header'
import HomeBanner from "@/components/HomeComponents/HomeBanner"
import MobileAppPromo from '@/components/HomeComponents/MobileAppPromo'
import EasyCV from '@/components/HomeComponents/EasyCv'

function Home() {
  return (
    <div>
      <HomeBanner/>
      <MobileAppPromo/>
      <EasyCV/>
    </div>
  )
}

export default Home
