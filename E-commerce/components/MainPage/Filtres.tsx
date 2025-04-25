import React from 'react'
import FiltresPrix from './FiltrePrix'
import FiltresStock from './FiltreStock'
import FiltreCategorie from './FiltreCategories'
import FiltrePromotion from './FiltrePromotion'
import FiltreRecherche from './FiltreRecherche'

const Filtres = () => {
  return (
    <div className="px-4 pb-10 sm:px-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:justify-end md:items-center">
        <FiltrePromotion />
        <FiltresPrix />
        <FiltresStock />
        <FiltreCategorie />
        <div className="w-full sm:w-auto">
          <FiltreRecherche />
        </div>
      </div>
    </div>
  )
}

export default Filtres