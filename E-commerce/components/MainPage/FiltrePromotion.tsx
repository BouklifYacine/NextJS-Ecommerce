import React from 'react'
import { Checkbox } from '../ui/checkbox'

const FiltrePromotion = () => {
  return (
    <div className="flex items-center space-x-2 whitespace-nowrap">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Promotion
      </label>
    </div>
  )
}

export default FiltrePromotion