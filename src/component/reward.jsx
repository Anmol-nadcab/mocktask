import React, { useEffect, useState } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { exchange_contract, startNow, token_contract } from "../helper/getWeb3";
import { setWAlletAddress } from "../redux/slice";
import { exchange_contract_address } from "../helper/config";

export default function Reward() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [maxSellingPercent, setMaxSellingPercent] = useState(0);
  const [nftHold, SetnftHold] = useState(0);
  const [ticketLatestPrice, SetTicketLatestPrice] = useState(0);
  const [tokenid, SetTokenid] = useState(0);
  const [tokenPrice, SetTokenPrice] = useState(0);

  const maxPercentage = () => {
    exchange_contract?.methods
      .maxPercent()
      .call()
      .then((res) => {
        setMaxSellingPercent(res);
        // console.log(res, "resssss");
      });
  };

  const currentTokenId = () => {
    if (store?.counter?.walletAddress ) {
        exchange_contract?.methods
        .userNftInfo(store?.counter?.walletAddress)
        .call()
        .then((res) => {
          SetnftHold(res.nftId)
          exchange_contract?.methods
          .returnNftLastPrice(res.nftId)
          .call()
          .then((resposne) => {
            SetTicketLatestPrice(resposne);
            
          })
        });
    } else {
      startNow().then((res) => {
        dispatch(setWAlletAddress({ data: res.userAddress }));
      });
    }
  };

  const listToken =(()=>{
    console.log(tokenid,tokenPrice,"tokenid,tokenPrice");
    exchange_contract?.methods
    .sellToken_List(tokenid,tokenPrice)
    .send({
      from: store?.counter?.walletAddress,
      value: 0,
    }).then((res)=>{
      alert("succesfull");
    }).catch((err)=>{
      alert("execution failed  ");
    })
  })

  useEffect(() => {
    maxPercentage();
    currentTokenId();
  }, [store]);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-5 fw-bold text-center">Sell Festival Ticket </h1>
        <div className="row">
          <div className="col-sm card-4 p-4   mx-1 fw-bold">
            <h2 className=" text-center   pb-3"> List Your Token </h2>
            <div className="d-flex pb-3 justify-content-between ">
              <span>Max Selling : {maxSellingPercent}%</span>{" "}
              <span>Owned Ticket ID :{nftHold}</span>
            </div>
            <div className=" mb-3 d-flex justify-content-between">
              <span>Current Price :{ticketLatestPrice/1e18} NTT</span>
            </div>
            <div className="d-flex justify-content-around">
              {" "}
              <label htmlFor="tokenInput">Enter Token ID</label>{" "}
              <input
                className="decoInput"
                placeholder="Token Id"
                onChange={(e)=>{
                  SetTokenid(e.target.value);

                }}
                type="text"
                name="tokenInput"
                id="tokenInput"
              />{" "}
            </div>
            <div>
              <div className="d-flex justify-content-around">
                {" "}
                <label htmlFor="tokenInput">
                  Enter price &nbsp;&nbsp; &nbsp; &nbsp;{" "}
                </label>{" "}
                <input
                  className="decoInput"
                  onChange={(e)=>{
                    SetTokenPrice(e.target.value);
  
                  }}
                  placeholder="listing Price"
                  type="text"
                  name="priceInput"
                  id="priceInput"
                />{" "}
              </div>
            </div>
            <button onClick={listToken} className=" mt-3 w-100 btn btn-success">List now </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
