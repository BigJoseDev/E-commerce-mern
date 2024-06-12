import { Link } from 'react-router-dom'
import '../Item/Item.css'

const Item = (props) => {
  return (
    <div className='item'>
        <Link to ={`/product/${props.id}`}><img src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                NGN{props.new_price}
            </div>
            <div className="item-price-old">
                NGN{props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item