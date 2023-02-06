function Verify() {
  const onOpenLink = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="tab-pane tab-content" id="verify">
        <h2>
          Verify <small>transactions and other scripts</small>
        </h2>
        <div className="row">
          <div className="col-md-12">
            <p>
              Enter the raw transaction, redeem script, pubkey, hd address or
              wif key to convert it into a readable format that can be verified
              manually.
            </p>
            <textarea
              type="text"
              id="verifyScript"
              className="form-control"
              style={{ height: "125px" }}
            ></textarea>
          </div>
        </div>
        <br />
        <div className="hidden verifyData" id="verifyRsData">
          <h4>Redeem Script</h4>
          <p>
            <span style={{float:"right"}}>
              <a
                href="!#"
                target="_blank"
                className="verifyLink"
                title="Link to this page"
              >
                <span className="glyphicon glyphicon-link"></span>
              </a>
            </span>
            The above redeem script has been decoded
          </p>

          <div className="hidden" id="verifyRsDataMultisig">
            <label>Multi Signature Address</label>
            <div className="row">
              <div className="col-lg-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control address multisigAddress"
                    value=""
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

            <label>Required Signatures</label>
            <p className="signaturesRequired">?</p>
            <label>Signatures Required from</label>
            <table className="table table-striped table-hover">
              <tbody></tbody>
            </table>
            <br />
          </div>

          <div className="hidden verifyData" id="verifyRsDataSegWit">
            <label>Segwit Address</label>
            <div className="row">
              <div className="col-lg-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control address segWitAddress"
                    value=""
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
            <br />
          </div>

          <div className="hidden verifyData" id="verifyRsDataHodl">
            <label>Hodl Address</label>
            <div className="row">
              <div className="col-md-12">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control address"
                    value=""
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

            <label>Required Signature</label>
            <div className="row">
              <div className="col-md-12">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control address pubkey"
                    value=""
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

            <label>Unlock Time</label>
            <div className="row">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control date"
                    value=""
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <small>Shareable verification link</small>
            <input type="text" className="form-control verifyLink" readOnly />
          </div>
          <br />
        </div>
        <div className="hidden verifyData" id="verifyTransactionData">
          <h4>Transaction Script</h4>
          <p>
            <span style={{float:"right"}}>
              <a
                href="!#"
                target="_blank"
                className="verifyLink"
                title="Link to this page"
              >
                <span className="glyphicon glyphicon-link"></span>
              </a>
            </span>
            The above script has been decoded
          </p>
          <div>
            <b>Version</b>: <span className="transactionVersion"></span>
          </div>
          <div className="txtime">
            <b>Transaction Time</b>: <span className="transactionTime"></span>
          </div>
          <div>
            <b>Transaction Size</b>: <span className="transactionSize"></span>
          </div>
          <div>
            <b>Lock time</b>: <span className="transactionLockTime"></span>
          </div>
          <div className="txunit">
            <b>Unit</b>: <span className="transactionUnit"></span>
          </div>
          <div className="transactionSegWit">
            <b>SegWit</b>: True
          </div>
          <div className="transactionRBF">
            <b>RBF</b>: This is a{" "}
            <a href="https://en.bitcoin.it/wiki/Transaction_replacement">
              replace by fee
            </a>{" "}
            transaction!
          </div>

          <hr />

          <label>Inputs</label>
          <table className="table table-striped table-hover ins">
            <thead>
              <tr style={{fontWeight:"bold"}}>
                <td>
                  <abbr title="the transaction id">Txid</abbr>
                </td>
                <td>
                  <abbr title="index id of the the transaction">N</abbr>
                </td>
                <td>
                  <abbr title="Amount of the input. Only shown if provider is online and available.">
                    Amount
                  </abbr>
                </td>
                <td>
                  <abbr title="transaction script">Script</abbr>
                </td>
                <td>
                  <abbr title="is input signed?">Signed?</abbr>
                </td>
                <td>
                  <abbr title="is transaction a multisig transaction?">
                    MultiSig?
                  </abbr>
                </td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <label>Outputs</label>
          <table className="table table-striped table-hover outs">
            <thead>
              <tr style={{fontWeight:"bold"}}>
                <td>
                  <abbr title="address the funds are being sent to">
                    Address
                  </abbr>
                </td>
                <td>
                  <abbr title="the identity of the receiver if known">
                    Identity{" "}
                    <span className="text-muted">
                      (if{" "}
                      <a      href="!#"
                        onClick={() => onOpenLink("/known-pubkeys.js")}
                        target="_blank"
                        rel="noreferrer"  >
                        known
                      </a>
                      )
                    </span>
                  </abbr>
                </td>
                <td>
                  <abbr title="the amount the address is being sent">
                    Amount
                  </abbr>
                </td>
                <td>
                  <abbr title="the script of the transaction">Script</abbr>
                </td>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
          <div className="row">
            <div className="col-xs-12">
              <div style={{float:"right"}}>
                <span className="fee hidden">
                  Fee is <span className="amount"></span>.
                </span>
                If the transaction is correct:
                <button className="btn btn-info verifyToSign" type="button">
                  Continue to Sign
                  <span className="glyphicon glyphicon-pencil"></span>
                </button>
                Or
                <button className="btn verifyToBroadcast" type="button">
                  Broadcast
                  <span className="glyphicon glyphicon-globe"></span>
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <small>Shareable verification link</small>
              <input type="text" className="form-control verifyLink" readOnly />
            </div>
          </div>
          <br />
        </div>
        <div className="hidden verifyData" id="verifyPrivKey">
          <h4>WIF key</h4>
          <p>The above wif key has been decoded</p>
          <p>
            <b>Address</b>:{" "}
            <input type="text" className="form-control address" readOnly />
          </p>
          <p>
            <b>Public key</b>:{" "}
            <input type="text" className="form-control pubkey" readOnly />
          </p>
          <p>
            <b>Private key in hex</b>:{" "}
            <input type="text" className="form-control privkey" readOnly />
          </p>
          <p>
            <b>Is compressed</b>: <span className="iscompressed"></span>
          </p>
        </div>
        <div className="hidden verifyData" id="verifyPubKey">
          <h4>Public key</h4>
          <p>
            <span style={{float:"right"}}>
              <a
                href="!#"
                target="_blank"
                className="verifyLink"
                title="Link to this page"
              >
                <span className="glyphicon glyphicon-link"></span>
              </a>
            </span>
            The above public key has been encoded to its address
          </p>
          <p>
            <b>Legacy Address</b>:{" "}
            <input type="text" className="form-control address" readOnly />
          </p>

          <div className="hidden verifyDataSw">
            <hr />
            <div className="row">
              <div className="col-md-6">
                <p>
                  <b>P2SH Segwit Address</b>:{" "}
                  <input
                    type="text"
                    className="form-control addressSegWit"
                    readOnly
                  />
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <b>P2SH Segwit Redeem Script</b>:{" "}
                  <input
                    type="text"
                    className="form-control addressSegWitRedeemScript"
                    readOnly
                  />
                </p>
              </div>
            </div>

            <hr />
            <div className="row">
              <div className="col-md-6">
                <p>
                  <b>Bech32 Address</b>:{" "}
                  <input
                    type="text"
                    className="form-control addressBech32"
                    readOnly
                  />
                </p>
              </div>

              <div className="col-md-6">
                <p>
                  <b>Bech32 Redeem Script</b>:{" "}
                  <input
                    type="text"
                    className="form-control addressBech32RedeemScript"
                    readOnly
                  />
                </p>
              </div>
            </div>

            <br />
          </div>
        </div>
        <div className="hidden verifyData" id="verifyHDaddress">
          <h4>HD Address</h4>
          <p>
            <span style={{float:"right"}}>
              <a
                href="!#"
                target="_blank"
                className="verifyLink"
                title="Link to this page"
              >
                <span className="glyphicon glyphicon-link"></span>
              </a>
            </span>
            The key{" "}
            <small>
              <span className="hdKey hidden"></span>
            </small>{" "}
            has been decoded
          </p>
          <div className="row">
            <div className="col-md-2">
              <b>Type</b>
              <br />
              <span className="key_type"></span>
            </div>

            <div className="col-md-5">
              <b>Chain Code</b>
              <br />
              <input
                type="text"
                className="form-control chain_code"
                value=""
                readOnly
              />
            </div>

            <div className="col-md-5">
              <b>Key</b>
              <br />
              <input
                type="text"
                className="form-control hdwifkey"
                value=""
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <b>Version</b>
              <br />
              <input
                type="text"
                className="form-control version"
                value=""
                readOnly
              />
            </div>

            <div className="col-md-3">
              <b>Parent FingerPrint</b>
              <br />
              <input
                type="text"
                className="form-control parent_fingerprint"
                value=""
                readOnly
              />
            </div>

            <div className="col-md-3">
              <b>Depth</b>
              <br />
              <input
                type="text"
                className="form-control depth"
                value=""
                readOnly
              />
            </div>

            <div className="col-md-3">
              <b>Index</b>
              <br />
              <input
                type="text"
                className="form-control child_index"
                value=""
                readOnly
              />
            </div>
          </div>

          <div className="row"></div>

          <hr />

          <h4>Key Derivation</h4>
          <p>The path of key derivation</p>

          <div className="row">
            <div className="col-md-8">
              <b>Path</b>
              <br />
              <select className="form-control">
                <option>Simple: m/i</option>
              </select>
            </div>

            <div className="col-md-2">
              <b>Index (Start)</b>
              <br />
              <input
                type="text"
                className="form-control derivation_index_start"
                value="0"
              />
            </div>

            <div className="col-md-2">
              <b>Index (End)</b>
              <br />
              <input
                type="text"
                className="form-control derivation_index_end"
                value="1"
              />
            </div>
          </div>

          <hr />
          <h4>Keys</h4>

          <p>Keys derived from the hd address provided</p>

          <div className="derived_data">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <td>
                    <b>Index</b>
                  </td>
                  <td>
                    <b>Address</b>
                    <td>
                      <b>Private Key (WIF)</b>
                    </td>
                  </td>
                  <td>
                    <b>Extended xPub</b>
                  </td>
                  <td>
                    <b>Extended xPrv</b>
                  </td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>

          <br />
        </div>
        <div id="verifyStatus" className="alert alert-danger hidden">
          <span className="glyphicon glyphicon-exclamation-sign"></span> Unable
          to decode
        </div>
        <input
          type="button"
          value="Verify"
          className="btn btn-primary"
          id="verifyBtn"
        />
        Or
        <button
          className="btn btn-info qrcodeScanner"
          type="button"
          data-toggle="modal"
          data-target="#modalQrcodeScanner"
          forward-result="#verifyScript"
        >
          Load from a qr code{" "}
          <span className="glyphicon glyphicon-camera"></span>
        </button>
        <br />
      </div>
    </div>
  );
}

export default Verify;
