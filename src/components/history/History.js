import React, { useEffect, useState } from 'react'
import '../history/history.scss'
import { useDispatch, useSelector } from 'react-redux'
import { SET_HISTORY_SUCCESS } from '../../redux/reducerConst'

function History() {
  const dispatch = useDispatch()
  const setHistorySuccess = (data) => {
    dispatch({ type: SET_HISTORY_SUCCESS, payload: data })
  }
  const setHistoryError = (error) => {
    dispatch({ type: SET_HISTORY_SUCCESS, error: error })
  }

  // ====================================================

  const state = useSelector((state) => state)
  const { domain } = state.settings
  const { loading, data, error } = state.history
  const [emailInput, setEmailInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')

  // ====================================================

  const clickFind = () => {
    if (emailInput !== '' && phoneInput !== '') {
      getOrderList()
    }
  }

  const getOrderList = () => {
    const URL = `${domain}/orders`

    fetch(URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const arr = res.filter(
          (el) => el.email === emailInput && el.phone === phoneInput,
        )
        setHistorySuccess(arr)
      })
      .catch((e) => {
        setHistoryError(e)
      })
  }

  const Brick = ({ el }) => {
    return (
      <div className="BrickSection">
        <div
          className="BrickSection_Image"
          style={{ backgroundImage: `url(${el.img})` }}
        ></div>

        <div className="BrickSection_Main">
          <div className="BrickSection_Main_Name">{el.name}</div>
          <div className="BrickSection_Main_Result">
            {el.price}$ * {el.amount} = <span>{el.price * el.amount}$</span>
          </div>
        </div>
      </div>
    )
  }

  const HistoryBlock = ({ el }) => {
    const countTotal = (arr) => {
      return arr.reduce((res, el) => res + el.amount * el.price, 0)
    }

    return (
      <div className="HistoryBlock">
        <div className="HistoryBlock_Left">
          <div className="HistoryBlock_Left_Wrap">
            {el.itemsId.map((item, index) => (
              <Brick key={`HSBWEL_${index}`} el={item} />
            ))}
          </div>
        </div>

        <div className="HistoryBlock_Right">
          <div className="HistoryBlock_Right_Wrap">
            {countTotal(el.itemsId)}$
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="HistorySection">
      <div className="HistorySection_Top_Wrap">
        <div className='HistorySection_Top_Wrap_Wrap'>
          <div className="HistorySection_Top">
            <div className="HistorySection_Top_El">
              <div className="HistorySection_Top_El_Title">Email</div>
              <input
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                }}
                className="HistorySection_Top_El_Input"
              />
            </div>

            <div className="HistorySection_Top_El">
              <div className="HistorySection_Top_El_Title">Phone</div>
              <input
                value={phoneInput}
                onChange={(e) => {
                  setPhoneInput(e.target.value)
                }}
                className="HistorySection_Top_El_Input"
              />
            </div>

            <div onClick={clickFind} className="HistorySection_Top_Button">
              Find
            </div>
          </div>
        </div>
      </div>

      <div className="HistorySection_Bottom">
        {!loading && data.length !== 0 ? (
          <div className="HistorySection_Bottom_Wrap">
            {data.map((el, index) => (
              <HistoryBlock key={`HSBW_${index}`} el={el} />
            ))}
          </div>
        ) : (
          <></>
        )}
        {!loading && data.length === 0 ? (
          <div className="HistorySection_Bottom_Nothing">nothing here 😢</div>
        ) : null}
      </div>
    </div>
  )
}

export default History
