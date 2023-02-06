function Modals() {
  return (
    <>
      {/* <!-- wallet confirm send modal --> */}
      <div
        className="modal fade"
        id="modalWalletConfirm"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Please confirm</h4>
            </div>

            <div className="modal-body">
              <p>
                You are about to send a transaction to the value of{" "}
                <span id="spendAmount">0.00</span> BTC
              </p>

              <br />
              <div
                id="walletSendConfirmStatus"
                className="alert alert-danger hidden"
              ></div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                id="walletConfirmSend"
              >
                Send
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="confirmClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- wallet confirm send modal --> */}

      {/* <!-- qrcode modal --> */}
      <div
        className="modal fade"
        id="modalQrcode"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">qrcode</h4>
            </div>

            <div className="modal-body" align="center">
              <div id="qrcode"></div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="qrCodeClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- qrcode modal -->

	<!-- qrcode scanner modal --> */}
      <div
        className="modal fade"
        id="modalQrcodeScanner"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">qrcode scanner</h4>
            </div>

            <div className="modal-body" align="center">
              <select id="videoSource" className="form-control"></select>
              <div id="videoReaderError" className="hidden">
                Your browser does not offer camera support
              </div>
              <video
                id="videoReader"
                muted
                autoPlay
                style={{ width: "100%", height: "100%" }}
              ></video>
              <div id="qrcode-scanner-callback-to" className="hidden"></div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="qrScanClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- qrcode scanner modal -->

	<!-- mediator modal --> */}
      <div
        className="modal fade"
        id="modalMediator"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Transaction Mediation</h4>
            </div>

            <div className="modal-body">
              <p>
                You can add a public key when creating a{" "}
                <i>2-of-3 multi signature address</i> and for a low fee your
                mediator will help with the recovery of the funds should any
                disputes arise.
              </p>

              <p>
                Should a dispute arise please contact the below address for
                further information
              </p>
              <div className="row">
                <div className="col-md-5">
                  <label>Mediator:</label>

                  <select id="mediatorList" className="form-control"></select>
                </div>

                <div className="col-md-5">
                  <label>Address:</label>{" "}
                  <span className="text-muted">(for disputes)</span>
                  <input
                    id="mediatorEmail"
                    type="text"
                    className="form-control address"
                    value=""
                    readOnly
                  />
                </div>

                <div className="col-md-2">
                  <label>Fee (%):</label>
                  <input
                    id="mediatorFee"
                    type="text"
                    className="form-control address"
                    value=""
                    readOnly
                  />
                </div>
              </div>
              <br />

              <label>Public Key:</label>
              <input
                id="mediatorPubkey"
                type="text"
                className="form-control address"
                value=""
                readOnly
              />
              <br />
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" type="button" id="mediatorAddKey">
                Add Public Key
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="mediatorClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- mediator modal -->


	<!-- warning (fee) modal --> */}
      <div
        className="modal fade"
        id="modalWarningFee"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">
                <b>Warning High Fee!</b>
              </h4>
            </div>

            <div className="modal-body">
              Please be aware that you have created a transaction with what
              seems to be a very high fee of{" "}
              <span id="modalWarningFeeAmount"></span>!
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                id="warningFeeClose"
              >
                OK, I've got it!
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- warning (fee) modal -->
	
	<!-- multisig modal --> */}
      <div
        className="modal fade wideModal"
        id="modalMultisig"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Multisignature checker</h4>
            </div>

            <div className="modal-body">
              <p>
                Here you can see the public keys and the correspondent addresses
                of the public keys with signing rights on this input.
              </p>

              <p>
                Signatures already found in the current transaction are shown in
                green.
              </p>
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>
                          <abbr title="Signature position in the script.">
                            S#
                          </abbr>
                        </th>
                        <th className="col-md-3">Address</th>
                        <th className="col-md-5">Pubkey</th>
                        <th className="col-md-4">
                          Identity{" "}
                          <span className="text-muted">
                            (if{" "}
                            <a href="known-pubkeys.js" target="_blank">
                              known
                            </a>
                            )
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
              <br />
              <div className="row combine">
                <div className="col-md-12">
                  <label>
                    <abbr title="When signers do not sign sequentially, and they end with multiple versions or forks of the same transaction. This only works if the rest of the transaction is the exactly the same">
                      Combine with the same transaction signed by other pubkeys:
                    </abbr>
                  </label>
                  <textarea
                    className="form-control address"
                    value=""
                    onChange={() => {}}
                    style={{ height: "125px", display: "block" }}
                  ></textarea>

                  <div className="alert alert-danger hidden">
                    <span className="glyphicon glyphicon-exclamation-sign"></span>{" "}
                    This is not the same transaction. You only can combine the
                    same transaction signed by diferent pubkeys.
                  </div>
                </div>
              </div>
              <br />
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary combineTx" type="button">
                Combine transaction
              </button>
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="mediatorClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- multisig modal -->

	<!-- script modal --> */}
      <div
        className="modal fade wideModal"
        id="modalScript"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                &times;
              </button>
              <h4 className="modal-title">Script details</h4>
            </div>

            <div className="modal-body">
              <p>Here you can see the script assembly</p>

              <div className="row">
                <div className="col-md-12">
                  <div className="asm" style={{ overflow: "auto" }}></div>
                </div>
              </div>
              <br />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                id="mediatorClose"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- script modal --> */}

      <div className="hidden" id="entropybucket"></div>
    </>
  );
}

export default Modals;
