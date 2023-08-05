import React, { useEffect, useState } from 'react'
import Header from './header'
import { useSelector } from 'react-redux'

export default function Reward() {
  const store = useSelector((state)=>state)
  const [handleAmount,setHandleAmount] = useState();
  const [handleRoi,setHandleRoi] = useState(0);


  const UserWithdraw = (()=>{
    var  amt = (handleAmount*1e18).toString()
    
    store?.counter?.webRecord?.exchange_contract?.methods.withdraw(amt).send({
      from:store.counter.walletAddress,
      value:0,
    }).then((res)=>{
      alert("Amount Staked ");
    }).catch((err)=>{
      alert("Something Went Wrong");
    })
  })  
  // console.log(handleAmount)
  

  const userRoi = (()=>{
    store?.counter?.webRecord?.exchange_contract?.methods.pendingReward(store.counter.walletAddress)
    .call()
    .then((res)=>{
      setHandleRoi(res);
      console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
  })
  useEffect(()=>{
    setInterval(()=>{
      userRoi()
    },1000);
   
  },[store.counter.walletAddress])

  return (
   <>
   <Header/>
   <div >
      <h1 className='mt-5 fw-bolder text-center'> CLAIM AMOUNT</h1>

      <div className='containerSetter mt-5 text-center'>
        <div className='fs-5 fw-bold my-3'>
          Available For Harvest 
        </div>
        <div>
          <input value={handleRoi} required  readOnly type="text"/>
        </div>
        <div className='fs-5 fw-bold my-3'>
         Enter Amount to Harvest 
        </div>
        <div>
          <input onChange={(e)=>{
            setHandleAmount(e.target.value )
          }}   pattern="[0-9]+" type="text"/>
        </div>

        <button onClick={UserWithdraw} className=' mt-3 btn btn-success'>
          Claim Amount
        </button>

      </div>


      


    </div>
   </>
  )
}
