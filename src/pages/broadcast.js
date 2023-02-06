import { useState } from "react";
import { brodcastTransaction } from "../utils/transaction";

function BroadCast() {
  const [tx, setTx] = useState("");
  const [txHash, setTxHash] = useState("");

  const onBroadcast = async (tx) => {
    if (!tx) return;
    const res = await brodcastTransaction(tx);
    setTxHash(res);
  };

  return (
    <div>
      <div className="tab-pane tab-content" id="broadcast">
        <h2>
          Broadcast Transaction <small>into the network</small>
        </h2>
        <a href="#settings" style={{ float: "right" }}>
          <span className="glyphicon glyphicon-cog"></span>
        </a>
        <p>Enter your hex encoded transaction</p>
        <textarea
          className="form-control"
          style={{ height: "125px" }}
          id="rawTransaction"
          value={tx}
          onChange={(e) => {
            setTx(e.target.value);
          }}
        ></textarea>
        <br />

        {txHash && (
          <div id="rawTransactionStatus" className="alert alert-success">
            Transaction Id: {txHash}
          </div>
        )}
        <button
          id="rawSubmitBtn"
          className="btn btn-primary signedToBroadcast"
          type="button"
          onClick={() => onBroadcast(tx)}
        >
          Broadcast
          <span className="glyphicon glyphicon-globe"></span>
        </button>
        <br />
      </div>
    </div>
  );
}

export default BroadCast;
