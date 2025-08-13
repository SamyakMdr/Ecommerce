import React, { useContext } from 'react'
import './CSS/ShopCategory.css?v=1.0.0'
import { ShopContext } from '../Context/ShopContext'

const ShopCategory = (props) => {

  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <img src={props.banner} alt="Banner" className='shop-category-banner' />
      
    </div>
  )
}

export default ShopCategory