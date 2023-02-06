import { useState } from "react";
import { genMultiSigAddress, isValidAddress } from "../../utils/addresses";

function MultiSigAddress() {
  const [address, setAddress] = useState("");
  const [redeemScript, setRedeemScript] = useState("");
  const [pubAddresses, setPubAddresses] = useState(["undefined"]);
  const [requiredSigCount, setRequiredSigCount] = useState(1);
  const [error, setError] = useState("");

  const addAddress = (addrs) => {
    const newAddrs = [...addrs];
    setPubAddresses([...newAddrs, "undefined"]);
    setAddress("");
    setRedeemScript("");
  };

  const removeAddress = (addrs, index) => {
    const newAddrs = [...addrs];

    if (index > -1) {
      if (index === 0 && newAddrs.length === 1) {
        newAddrs[index] = "undefined";
        setPubAddresses(newAddrs);
      } else {
        newAddrs.splice(index, 1);
        setPubAddresses(newAddrs);
      }
    }
    setAddress("");
    setRedeemScript("");
  };

  const updateAddress = (addrs, index, value) => {
    const newAddrs = [...addrs];
    newAddrs[index] = value;
    setPubAddresses(newAddrs);
    setAddress("");
    setRedeemScript("");
  };

  const generateAddress = (addrs, sigCount) => {
    setAddress("");
    setRedeemScript("");
    setError("");
    let isValid = true;

    const validAddrs = addrs.filter((addr) => addr !== "undefined");
    for (let index = 0; index < validAddrs.length; index++) {
      const element = validAddrs[index];
      if (!element || !isValidAddress(element)) {
        isValid = false;
        setError("One or more public key is invalid!");
        return;
      }
    }

    if (Number(sigCount) > validAddrs.length || validAddrs.length < 1) {
      isValid = false;
      setError(
        "Minimum signatures required is greater than the amount of public keys provided"
      );
      return;
    }

    if (!isValid) return;
    const { address, redeemScript } = genMultiSigAddress(validAddrs, sigCount);
    setAddress(address);
    setRedeemScript(redeemScript);
  };

  const onOpenLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <div className="tab-pane tab-content" id="newMultiSig">
        <h2>
          New Multisig Address <small>Secure multisig address</small>
        </h2>
        <div className="row">
          <div className="col-md-8">
            <p>
              Public keys can be{" "}
              <a href="#newAddress">generated in your browser</a> or from your
              wallet.
            </p>
            <p>
              Enter the public keys of all the participants, to create a{" "}
              <a
                href="https://en.bitcoin.it/wiki/Address#Multi-signature_addresses"
                target="_blank"
                rel="noreferrer"
              >
                multi signature address
              </a>
              . Maximum of 15 allowed. Compressed and uncompressed public keys
              are accepted.
            </p>
          </div>
          <div className="col-md-3">
            <p className="alert alert-info">
              <span className="glyphicon glyphicon-info-sign"></span>{" "}
              <a href="!#" data-toggle="modal" data-target="#modalMediator">
                <abbr>Need a Mediator?</abbr>
              </a>
            </p>
          </div>

          <div className="col-md-1"></div>
        </div>
        <div id="multisigPubKeys">
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 1em",
            }}
          >
            <thead>
              <tr>
                <td></td>
                <td className="col-xs-7">
                  <label>Public key</label>
                </td>
                <td className="col-xs-4">
                  <label>
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
                  </label>
                </td>
                <td></td>
              </tr>
            </thead>
            <tbody className="list sort">
              {pubAddresses.map((val, index) => {
                return (
                  <tr className="item" style={{ width: "100%" }} key={index}>
                    <td>
                      <a href="!#" className="handle">
                        <span className="glyphicon glyphicon-move"></span>
                      </a>
                    </td>
                    <td className="col-sm-7">
                      <input
                        type="text"
                        className="form-control pubkey"
                        value={val === "undefined" ? "" : val}
                        onChange={(e) =>
                          updateAddress(pubAddresses, index, e.target.value)
                        }
                      />
                    </td>
                    <td className="col-sm-4">
                      <input type="text" className="form-control id" readOnly />
                    </td>
                    <td>
                      <a
                        href="!#"
                        onClick={(e) => {
                          e.preventDefault();
                          addAddress(pubAddresses);
                        }}
                        className="pubkeyAdd"
                      >
                        <span className="glyphicon glyphicon-plus"></span>
                      </a>
                      <a
                        href="!#"
                        onClick={(e) => {
                          e.preventDefault();
                          removeAddress(pubAddresses, index);
                        }}
                        className="pubkeyRemove"
                      >
                        <span className="glyphicon glyphicon-minus"></span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p>Enter the amount of signatures required to release the coins</p>
        <div className="row">
          <div className="col-xs-3">
            <select
              id="releaseCoins"
              className="form-control"
              defaultValue={requiredSigCount}
              onChange={(e) => {
                e.preventDefault();
                setRequiredSigCount(e.target.value);
              }}
            >
              {[...Array(15)].map((val, index) => {
                return <option key={index}>{index + 1}</option>;
              })}
            </select>
          </div>
        </div>
        <br />
        {error && (
          <div id="multiSigErrorMsg" className="alert alert-danger">
            <span className="glyphicon glyphicon-exclamation-sign"></span>{" "}
            {error}
          </div>
        )}
        <div
          className={
            "alert alert-success " + (!address && !redeemScript && " hidden")
          }
          id="multiSigData"
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
            be used later to release the coins.
          </p>
          <textarea
            className="form-control script"
            style={{ height: "160px" }}
            readOnly
            value={redeemScript}
          ></textarea>
          <label>Shareable URL</label>
          <input
            value={
              window.location.origin.toString() + "/verify?" + redeemScript
            }
            type="text"
            className="scriptUrl form-control"
            readOnly
          />
        </div>
        <input
          onClick={(e) => {
            e.preventDefault();
            generateAddress(pubAddresses, requiredSigCount);
          }}
          type="button"
          className="btn btn-primary"
          value="Submit"
          id="newMultiSigAddress"
        />
        {/* Or
        <button
          className="btn btn-info"
          type="button"
          id="newMultiSigAddressSort"
        >
          <span>Sort by pubkey</span>
        </button> */}
        <br />
      </div>
    </>
  );
}

export default MultiSigAddress;
