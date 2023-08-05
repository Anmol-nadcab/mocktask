import React, { useEffect, useState } from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'
import { startNow } from '../helper/getWeb3'
import { setWAlletAddress, setWebRecord, webRecord } from '../redux/slice';
import {useDispatch, useSelector} from "react-redux"

export default function Header() {
  const dispatch = useDispatch();
  const store = useSelector((state)=>state)
  // console.log(store,"store")


  const [response, setResponse ] = useState("");

  const connect = (()=>{
    startNow().then((res)=>{
      console.log(res);
      // setWalletAdd(res.userAddress);
      dispatch(setWAlletAddress({data:res.userAddress}))
      dispatch(setWebRecord({data:res}))
    }).catch((err)=>{
      console.log(err);
    })
  })

    

  return (
      <>
    <nav className="navbar navbar-expand-lg navbar-light  bg-Red_setter">
  <div className="container-fluid">
    <a className="  navbar-brand text-white" href="#"> TESTING</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
      <Link to="/" className=" mx-5 nav-link active" aria-current="page" href="#"><span className='text-white fw-bold'> Deposit  </span></Link>
       <Link to="/reward" className=" mx-5  nav-link" href="#"><span className='text-white fw-bold'> Reward  </span> </Link>
      </div>
    </div>
    <div className="ms-2 ">
              <ul className="navbar-nav">
                <li className="nav-item">
                  
                    <b onClick={connect} style={{ cursor: "pointer" }}>   {(store.counter.walletAddress? "0x...." + (store.counter.walletAddress).slice(29): "Connect Wallet")}</b>
              
                </li>
              </ul>
            </div>

  </div>
</nav>
    </>
  )
}
