import React, { useEffect, useRef } from 'react'
import '../coupons/coupons.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  GET_COUPONS_ERROR,
  GET_COUPONS_SUCCESS,
} from '../../redux/reducerConst'
import { IonIcon } from '@ionic/react'
import { copyOutline } from 'ionicons/icons'

function Coupons() {
  const dispatch = useDispatch()
  const getCouponsSuccess = (data) => {
    dispatch({ type: GET_COUPONS_SUCCESS, payload: data })
  }
  const getCouponsError = (error) => {
    dispatch({ type: GET_COUPONS_ERROR, error: error })
  }

  const state = useSelector((state) => state)
  const { domain } = state.settings
  const { loading, data } = state.coupons
  // =======================================

  useEffect(() => {
    fetch(`${domain}/coupon`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        getCouponsSuccess(res)
      })
      .catch((e) => {
        getCouponsError(e)
      })
  }, [])

  const CouponBrick = ({ el }) => {
    const codeRef = useRef(null)

    const clickCopy = () => {
      navigator.clipboard.writeText(el.code)

      if (codeRef.current) {
        codeRef.current.style.background = 'rgb(210, 255, 159)'
        setTimeout(() => {
          codeRef.current.style.background = 'rgb(224, 224, 224)'
        }, 200)
      }
    }

    return (
      <div className="CouponsSection_El">
        <div className="CouponsSection_El_Percents">{el.percents}%</div>

        <div className="CouponsSection_El_Name">{el.name}</div>

        <div className="CouponsSection_El_CopyWrap">
          <div ref={codeRef} className="CouponsSection_El_CopyWrap_Code">
            {el.code}
          </div>

          <div
            onClick={clickCopy}
            className="CouponsSection_El_CopyWrap_Button"
          >
            <IonIcon
              className="CouponsSection_El_CopyWrap_Button_Icon"
              icon={copyOutline}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="CouponsSection">
      <div className="CouponsSection_Wrap">
        {!loading ? (
          data.map((el, index) => <CouponBrick key={`CSSH_${index}`} el={el} />)
        ) : (
          <>loading...</>
        )}
      </div>
    </div>
  )
}

export default Coupons
