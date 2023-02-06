import { useState } from "react";
import { genSegWitAddr } from "../../utils/addresses";

function SegWitAddress() {
  const [segWitAddr, setSegWitAddr] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [privKeyWif, setPrivKeyWif] = useState("");
  const [redeemScript, setRedeemScript] = useState("");
  const [seed, setSeed] = useState("");
  const [showSeed, setShowSeed] = useState(false);
  const [bech32, setBech32] = useState(true);

  const generateSegWitAddress = (useSeed, useBech32) => {
    const { segWitAddress, privateKeyWif, publicKey, redeemScript } =
      genSegWitAddr(useSeed, useBech32);
    setSegWitAddr(segWitAddress);
    setPrivKeyWif(privateKeyWif);
    setPubKey(publicKey);
    setRedeemScript(redeemScript);
  };

  return (
    <>
      <div className="tab-pane tab-content" id="newSegWit">
        <h2>
          New SegWit Address <small> Smaller &amp; Faster Transactions</small>
        </h2>

        <p>
          Any keys used you will need to manually store safely as they will be
          needed later to redeem the bitcoins.
        </p>

        <label>SegWit Address (Share)</label>

        <div className="input-group">
          <input
            id="newSegWitAddress"
            type="text"
            className="form-control address"
            value={segWitAddr}
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

        <label>RedeemScript</label>
        <input
          id="newSegWitRedeemScript"
          type="text"
          className="form-control"
          readOnly
          value={redeemScript}
        />

        <label>Public key</label>
        <input
          id="newSegWitPubKey"
          type="text"
          className="form-control"
          readOnly
          value={pubKey}
        />

        <label>Private key (WIF key)</label>
        <div className="input-group">
          <input
            id="newSegWitPrivKey"
            type="text"
            className="form-control"
            value={privKeyWif}
            readOnly
          />
          <span className="input-group-btn">
            <button className="showKey btn btn-default" type="button">
              Show
            </button>
          </span>
        </div>

        <h3>Address Options</h3>
        <p>
          You can use the advanced options below to generate different kind of
          keys and addresses.
        </p>

        <div className="checkbox">
          <label>
            <input
              onClick={() => setBech32(!bech32)}
              type="checkbox"
              id="newSegWitBech32addr"
              className="checkbox-inline"
              
              checked={bech32}

            />{" "}
            Enable{" "}
            <a
              href="https://en.bitcoin.it/wiki/Bech32"
              target="_blank"
              rel="noreferrer"
            >
              Bech32
            </a>
            ?
          </label>
        </div>

        <div className="checkbox">
          <label>
            <input
              onClick={() => setShowSeed(!showSeed)}
              type="checkbox"
              id="newSegWitBrainwallet"
              className="checkbox-inline"
              checked={showSeed}

            />{" "}
            Custom Seed or Brain Wallet
          </label>
          <input
            value={seed}
            onChange={(e) => {
              e.preventDefault();
              setSeed(e.target.value);
            }}
            type="text"
            className={"form-control " + (!showSeed && " hidden")}
            id="brainwalletSegWit"
          />
        </div>

        <div className="btn-group">
          <input
            type="button"
            className="btn btn-primary"
            value="Generate"
            id="newSegWitKeysBtn"
            onClick={() => generateSegWitAddress(seed, bech32)}
          />
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>

          <ul className="dropdown-menu">
            <li>
              <a href="!#" id="newSegwitPaperwalletBtn">
                Print
              </a>
            </li>
          </ul>
        </div>
        <input
          type="button"
          className="btn btn-primary"
          value="FromLedger"
          id="ledgerKeysBtn"
        />
        <br />
      </div>
    </>
  );
}

export default SegWitAddress;
