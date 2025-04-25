import React from 'react'
import FiltresPrix from './FiltrePrix'
import FiltresStock from './FiltreStock'

const Filtres = () => {
  return (
    <>
    <div className='flex justify-end items-center gap-4 py-6 px-6'>
    <FiltresPrix></FiltresPrix>
    <FiltresStock></FiltresStock>

    </div>
    </>
  )
}

export default Filtres