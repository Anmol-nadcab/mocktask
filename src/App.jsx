import React, { useEffect, useState } from 'react'
import Header from './component/header'
import { useSelector } from 'react-redux'

export default function App() {
  const store = useSelector((state)=>state)
  const [handleAmount,setHandleAmount] = useState();
  
  const UserDeposit = (()=>{
   var  amt = (handleAmount*1e18).toString()
   alert(amt)
    store?.counter?.webRecord?.exchange_contract?.methods.deposit(amt).send({
      from:store?.counter?.walletAddress,
      value:0,
    }).then((res)=>{
      alert("Amount Staked ");
    }).catch((err)=>{
      alert("Something Went Wrong");
    })
  })  
  // console.log(handleAmount)

  return (
    <>
    <Header/>
    <div >
      <h1 className='mt-5 fw-bolder text-center'> DEPOSIT AMOUNT</h1>

      <div className='containerSetter mt-5 text-center'>
        <div className='fs-5 fw-bold my-3'>
          Enter Staking Amount
        </div>
        <div>
          <input onChange={(e)=>{
            setHandleAmount(e.target.value)
          }} required  pattern="[0-9]+" type="text"/>
        </div>

        <button onClick={UserDeposit} className=' mt-3 btn btn-success'>
          Stake Amount
        </button>

      </div>


    </div>
            
    </>
  )
}
