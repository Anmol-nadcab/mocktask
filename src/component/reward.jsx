import React, { useEffect, useState } from "react";
import Header from "./header";
import { useSelector } from "react-redux";

export default function Reward() {
  const store = useSelector((state) => state);
  const [handleAmount, setHandleAmount] = useState();
  const [handleRoi, setHandleRoi] = useState(0);

  const UserWithdraw = () => {
    var amt = (handleAmount * 1e18).toString();
    console.log(store)
    store?.counter?.webRecord?.exchange_contract?.methods
      .withdraw(amt)
      .send({
        from: store.counter.walletAddress,
        value: 0,
      })
      .then((res) => {
        alert("Amount Staked");
      })
      .catch((err) => {
        alert("Something Went Wrong");
      });
  };
  // console.log(handleAmount)

  const userRoi = () => {
    store?.counter?.webRecord?.exchange_contract?.methods
      .pendingReward(store.counter.walletAddress)
      .call()
      .then((res) => {
        setHandleRoi(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setInterval(() => {
      userRoi();
    }, 1000);
  }, [store.counter.walletAddress]);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-5 fw-bold text-center">Sell Festival Ticket </h1>
        <div className="row">
          <div className="col-sm card-4 p-4   mx-1 fw-bold">
            <h2 className=" text-center   pb-3"> List Your Token </h2>
            <div className="d-flex pb-3 justify-content-between ">
              <span>Max Selling : 110%</span> <span>Owned Ticket ID :10</span>
            </div>
            <div className=" mb-3 d-flex justify-content-between">
              <span>Current Price : 1 NTT</span>
            </div>
            <div className="d-flex justify-content-around">
              {" "}
              <label htmlFor="tokenInput">Enter Token ID</label>{" "}
              <input
                className="decoInput"
                placeholder="Token Id"
                type="text"
                name="tokenInput"
                id="tokenInput"
              />{" "}
            </div>
            <div>
              <div className="d-flex justify-content-around">
                {" "}
                <label htmlFor="tokenInput">Enter price &nbsp;&nbsp; &nbsp; &nbsp; </label>{" "}
                <input
                  className="decoInput"
                  placeholder="listing Price"
                  type="text"
                  name="priceInput"
                  id="priceInput"
                />{" "}
              </div>
            </div>
            <button className=" mt-3 w-100 btn btn-success">List now </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
