import React, { useEffect, useState } from "react";
import Header from "./component/header";
import { useSelector } from "react-redux";
import { useFetcher } from "react-router-dom";
import { exchange_contract_address } from "./helper/config";
import { exchange_contract, startNow, token_contract } from "./helper/getWeb3";
import { logDOM } from "@testing-library/react";

export default function App() {
  const store = useSelector((state) => state);
  const [handleAmount, setHandleAmount] = useState(0);
  const [initialPrice, setInitialPrice] = useState(0);
  const [bidPrice, setBidPrice] = useState(0);
  const [ticketLeft, setticketLeft] = useState(0);
  const [adminFees, setAdminFees] = useState(0);
  const [currentTicket, SetCurrentTicket] = useState(0);
  const [listed , setListed] = useState([]);


  var counter = 0;

  const buyFromOrginser = () => {
    if((store?.counter?.walletAddress).length>=30 ){
    token_contract.methods
      .allowance(store?.counter?.walletAddress, exchange_contract_address)
      .call()
      .then((res) => {
        exchange_contract?.methods
          .initalPrice()
          .call()
          .then((response) => {
            if (res >= response) {
              exchange_contract?.methods
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
            } else {
              token_contract.methods
                .approve(exchange_contract_address, response)
                .send({
                  from: store?.counter?.walletAddress,
                  value: 0,
                })
                .then((rss) => {
                  alert("Token Approved");
                  exchange_contract?.methods
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
                })
                .catch((ee) => {
                  alert("execution failed ");
                });
            }
          });
      });
    }else{
      alert("connect Wallet");
    }
  };

  const remainingToken = () => {
    exchange_contract?.methods
      .tokenLeft()
      .call()
      .then((res) => {
        setticketLeft(res);
        
      });
  };

  const adminFess = () => {
    exchange_contract?.methods
      .feesPercent()
      .call()
      .then((res) => {
        setAdminFees(res);

      });
  };

  const initPrice = () => {
    exchange_contract?.methods
      .initalPrice()
      .call()
      .then((res) => {
        setInitialPrice(res);
        
      });
  };
  const curentTicket = () => {
    exchange_contract?.methods
      .idProvider()
      .call()
      .then((res) => {
        SetCurrentTicket(res);
        
      });
  };
  const askingBidPrice = () => {
  
    exchange_contract?.methods
    // console.log()
      .BidticketPrice(handleAmount)
      .call()
      .then((res) => {
        setBidPrice(res);
       
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

  const buyFromSeller = () => {
  if((store?.counter?.walletAddress).length>=30 ){
    token_contract.methods
      .allowance(store?.counter?.walletAddress, exchange_contract_address)
      .call()
      .then((res) => {
        exchange_contract?.methods
          .BidticketPrice(handleAmount)
          .call()
          .then((response) => {
            if (res >= response) {
              exchange_contract?.methods
                .buyListedToken(handleAmount)
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
            } else {
              token_contract.methods
                .approve(exchange_contract_address, response)
                .send({
                  from: store?.counter?.walletAddress,
                  value: 0,
                })
                .then((rss) => {
                  alert("Token Approved");
                  exchange_contract?.methods
                    .buyListedToken(handleAmount)
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
                })
                .catch((ee) => {
                  alert("execution failed");
                });
            }
          });
      });
    }else{
    alert("conect wallet");
    }
  };

  // const isListed = ()=>{
  //   exchange_contract?.methods
   
  //     .ticketForSale()
  //     .call()
  //     .then((res) => {
  //       console.log(res,"rss");
       
  //     });
  // }
  // isListed
  // const showcase = async () => {
  //   const data = [];
  //   for (var i = 1; i <= 10; i++) {
  //     const res = await exchange_contract?.methods.BidticketPrice(i).call();
  //     data.push(res);
  //     console.log(res,data,"asdasdad");
  //   }
  //   setListed(data);
  // };
  

  // showcase();

  useEffect(() => {
    // isListed();
    remainingToken();
    initPrice();
    adminFess();
    curentTicket();
  },[]);

  return (
    <>
      <Header />
      <div className="">
          <div></div>
      </div>
      <div className="container">
        <h1 className="my-5 fw-bolder text-center"> Buy Festival Ticket </h1>
        <div className="row">
          <div className="col-sm card-4 p-4   mx-1 fw-bold">
            <h2 className=" text-center   pb-3"> Buy Ticket From Orgniser </h2>
            <div className="d-flex pb-3 justify-content-between ">
              <span>Fixed Price Ticket</span>{" "}
              <span>Token Left :{ticketLeft}</span>
            </div>
            <div className=" mb-3 d-flex justify-content-between">
              <span>Inital Price : {initialPrice/1e18} NTT</span>
            </div>  
             <div className=" mb-3 d-flex justify-content-between">
              <span>Ticket Tracker  : {currentTicket} NTT</span>
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
              <span>Bid Ticket</span> <span>organiser Fees : {adminFees}%</span>
            </div>
            <div className=" mb-2 d-flex justify-content-between">
              <span>Bid Price : {bidPrice} NTT</span> <span>Total Price : {(bidPrice/1e18).toFixed(4)} NTT </span>
            </div>
            <div  className="mb-3 d-flex justify-content-between">
              <label className="pt-1" htmlFor="setForTicketId">Enter Ticket ID</label>
              <input
              
                className="decoInput"
                onChange={(e) => {
                  
                  setHandleAmount(e.target.value);
                
                  
                }}
                placeholder="Enter Token Id"
                type="text"
                name="setForTicketId"
                id="setForTicketId"
              />
              <div onClick={askingBidPrice} className="btn btn-success">Check Bid Price</div>
            </div>
            <button onClick={buyFromSeller} className="w-100  btn btn-success">
              Buy now{" "}
            </button>
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
