import { useState } from "react";
import { genTimeLockAddress } from "../../utils/addresses";

function TimeLockedAddress() {
  const [address, setAddress] = useState("");
  const [redeemScript, setRedeemScript] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [lockByBlock, setLockByBlock] = useState(false);
  const [blockHeight, setBlockHeight] = useState("");

  const generateAddress = (addr, timeOrBlock) => {
    setAddress("");
    setRedeemScript("");

    const { address: address_, redeemScript: redeemScript_ } =
      genTimeLockAddress(addr, timeOrBlock);
    setAddress(address_);
    setRedeemScript(redeemScript_);
  };

  return (
    <div className="tab-pane tab-content" id="newTimeLocked">
      <h2>
        New Time Locked Address{" "}
        <small>Coins can be released only after a certain date</small>
      </h2>

      <div className="row">
        <div className="col-md-11">
          <p>
            Use{" "}
            <i>
              <a
                href="https://github.com/bitcoin/bips/blob/master/bip-0065.mediawiki"
                target="_blank"
                rel="noreferrer"
              >
                OP_CHECKLOCKTIMEVERIFY
              </a>
            </i>{" "}
            (OP_HODL) to create a time locked address where the funds are
            unspendable until a set date and time has passed.
          </p>
          <p>
            Public keys can be{" "}
            <a href="#newAddress">generated in your browser</a> or from your
            bitcoin client.
          </p>
          <p>
            Enter the public key that will be able to unlock the funds after the
            a certain date.
          </p>
        </div>

        <div className="col-md-1"></div>
      </div>

      <div className="row">
        <div className="form-horizontal">
          <div className="col-xs-12">
            <input
              id="timeLockedPubKey"
              type="text"
              className="form-control pubkey"
              value={pubKey}
              onChange={(e) => {
                e.preventDefault();
                setPubKey(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <p id="timeLockedRbTypeBox">
        Enter the
        <input
          type="radio"
          id="timeLockedRbTypeDate"
          name="timeLockedRbType"
          value=" date"
          checked={!lockByBlock}
          onChange={(e) => {
            setBlockHeight("");
            setLockByBlock(false);
          }}
        />
        <label htmlFor="timeLockedRbTypeDate">date and time</label>
        or
        <input
          type="radio"
          id="timeLockedRbTypeBlockHeight"
          name="timeLockedRbType"
          placeholder="blockheight"
          checked={lockByBlock}
          onChange={(e) => {
            setBlockHeight("");
            setLockByBlock(true);
          }}
        />
        <label htmlFor="timeLockedRbTypeBlockHeight">blockheight</label>
        required to release the coins:
      </p>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div
              className={"input-group date " + (lockByBlock && " hidden")}
              id="timeLockedDateTimePicker"
            >
              <input
                type="text"
                className="form-control"
                placeholder="MM/DD/YYYY hh:mm"
                onChange={(e) => {
                  const date = Math.floor(
                    new Date(e.target.value).getTime() / 1000
                  );

                  console.log(date);
                  setBlockHeight(date);
                }}
              />
              <span className="input-group-addon">
                <span className="glyphicon glyphicon-calendar"></span>
              </span>
            </div>
            <div
              className={"input-group" + (!lockByBlock && " hidden")}
              id="timeLockedBlockHeight"
            >
              <input
                type="text"
                id="timeLockedBlockHeightVal"
                className="form-control"
                placeholder="Blockheight"
                value={blockHeight}
                onChange={(e) => {
                  setBlockHeight(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <br />

      <div
        id="timeLockedErrorMsg"
        className="alert alert-danger"
        style={{ display: "none" }}
      ></div>

      <div
        className={
          "alert alert-success " + (!address && !redeemScript && " hidden")
        }
        id="timeLockedData"
      >
        <label>Address</label>
        <p>Payment should be made to this address:</p>
        <div className="row">
          <div className="col-lg-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control address"
                value={address}
                readOnly
              />
              <span className="input-group-btn">
                <button
                  className="qrcodeBtn btn btn-default"
                  type="button"
                  data-toggle="modal"
                  data-target="#modalQrcode"
                >
                  <span className="glyphicon glyphicon-qrcode"></span>
                </button>
              </span>
            </div>
          </div>
        </div>
        <label>Redeem Script</label>
        <p>
          This script should be{" "}
          <i>
            saved and should be shared with all the participants before a
            payment is made
          </i>
          , so they may validate the authenticity of the address, it will also
          be used later to release the bitcoins.
        </p>
        <textarea
          className="form-control script"
          style={{ height: "160px" }}
          readOnly
          value={redeemScript}
        ></textarea>
        <label>Shareable URL</label>
        <input
          type="text"
          className="scriptUrl form-control"
          readOnly
          value={window.location.origin.toString() + "/verify?" + redeemScript}
        />
      </div>

      <input
        type="button"
        className="btn btn-primary"
        value="Submit"
        id="newTimeLockedAddress"
        onClick={() => generateAddress(pubKey, blockHeight)}
      />
      <br />
    </div>
  );
}

export default TimeLockedAddress;
