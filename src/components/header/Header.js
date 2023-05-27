import React from 'react'
import '../header/header.scss'
import { IonIcon } from '@ionic/react'
import { bagOutline, bagHandleOutline } from 'ionicons/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {
  const state = useSelector((state) => state)
  const { basket } = state.selected

  return (
    <div className="HeaderSection">
      <div className="HeaderSection_Wrap">
        <div className="HeaderSection_Wrap_Left">
          <Link to="/" className="HeaderSection_Wrap_Left_El">
            Shops
          </Link>
          <Link to="/history" className="HeaderSection_Wrap_Left_El">
            History
          </Link>
          <Link to="/coupons" className="HeaderSection_Wrap_Left_El">
            Coupons
          </Link>
        </div>

        <div className="HeaderSection_Wrap_Right">
          <Link to="/basket" className="HeaderSection_Wrap_Right_El">
            {basket.length !== 0 ? (
              <div className="HeaderSection_Wrap_Right_El_Point"></div>
            ) : null}
            <IonIcon
              className="HeaderSection_Wrap_Right_El_Icon"
              icon={bagHandleOutline}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
