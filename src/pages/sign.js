import { useState } from "react";
import { signTransaction } from "../utils/transaction";

function Sign() {
  const [signed, setSigned] = useState("");
  const [tx, setTx] = useState("");
  const [privKeyWif, setPrivKeyWif] = useState("");
  const [size, setSize] = useState("");

  const onSign = async (key, txHash) => {
    const { tx, size } = await signTransaction(txHash, key);

    setSigned(tx);
    setSize(size);
  };

  return (
    <div>
      <div className="tab-pane tab-content" id="sign">
        <h2>
          Sign Transaction <small>once a transaction has been verified</small>
        </h2>
        <p>
          Once you have <a href="#verify">verified</a> a transaction you can
          sign and then <a href="#broadcast">broadcast</a> it into the network.
        </p>
        <div className="row">
          <div className="col-md-12">
            <label for="signPrivateKey">Private key</label>

            <div className="input-group">
              <input
                id="signPrivateKey"
                type="string"
                className="form-control"
                value={privKeyWif}
                onChange={(e) => setPrivKeyWif(e.target.value)}
              />
              <span className="input-group-btn">
                <button className="showKey btn btn-default" type="button">
                  Show
                </button>
              </span>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <textarea
              type="text"
              id="signTransaction"
              className="form-control"
              style={{ height: "125px" }}
              value={tx}
              onChange={(e) => setTx(e.target.value)}
            ></textarea>
          </div>
        </div>
        <br />
        <a
          href="!#"
          onClick={(e) => e.preventDefault()}
          id="signAdvancedCollapse"
        >
          <div className="well well-sm">
            <span className="glyphicon glyphicon-collapse-down"></span> Advanced
            Options
          </div>
        </a>
        <div id="signAdvanced" className="hidden">
          <div className="row">
            <div className="col-md-12">
              <label for="sighashType">Sig Hash Type</label>

              <select id="sighashType" className="form-control">
                <option
                  value="1"
                  rel="SIGHASH_ALL: Signs all the inputs and outputs, protecting everything against modification."
                >
                  ALL (default)
                </option>
                <option
                  value="2"
                  rel="SIGHASH_NONE: Signs all of the inputs but none of the outputs, allowing anyone to change where the satoshis are going unless other signatures using other signature hash flags protect the outputs."
                >
                  NONE
                </option>
                <option
                  value="3"
                  rel="SIGHASH_SINGLE: The only output signed is the one corresponding to this input, ensuring nobody can change your part of the transaction but allowing other signers to change their part of the transaction."
                >
                  SINGLE
                </option>
                <option
                  value="129"
                  rel="SIGHASH_ALL|SIGHASH_ANYONECANPAY: Signs all of the outputs but only this one input, it allows anyone to add or remove other inputs, so anyone can contribute additional satoshis but they cannot change how many satoshis are sent nor where they go."
                >
                  ALL|ANYONECANPAY
                </option>
                <option
                  value="130"
                  rel="SIGHASH_NONE|SIGHASH_ANYONECANPAY: Signs only this one input and allows anyone to add or remove other inputs or outputs, so anyone who gets a copy of this input can spend it however they'd like."
                >
                  NONE|ANYONECANPAY
                </option>
                <option
                  value="131"
                  rel="SIGHASH_SINGLE|SIGHASH_ANYONECANPAY: Signs this one input and its corresponding output. Allows anyone to add or remove other inputs."
                >
                  SINGLE|ANYONECANPAY
                </option>
              </select>
            </div>
          </div>

          <br />

          <div className="alert alert-info" id="sighashTypeInfo">
            SIGHASH_ALL: The default, signs all the inputs and outputs,
            protecting everything except the signature scripts against
            modification.
          </div>
        </div>
        <div className="alert alert-danger hidden" id="signedDataError">
          <span className="glyphicon glyphicon-exclamation-sign"></span> There
          is a problem with one or more of your inputs, please check and try
          again
        </div>
        {signed && (
          <div className="alert alert-success" id="signedData">
            <label>Signed transaction</label>
            <button
              className="qrcodeBtn btn btn-default"
              type="button"
              data-toggle="modal"
              data-target="#modalQrcode"
              style={{ float: "right" }}
            >
              <span className="glyphicon glyphicon-qrcode"></span>
            </button>
            <p>The above transaction has been signed:</p>

            <textarea
              className="form-control script"
              style={{ height: "160px" }}
              readOnly
              value={signed}
            ></textarea>

            <div className="row">
              <div className="col-md-12">
                <p className="text-muted" style={{ float: "left" }}>
                  Size: <span className="txSize">{size}</span> <i>bytes</i>
                </p>
                <div style={{ float: "right", marginTop: "10px" }}>
                  <button className="btn btn-info signedToVerify" type="button">
                    Verify
                    <span className="glyphicon glyphicon-ok"></span>
                    and share
                  </button>
                  Or
                  <button
                    className="btn btn-info signedToBroadcast"
                    type="button"
                  >
                    Broadcast
                    <span className="glyphicon glyphicon-globe"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <input
          type="button"
          value="Sign"
          className="btn btn-primary"
          id="signBtn"
          onClick={() => onSign(privKeyWif, tx)}
        />
        Or
        <input
          type="button"
          value="Sign with Ledger"
          className="btn btn-primary"
          id="signLedgerBtn"
        />
        <br />
      </div>
    </div>
  );
}

export default Sign;
