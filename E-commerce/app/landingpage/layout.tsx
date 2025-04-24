import Footer from '@/components/Footer'
import Header from '@/components/header'
import React, { ReactNode } from 'react'

const Layout = ({children} : {children : ReactNode}) => {
  return (
    <div>
        <Header></Header>
        <Footer></Footer>
        {children}
    </div>
  )
}

export default Layout