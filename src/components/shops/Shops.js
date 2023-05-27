import React, { useEffect, useRef } from 'react'
import '../shops/shops.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  ADD_ITEM_TO_BUSCKET,
  FETCH_SHOPLIST_ERROR,
  FETCH_SHOPLIST_SUCCESS,
  REMOVE_ITEM_FROM_BASKET,
  SET_BUSKET_SHOP_NAME,
  SET_FROM_LOC_STORAGE_TO_BUSCKET,
  SET_SHOPINDEX_SELECTED,
  SET_SHOPNAME_SELECTED,
} from '../../redux/reducerConst'
import { IonIcon } from '@ionic/react'
import {
  pricetagsOutline,
  bagAddOutline,
  bagRemoveOutline,
} from 'ionicons/icons'

function Shops() {
  const dispatch = useDispatch()
  const shopsListSuccess = (data) => {
    dispatch({ type: FETCH_SHOPLIST_SUCCESS, payload: data })
  }
  const shopsListError = (error) => {
    dispatch({ type: FETCH_SHOPLIST_ERROR, error: error })
  }
  const shopNameSelected = (data) => {
    dispatch({ type: SET_SHOPNAME_SELECTED, payload: data })
  }
  const shopIndexSelected = (data) => {
    dispatch({ type: SET_SHOPINDEX_SELECTED, payload: data })
  }
  const addItemToBuscket = (data) => {
    dispatch({
      type: ADD_ITEM_TO_BUSCKET,
      payload: { ...data, amount: 1 },
    })
  }
  const removeItemFromBasket = (data) => {
    dispatch({ type: REMOVE_ITEM_FROM_BASKET, payload: data })
  }
  const setBusketShopName = (data) => {
    dispatch({ type: SET_BUSKET_SHOP_NAME, payload: data })
  }
  const setFromLocStorageToBuket = (data) => {
    dispatch({ type: SET_FROM_LOC_STORAGE_TO_BUSCKET, payload: data })
  }

  const state = useSelector((state) => state)
  const { domain } = state.settings
  const { loading, data } = state.shopsList
  const { shopName, shopIndex, basket, busketShopName } = state.selected
  const shopsListRef = useRef(null)
  const activeWord = 'active'
  // =========================================================

  const clickShopSelect = (e, index) => {
    if (shopsListRef !== null && shopsListRef.current !== null) {
      shopNameSelected(e.target.innerText.split('\n')[0])
      shopIndexSelected(index)
    }
  }

  const isBasketIncludes = (propId) => {
    for (let i = 0; i < basket.length; i++) {
      if (basket[i].id === propId) return true
    }

    return false
  }
  const clickAddItem = (el) => {
    if (!isBasketIncludes(el.id)) {
      addItemToBuscket(el)
    } else {
      removeItemFromBasket(el.id)
      setBusketShopName('')
    }
  }

  // =========================================================
  const setInitialBasket = (res) => {
    const basketLocStorage = JSON.parse(localStorage.getItem('basket'))
    if (basketLocStorage) {
      setFromLocStorageToBuket(basketLocStorage)
    } else {
      shopNameSelected(res[0].name)
      shopIndexSelected(0)
    }
  }
  useEffect(() => {
    fetch(`${domain}/lists`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        shopsListSuccess(res)
        setInitialBasket(res)
        // shopNameSelected(res[0].name)
        // shopIndexSelected(0)
      })
      .catch((e) => {
        shopsListError(e)
      })
  }, [])

  const ShopElement = ({ el, index }) => {
    return (
      <div
        onClick={(e) => {
          if (busketShopName == el.name || busketShopName == '')
            clickShopSelect(e, index)
        }}
        className={`ShopsSection_Wrap_Left_Wrap_El ${
          shopName == el.name ? activeWord : ''
        } ${
          busketShopName == el.name || busketShopName == '' ? '' : 'disable'
        }`}
      >
        <div className="ShopsSection_Wrap_Left_Wrap_El_Name">{el.name}</div>
        <div className="ShopsSection_Wrap_Left_Wrap_El_Amount">
          <IonIcon icon={pricetagsOutline} />
          {el.items.length}
        </div>
      </div>
    )
  }
  const ItemElement = ({ el }) => {
    return (
      <div className="ShopsSection_Wrap_Right_Wrap_El">
        <div
          className="ShopsSection_Wrap_Right_Wrap_El_ImageWrap_Image"
          style={{ backgroundImage: `url(${el.img})` }}
        ></div>

        <div className="ShopsSection_Wrap_Right_Wrap_El_Bottom">
          <div className="ShopsSection_Wrap_Right_Wrap_El_Bottom_Name">
            {el.price}$
          </div>
          <div
            onClick={() => clickAddItem(el)}
            className="ShopsSection_Wrap_Right_Wrap_El_Bottom_Button"
          >
            {!isBasketIncludes(el.id) ? (
              <IonIcon
                className="ShopsSection_Wrap_Right_Wrap_El_Bottom_Button_Icon"
                icon={bagAddOutline}
              />
            ) : (
              <IonIcon
                className="ShopsSection_Wrap_Right_Wrap_El_Bottom_Button_Icon"
                icon={bagRemoveOutline}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="ShopsSection">
      <div className="ShopsSection_Wrap">
        <div className="ShopsSection_Wrap_Left">
          <div ref={shopsListRef} className="ShopsSection_Wrap_Left_Wrap">
            {!loading ? (
              <>
                {data.map((el, index) => (
                  <ShopElement key={el._id} el={el} index={index} />
                ))}
              </>
            ) : (
              <>loading...</>
            )}
          </div>
        </div>

        <div className="ShopsSection_Wrap_Right">
          {!loading && shopIndex !== null ? (
            <div className="ShopsSection_Wrap_Right_Wrap">
              {data[shopIndex].items.map((el, index) => (
                <ItemElement key={el._id} el={el} />
              ))}
            </div>
          ) : (
            <>loading...</>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shops
