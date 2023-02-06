import { useState } from "react";
import { genHDAddress } from "../../utils/addresses";

function HdAddress() {
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");
  const [seed, setSeed] = useState("");
  const [showSeed, setShowSeed] = useState(false);

  const generateAddress = (useSeed) => {
    const { publicAddress, privateKey } = genHDAddress(useSeed);
    setPubKey(publicAddress);
    setPrivKey(privateKey);
  };

  return (
    <>
      <div className="tab-pane tab-content" id="newHDaddress">
        <h2>
          New HD Address <small>making bip32 even easier</small>
        </h2>
        <p>
          Use the form below to generate a <i>master</i> hierarchical
          deterministic address.
        </p>

        <label>xPub Address</label>
        <div className="input-group">
          <input
            id="newHDxpub"
            type="text"
            className="form-control"
            value={pubKey}
            readOnly
          />
          <span className="input-group-btn">
            <button className="deriveHDbtn btn btn-default" type="button">
              <span
                title="Derive from key"
                className="glyphicon glyphicon-chevron-right"
              ></span>
            </button>
          </span>
        </div>

        <label>xPrv Address</label>
        <div className="input-group">
          <input
            id="newHDxprv"
            type="text"
            className="form-control"
            value={privKey}
            readOnly
          />
          <span className="input-group-btn">
            <button className="deriveHDbtn btn btn-default" type="button">
              <span
                title="Derive from key"
                className="glyphicon glyphicon-chevron-right"
              ></span>
            </button>
          </span>
        </div>

        <h3>Address Options</h3>
        <p>
          You can use the advanced options below to generate different kinds of
          master addresses.
        </p>

        <div className="checkbox">
          <label>
            <input
              onClick={() => setShowSeed(!showSeed)}
              type="checkbox"
              checked={showSeed}
              id="newHDBrainwallet"
              className="checkbox-inline"
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
            className={"form-control " + (!showSeed && " hidden") }
            id="HDBrainwallet"
          />
        </div>

        <input
          onClick={(e) => {
            e.preventDefault();
            generateAddress(seed);
          }}
          type="button"
          className="btn btn-primary"
          value="Generate"
          id="newHDKeysBtn"
        />
      </div>
    </>
  );
}

export default HdAddress;
