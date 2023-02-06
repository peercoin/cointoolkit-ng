function Settings() {
  return (
    <>
      <div className="tab-pane tab-content active" id="settings">
        <h2>Settings</h2>
        <p>
          Customize the wallet settings to allow using the toolkit in other
          cryptoassets.
        </p>

        <div className="row">
          <div className="col-md-12">
            <b>Network</b>: <br />
            <p className="text-muted">
              Select which network you'd like to use for key pair generation.
            </p>
            <select className="form-control" id="coinjs_coin">
              {/* <!-- pubPrefix, scriptPrefix, privPrefix, hdPubPrefix, hdPrivPrefix, broadcastProvider, unspentProvider, getInputAmountProvider, getTransaction, extraTimeField, extraUnitFieldValue, decimalPlaces, symbol, bip44, ledgerPath, bech32Prefix --> */}
              <option
                value="peercoin"
                rel="0x37;0x75;0xb7;0x0488b21e;0x0488ade4;false;false;false;true;holy;false;6;PPC;0x6;44'/6'/0'/0/0;pc;"
              >
                Peercoin
              </option>
              <option
                value="sparklecoin"
                rel="0x3f;0x7d;0xbf;0x0488b21e;0x0488ade4;true;true;true;true;true;false;6;SPRK;0x6;44'/239'/0'/0/0;;"
              >
                Sparklecoin
              </option>
              <option
                value="bitcoin"
                rel="0x00;0x05;0x80;0x0488b21e;0x0488ade4;false;blockr_io;blockr_io;false;false;false;8;BTC;0x0;44'/0'/0'/0/0;bc;"
              >
                Bitcoin
              </option>
              <option
                value="bitcoin_cash"
                rel="0x00;0x05;0x80;0x0488b21e;0x0488ade4;false;blockexplorer;blockexplorer;false;false;false;8;BCH;0x0;44'/0'/0'/0/0;;"
              >
                Bitcoin Cash
              </option>
              <option
                value="peercoin_testnet"
                rel="0x6f;0xc4;0xef;0x043587cf;0x04358394;false;false;false;true;true;false;6;tPPC;0x1;44'/1'/0'/0/0;tpc;"
              >
                Peercoin (testnet)
              </option>
              <option
                value="sparklecoin_testnet"
                rel="0x7f;0xc4;0xff;0x043587cf;0x04358394;true;true;true;true;true;false;6;tSPRK;0x1;;;"
              >
                Sparklecoin (testnet)
              </option>
              <option
                value="bitcoin_testnet"
                rel="0x6f;0xc4;0xef;0x043587cf;0x04358394;false;blockrio_bitcointestnet;false;false;false;false;8;tBTC;0x1;;tb;"
              >
                Bitcoin (testnet)
              </option>
              <option
                value="custom"
                rel="0x00;0x05;0x80;0x0488b21e;0x0488ade4;false;false;false;false;false;false;8;CUSTOM;0x0;;;"
              >
                Custom
              </option>
            </select>
          </div>
        </div>

        <div id="settingsCustom" className="hidden">
          <br />
          <div className="alert alert-info">
            {" "}
            <span className="glyphicon glyphicon-info-sign"></span> You will not be
            able to automatically broadcast or retreive your unspent outputs
            automatically when using this setting and will need to use your
            desktop client instead, however everything else such as creating key
            pairs, addresses, transaction generation and signing will continue
            to function normally.
          </div>

          <hr />

          <div className="row">
            <div className="col-md-2">
              <b>Pub</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting"
                id="coinjs_pub"
              />
            </div>

            <div className="col-md-2">
              <b>Priv</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting"
                id="coinjs_priv"
              />
            </div>

            <div className="col-md-2">
              <b>Script Hash (multisig)</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting"
                id="coinjs_multisig"
              />
            </div>

            <div className="col-md-3">
              <b>HD Pub</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting"
                id="coinjs_hdpub"
              />
            </div>

            <div className="col-md-3">
              <b>HD Priv</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting"
                id="coinjs_hdprv"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <b>Extra time field?</b>: <br />
              <select className="form-control" id="coinjs_extratimefield">
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>

            <div className="col-md-3">
              <b>Extra unit field value?</b>: <br />
              <input
                type="text"
                className="form-control coinjssetting boolisvalid"
                id="coinjs_extraunitfieldvalue"
              />
            </div>

            <div className="col-md-3">
              <b>Decimal places</b>: <br />
              <input
                type="text"
                className="form-control"
                id="coinjs_decimalplaces"
              />
            </div>

            <div className="col-md-3">
              <b>Symbol</b>: <br />
              <input type="text" className="form-control" id="coinjs_symbol" />
            </div>
            <div className="col-md-3">
              <b>BIP44 cointype</b>: <br />
              <input type="text" className="form-control" id="coinjs_bip44" />
            </div>
            <div className="col-md-3">
              <b>bech32 prefix</b>: <br />
              <input type="text" className="form-control" id="coinjs_bech32" />
            </div>
          </div>

          <br />
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <b>Unspent outputs</b>: <br />
            <p className="text-muted">
              Select the provider you wish to retreive your unspent inputs from
            </p>
            <select className="form-control" id="coinjs_utxo"></select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <b>Input amount</b>: <br />
            <p className="text-muted">
              Select the provider you wish to retreive transactions input
              amounts
            </p>
            <select className="form-control" id="coinjs_getinputamount"></select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <b>Raw transaction</b>: <br />
            <p className="text-muted">
              Select the provider you wish to get transaction info from
            </p>
            <select className="form-control" id="coinjs_gettransaction"></select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <b>Broadcast</b>: <br />
            <p className="text-muted">
              Select the provider you wish to broadcast the transaction via
            </p>
            <select className="form-control" id="coinjs_broadcast"></select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-md-12">
            <b>Ledger path</b>: <br />
            <p className="text-muted">
              Select the ledger path you wish to use for address/transaction
              generation and signing
            </p>
            <input type="text" className="form-control" id="coinjs_ledger" />
          </div>
        </div>

        <br />

        <div id="statusSettings" className="hidden alert"></div>

        <input
          type="submit"
          className="btn btn-primary"
          id="settingsBtn"
          value="Save"
        />
      </div>
    </>
  );
}

export default Settings;
