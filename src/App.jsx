import React, { useEffect, useState } from "react";
import Header from "./component/header";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import { exchange_contract_address } from "./helper/config";

export default function App() {
  const store = useSelector((state) => state);
  const [handleAmount, setHandleAmount] = useState();
  var counter = 0;
 

  const buyFromOrginser = () => {
    store?.counter?.tokenRecord.methods
      .allowance(store?.counter?.walletAddress, exchange_contract_address)
      .call()
      .then((res) => {
        store?.counter?.webRecord?.exchange_contract?.methods
          .initalPrice()
          .call()
          .then((response)=>{
            if(res>= response){
            store?.counter?.webRecord?.exchange_contract?.methods
                .buyTicketFromOrgniser()
                .send({
                    from: store?.counter?.walletAddress,
                    value: 0,
               })
                .then((res) => {
                  alert("Token Purchased");
                })
        .catch((err) => {
          alert("Something Went Wrong ");
        });
            }else {
              store?.counter?.tokenRecord.methods
              .approve(exchange_contract_address,response)
              .send({
                from: store?.counter?.walletAddress,
                value: 0,
              }).then((rss)=>{
                alert("Token Approved");
                store?.counter?.webRecord?.exchange_contract?.methods
                .buyTicketFromOrgniser()
                .send({
                    from: store?.counter?.walletAddress,
                    value: 0,
               })
                .then((res) => {
                  alert("Token Purchased");
                })
        .catch((err) => {
          alert("Something Went Wrong ");
        });
              }).catch((ee)=>{
          alert("execution failed");

              })
            }
          })
      });

   
  };

  const showmorebid = () => {
    if (counter == 0) {
      document.getElementById("showbox1").style.display = "block";
      counter = 1;
    } else if (counter == 1) {
      document.getElementById("showbox1").style.display = "none";
      counter = 0;
    }
  };
  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-5 fw-bolder text-center"> Buy Festival Ticket </h1>
        <div className="row">
          <div className="col-sm card-4 p-4   mx-1 fw-bold">
            <h2 className=" text-center   pb-3"> Buy Ticket From Orgniser </h2>
            <div className="d-flex pb-3 justify-content-between ">
              <span>Fixed Price Ticket</span> <span>Token Left :1000</span>
            </div>
            <div className=" mb-3 d-flex justify-content-between">
              <span>Inital Price : 1 NTT</span>
            </div>

            <button
              onClick={buyFromOrginser}
              className=" w-100 btn btn-success"
            >
              Buy now{" "}
            </button>
          </div>

          <div className="col-sm card-4 p-4 fw-bold">
            <h2 className=" text-center   pb-3"> Buy Ticket </h2>
            <div className=" pb-3 d-flex justify-content-between">
              <span>Bid Ticket</span> <span>organiser Fees : 5%</span>
            </div>
            <div className=" mb-3 d-flex justify-content-between">
              <span>Bid Price : 1 NTT</span> <span>Total Price : 1 NTT </span>
            </div>
            <button className="w-100  btn btn-success">Buy now </button>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between">
            {" "}
            <span></span>
            <u style={{ cursor: "pointer" }} onClick={showmorebid}>
              Show More
            </u>
          </div>
          <div id="showbox1" className="text-center fw-normal fs-6 mt-3">
            <p>
              For buying You should Have NTT Token In Your Wallet
              <a href="https://testnet.bscscan.com/address/0xe67b48aa9eaef49a9c23f9bdbcfe7aec191b6c39#writeContract">
                (0xe6...6C39)
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
