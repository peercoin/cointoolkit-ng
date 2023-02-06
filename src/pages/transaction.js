import { useMemo, useState } from "react";
import { genTransaction, getUtxos } from "../utils/transaction";

function Transaction() {
  const [addr, setAddr] = useState("");
  const [amount, setAmount] = useState(0.0);
  const [receiverAddr, setReceiverAddr] = useState("");
  const [inputs, setInputs] = useState([]);
  const [tx, setTx] = useState("");
  const [size, setSize] = useState("");

  const onOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const onLoadUtxos = async (addr) => {
    const { address, utxos } = await getUtxos(addr);
    if (!address || !utxos) return;

    setInputs(
      utxos.map((i) => {
        i.amount = Number(i.amount).toFixed(6);
        return i;
      })
    );
  };

  const onRemoveUtxo = async (index, inputs) => {
    const newinputs = [...inputs];
    newinputs.splice(index, 1);
    setInputs(newinputs);
  };

  const onGenTx = async (rAddr, sendAmount, utxos, sender) => {
    if (!rAddr || !sendAmount || utxos.length < 1) return;
    const { tx, size } = genTransaction(utxos, rAddr, sendAmount, sender);
    setTx(tx);
    setSize(size);
  };

  const totalInput = useMemo(() => {
    if (inputs.length > 0) {
      return inputs
        .reduce((partialSum, a) => partialSum + Number(a.amount), 0)
        .toFixed(6);
    }

    return 0.0;
  }, [inputs]);

  const txFee = useMemo(() => {
    const fee = (totalInput - amount).toFixed(6);
    return fee > 0 ? fee : (0.0).toFixed(2);
  }, [totalInput, amount]);

  return (
    <div>
      <div className="tab-pane tab-content" id="newTransaction">
        <h2>
          New Transaction <small>Create a new transaction</small>
        </h2>
        <p>Use this page to create a raw transaction</p>
        <b>Address, WIF key or Multisig Redeem Script</b>:
        <div className="input-group">
          <span className="input-group-btn">
            <button
              className="btn btn-info qrcodeScanner"
              type="button"
              data-toggle="modal"
              data-target="#modalQrcodeScanner"
              forward-result="#redeemFrom"
            >
              <span className="glyphicon glyphicon-camera"></span>
            </button>
          </span>
          <input
            type="text"
            id="redeemFrom"
            className="form-control"
            value={addr}
            onChange={(e) => {
              setAddr(e.target.value);
            }}
          />
          <span className="input-group-btn">
            <button
              id="redeemFromBtn"
              className="btn btn-info"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onLoadUtxos(addr);
              }}
            >
              Load
            </button>
          </span>
        </div>
        <br />
        <div className="hidden alert alert-danger" id="redeemFromStatus"></div>
        <div className="hidden alert alert-info" id="redeemFromAddress"></div>
        <div>
          <a href="!#" id="optionsCollapse">
            <div className="well well-sm">
              <span
                className="glyphicon glyphicon-collapse-down"
                id="glyphcollapse"
              ></span>{" "}
              Advanced Options
            </div>
          </a>

          <div className="hidden" id="optionsAdvanced">
            <label>Clear Inputs</label>
            <p className="checkbox">
              <label>
                <input
                  type="checkbox"
                  id="clearInputsOnLoad"
                  className="checkbox-inline"
                  checked
                  onChange={() => {}}
                />{" "}
                Clear existing inputs when new inputs are loaded.
              </label>
            </p>
            <hr />
            <label>Null Data</label>{" "}
            <span className="text-muted text-normal">
              (80 byte limit, <i>40 bytes recommended</i>)
            </span>
            <p className="checkbox">
              <label>
                <input
                  type="checkbox"
                  id="opReturn"
                  className="checkbox-inline"
                />{" "}
                Allow data to be sent within the transaction and stored in the
                blockchain by using{" "}
                <a
                  href="https://bitcoin.org/en/developer-guide#null-data"
                  target="_blank"
                  rel="noreferrer"
                >
                  OP_RETURN
                </a>
                .
              </label>
              <br />
              <label disabled>
                <input
                  type="checkbox"
                  id="opReturnText"
                  className="checkbox-inline"
                  disabled
                />{" "}
                As plain text{" "}
              </label>
              <span id="opReturnMessage" className="text-muted">
                When using this option you may enter a hex string or address
                into the address field on the output tab.
              </span>
              <span id="opReturnTextMessage" className="text-muted hidden">
                When using this option you may enter a plain text string into
                the address field on the output tab.
              </span>
            </p>
            <hr />
            <label>Lock Time</label>
            <p>
              The{" "}
              <a href="https://bitcoin.org/en/developer-guide#locktime-and-sequence-number">
                locktime
              </a>{" "}
              indicates the earliest time a transaction can be added to the
              block chain.
            </p>
            <input
              type="text"
              className="form-control"
              value="0"
              onChange={() => {}}
              id="nLockTime"
            />
            <hr />
            <div id="txTimeOptional">
              <label>Extra time field</label>
              <p>Indicates the timestamp of a transaction.</p>
              <input
                type="text"
                className="form-control"
                value="0"
                onChange={() => {}}
                id="nTime"
              />

              <hr />
            </div>
            <label>Network</label>
            <p>
              The <a href="#settings">settings</a> page can be used to select
              alternative networks of which you can retrieve your unspent
              outputs and broadcast a signed transaction into.
            </p>
            <hr />
          </div>
        </div>
        <ul className="nav nav-tabs" id="putTabs">
          <li className="active">
            <a href="#txoutputs" data-toggle="tab">
              Outputs{" "}
              <small>
                (
                <span id="totalOutput">{(Number(amount) || 0).toFixed(6)}</span>
                )
              </small>
            </a>
          </li>
          <li>
            <a href="#txinputs" data-toggle="tab">
              Inputs{" "}
              <small>
                (<span id="totalInput">{totalInput}</span>)
              </small>
            </a>
          </li>
        </ul>
        <br />
        <div className="tab-content">
          <div className="tab-pane fade in active" id="txoutputs">
            <p>Enter the address and amount you wish to make a payment to.</p>
            <div className="row">
              <div className="col-xs-4">
                <label>
                  <abbr title="Address to send to">Address</abbr>
                </label>
              </div>
              <div className="col-xs-2">
                <label>
                  <abbr title="Amount to send">Amount</abbr>
                </label>
              </div>
              <div className="col-xs-5">
                <label>
                  <abbr title="Receiver of the payment">
                    Identity{" "}
                    <span className="text-muted">
                      (if{" "}
                      <a
                        href="!#"
                        onClick={() => onOpenLink("/known-pubkeys.js")}
                        target="_blank"
                        rel="noreferrer"
                      >
                        known
                      </a>
                      )
                    </span>
                  </abbr>
                </label>
              </div>
              <div className="col-xs-1"></div>
            </div>

            <div id="recipients">
              <div className="row recipient">
                <div className="col-xs-4">
                  <input
                    type="text"
                    className="form-control address"
                    placeholder=""
                    value={receiverAddr}
                    onChange={(e) => setReceiverAddr(e.target.value)}
                  />
                </div>
                <div className="col-xs-2">
                  <input
                    type="text"
                    className="form-control amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="col-xs-5">
                  <input type="text" className="form-control id" readOnly />
                </div>
                <div className="col-xs-1">
                  <a href="!#" className="addressAddTo">
                    <span className="glyphicon glyphicon-plus"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-pane fade" id="txinputs">
            <p>Enter the details of inputs you wish to spend.</p>
            <div className="row">
              <div className="col-xs-5">
                <label>
                  <abbr title="Transaction ID">Transaction ID:</abbr>
                </label>
              </div>
              <div className="col-xs-1">
                <label>
                  <abbr title="Transaction Input Number">N</abbr>
                </label>
              </div>
              <div className="col-xs-3">
                <label>Script</label>
              </div>
              <div className="col-xs-2">
                <label>
                  <abbr title="This field is for accounting purposes only - the entire input will be spent!">
                    Amount
                  </abbr>
                </label>
              </div>
              <div className="col-xs-1"></div>
            </div>

            <div id="inputs">
              {inputs.map((input, index) => (
                <div key={input.txid} className="row inputs">
                  <div className="col-xs-5">
                    <input
                      type="text"
                      className="form-control txId"
                      placeholder=""
                      value={input.txid}
                      readOnly
                    />
                  </div>
                  <div className="col-xs-1">
                    <input
                      type="text"
                      className="form-control txIdN"
                      placeholder="0"
                      value={input.vout}
                      readOnly
                    />
                  </div>
                  <div className="col-xs-3">
                    <input
                      type="text"
                      className="form-control txIdScript"
                      value={input.script}
                      readOnly
                    />
                  </div>
                  <div className="col-xs-2">
                    <input
                      type="text"
                      className="form-control txIdAmount"
                      placeholder="0.00"
                      value={input.amount}
                      readOnly
                    />
                  </div>
                  <div className="col-xs-1">
                    {/* <a
                      href="!#"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="txidAdd"
                    >
                      <span className="glyphicon glyphicon-plus"></span>
                    </a> */}
                    <a
                      href="!#"
                      onClick={(e) => {
                        e.preventDefault();
                        onRemoveUtxo(index, inputs);
                      }}
                      className="txidRemove"
                    >
                      <span className="glyphicon glyphicon-minus"></span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xs-3">
            <label>
              <abbr title="What is not spent will be used as a transaction fee">
                Transaction Fee
              </abbr>
            </label>
            <input
              type="text"
              id="transactionFee"
              className="form-control"
              value={txFee}
              readOnly
            />
          </div>
        </div>
        <br />
        <div
          id="transactionCreateStatus"
          className="alert alert-danger hidden"
        ></div>
        {tx && (
          <div id="transactionCreate" className="alert alert-success">
            <label>Transaction</label>
            <button
              className="qrcodeBtn btn btn-default"
              type="button"
              data-toggle="modal"
              data-target="#modalQrcode"
              style={{ float: "right" }}
            >
              <span className="glyphicon glyphicon-qrcode"></span>
            </button>

            <p>
              The transaction below has been generated and encoded. It can be
              broadcasted once it has been signed.
            </p>
            <br />
            <textarea
              className="form-control"
              style={{ height: "150px" }}
              readOnly
              value={tx}
            ></textarea>
            <div className="row">
              <div className="col-md-12">
                <p className="text-muted" style={{ float: "left" }}>
                  Size: <span className="txSize">{size}</span> <i>bytes</i>
                </p>
                <div style={{ float: "right", marginTop: "10px" }}>
                  If you are sure:
                  <button
                    className="btn btn-info transactionToVerify"
                    type="button"
                  >
                    Continue to Verify
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                  Or
                  <button
                    className="btn btn-info transactionToSign"
                    type="button"
                  >
                    Continue to Sign
                    <span className="glyphicon glyphicon-pencil"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <input
          type="button"
          value="Generate"
          onClick={() => {
            onGenTx(receiverAddr, amount, inputs, addr);
          }}
          className="btn btn-primary"
          id="transactionBtn"
        />
        <br />
      </div>
    </div>
  );
}

export default Transaction;
