import Banner from '@/components/Banner'
import React from 'react'
import BannerImage from '@/assets/images/cvtemplate.webp'


function CvCreating() {
  return (
    <div>
      <Banner 
        title='Kariyer Yolculuğunuzu Başlatın' 
        description='Profesyonel bir CV oluşturarak iş başvurularınızda öne çıkın.' 
        imageSrc= {BannerImage}
      />
    
    </div>
  )
}

export default CvCreating
