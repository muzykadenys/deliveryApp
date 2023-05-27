import React, { useEffect, useRef, useState } from 'react'
import '../basket/basket.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IonIcon } from '@ionic/react'
import {
  removeCircleOutline,
  addCircleOutline,
  closeOutline,
} from 'ionicons/icons'
import {
  CHANGE_iTEM_AMOUNT,
  CLEAR_ITEMS_FROM_BUSKET,
  GET_COUPONS_ERROR,
  GET_COUPONS_SUCCESS,
  REMOVE_ITEM_FROM_BASKET,
  SET_FROM_LOC_STORAGE_TO_BUSCKET,
  SET_USER_ORDER_ADDRESS,
  SET_USER_ORDER_EMAIL,
  SET_USER_ORDER_NAME,
  SET_USER_ORDER_PHONE,
} from '../../redux/reducerConst'

const ItemCofigurate = ({ el }) => {
  const dispatch = useDispatch()
  const addItemToBuscket = (el, amount) => {
    if (amount > 0)
      dispatch({
        type: CHANGE_iTEM_AMOUNT,
        payload: { id: el.id, amount: amount },
      })
  }
  const removeItemFromBasket = (data) => {
    dispatch({ type: REMOVE_ITEM_FROM_BASKET, payload: data })
  }
  // ==========================================================
  const state = useSelector((state) => state)
  const { localStorageBasket } = state.settings
  const { basket } = state.selected

  const [locAmount, setLocAmount] = useState(el.amount)
  // ==========================================================

  useEffect(() => {
    addItemToBuscket(el, locAmount)
  }, [locAmount])

  return (
    <div className="BasketSection_Right_Wrap_El">
      <div
        className="BasketSection_Right_Wrap_El_Image"
        style={{ backgroundImage: `url(${el.img})` }}
      ></div>

      <div className="BasketSection_Right_Wrap_El_Count">
        <div className="BasketSection_Right_Wrap_El_Close">
          <IonIcon
            onClick={() => removeItemFromBasket(el.id)}
            className="BasketSection_Right_Wrap_El_Close_Icon"
            icon={closeOutline}
          />
        </div>

        <div className="BasketSection_Right_Wrap_El_Count_Wrap">
          <div className="BasketSection_Right_Wrap_El_Count_Result">
            {el.price * el.amount}$
          </div>

          <div className="BasketSection_Right_Wrap_El_Count_Example">
            {el.price}$ * {el.amount}
          </div>

          <div className="BasketSection_Right_Wrap_El_Count_Counter">
            <div
              onClick={() => {
                setLocAmount((val) => val - 1)
              }}
              className="BasketSection_Right_Wrap_El_Count_Counter_Minus"
            >
              <IonIcon
                className="BasketSection_Right_Wrap_El_Count_Counter_Minus_Icon"
                icon={removeCircleOutline}
              />
            </div>

            <div
              onClick={() => {
                setLocAmount((val) => val + 1)
              }}
              className="BasketSection_Right_Wrap_El_Count_Counter_Plus"
            >
              <IonIcon
                className="BasketSection_Right_Wrap_El_Count_Counter_Plus_Icon"
                icon={addCircleOutline}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Basket() {
  const dispatch = useDispatch()
  const setNameInput = (data) => {
    dispatch({ type: SET_USER_ORDER_NAME, payload: data })
  }
  const setEmailInput = (data) => {
    dispatch({ type: SET_USER_ORDER_EMAIL, payload: data })
  }
  const setPhoneInput = (data) => {
    dispatch({ type: SET_USER_ORDER_PHONE, payload: data })
  }
  const setAddressInput = (data) => {
    dispatch({ type: SET_USER_ORDER_ADDRESS, payload: data })
  }
  const setFromLocStorageToBuket = (data) => {
    dispatch({ type: SET_FROM_LOC_STORAGE_TO_BUSCKET, payload: data })
  }
  const getCouponsSuccess = (data) => {
    dispatch({ type: GET_COUPONS_SUCCESS, payload: data })
  }
  const getCouponsError = (error) => {
    dispatch({ type: GET_COUPONS_ERROR, error: error })
  }

  const state = useSelector((state) => state)
  const { domain } = state.settings
  const { user, basket } = state.selected
  const { name, email, phone, address } = user
  const { loading, data } = state.coupons

  const submitRef = useRef(null)
  const [codeInput, setCodeInput] = useState('')
  const [percents, setPercents] = useState(0)
  const [isCouponUsed, setIsCouponeUsed] = useState(false)
  // ==============================================================
  const countTotal = () => {
    return basket.reduce((res, el) => res + el.amount * el.price, 0)
  }
  const setInitialBasket = () => {
    const basketLocStorage = JSON.parse(localStorage.getItem('basket'))
    if (basketLocStorage) {
      setFromLocStorageToBuket(basketLocStorage)
    }
  }

  const clickSubmit = () => {
    if (
      name !== '' &&
      email !== '' &&
      phone !== '' &&
      address !== '' &&
      basket.length !== 0
    ) {
      postToDB()
    } else {
      if (submitRef.current) {
        submitRef.current.style.background = 'rgb(255, 73, 36)'
        setTimeout(() => {
          submitRef.current.style.background = '#000000'
        }, 200)
      }
    }
  }

  const clickActivate = () => {
    if (!isCouponUsed) {
      getCouponRequest()
      setIsCouponeUsed(true)
    }
  }

  const getCouponRequest = () => {
    fetch(`${domain}/coupon`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // getCouponsSuccess(res)

        res.forEach((el) => {
          if (el.code == codeInput) setPercents(el.percents)
        })
      })
      .catch((e) => {
        // getCouponsError(e)
      })
  }

  const postToDB = () => {
    const orderData = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      itemsId: basket,
      // itemsId: basket.map((el) => el.id),
    }

    const URL = `${domain}/order`

    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    }).then((res) => {
      if (res.status === 201) {
        setNameInput('')
        setPhoneInput('')
        setEmailInput('')
        setAddressInput('')
        dispatch({ type: CLEAR_ITEMS_FROM_BUSKET })
        localStorage.removeItem('basket')
      }
    })
  }

  useEffect(() => {
    setInitialBasket()
  }, [])

  return (
    <div className="BasketSection">
      <div className="BasketSection_Left">
        <div className="BasketSection_Left_Wrap">
          <div className="BasketSection_Left_Wrap_El">
            <div className="BasketSection_Left_Wrap_El_Title">Name</div>
            <input
              onChange={(e) => setNameInput(e.target.value)}
              value={name}
              className="BasketSection_Left_Wrap_El_Input"
            />
          </div>

          <div className="BasketSection_Left_Wrap_El">
            <div className="BasketSection_Left_Wrap_El_Title">Email</div>
            <input
              onChange={(e) => setEmailInput(e.target.value)}
              value={email}
              className="BasketSection_Left_Wrap_El_Input"
            />
          </div>

          <div className="BasketSection_Left_Wrap_El">
            <div className="BasketSection_Left_Wrap_El_Title">Phone</div>
            <input
              onChange={(e) => setPhoneInput(e.target.value)}
              value={phone}
              className="BasketSection_Left_Wrap_El_Input"
            />
          </div>

          <div className="BasketSection_Left_Wrap_El">
            <div className="BasketSection_Left_Wrap_El_Title">Address</div>
            <input
              onChange={(e) => setAddressInput(e.target.value)}
              value={address}
              className="BasketSection_Left_Wrap_El_Input"
            />
          </div>
        </div>

        <div className="BasketSection_Left_Coupon">
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className="BasketSection_Left_Coupon_Input"
            placeholder="coupon code"
          />

          <div
            onClick={clickActivate}
            className="BasketSection_Left_Coupon_Button"
          >
            Activate
          </div>
        </div>
      </div>

      <div className="BasketSection_Right">
        <div className="BasketSection_Right_Wrap_WRAP">
          <div className="BasketSection_Right_Wrap">
            {basket.map((el, index) => (
              <ItemCofigurate key={`BSRW_${el.id}`} el={el} />
            ))}
          </div>
        </div>

        <div className="BasketSection_Right_Submit">
          <div className="BasketSection_Right_Submit_Total">
            {countTotal() - (countTotal() * percents) / 100}$
          </div>
          <div
            ref={submitRef}
            onClick={clickSubmit}
            className="BasketSection_Right_Submit_Button"
          >
            Submit
          </div>
        </div>
      </div>
    </div>
  )
}

export default Basket
