import React, { useEffect, useState } from 'react'
import Header from './component/header'
import { useSelector } from 'react-redux'

export default function App() {
  const store = useSelector((state)=>state)
  const [handleAmount,setHandleAmount] = useState();
  
  const UserDeposit = (()=>{
   var  amt = (handleAmount*1e18).toString()
   
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
          Enter Staking Amount (<a className='fs-6' href="https://testnet.ftmscan.com/address/0x75e7146bb84849e1030a195fb76306d49b5ba8bc"> with token 0x7..A8Bc</a>)
        </div>
        <div className='row'> 
        <div className='col-sm'>
          <input className='me-5' onChange={(e)=>{
            setHandleAmount(e.target.value)
          }} required  pattern="[0-9]+" type="text"/>
          </div>
          <div className='col'>
           <div className='text-danger'>
            APY
           </div>
           <div>
            6%
           </div>
          </div>

          <div className='col '>
           <div className='text-danger'>
            Locking Time
           </div>
           <div>
            170 days
           </div>
          </div>
          
        </div>

        <button onClick={UserDeposit} className=' mt-3 btn btn-success'>
          Stake Amount
        </button>

      </div>


    </div>
            
    </>
  )
}
