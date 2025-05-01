import Footer from '@/components/FooterComponents/Footer'
import Header from '@/components/header'
import React, { ReactNode } from 'react'

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <div>
        <Header></Header>
        {children}
        <Footer></Footer>
        
    </div>
  )
}

export default Layout