function Home() {
  return (
    <div className="tab-pane tab-content active" id="home">
      <div className="row">
        <div className="col-md-12">
          <h2>
            Cointoolkit <small>Welcome to the Blockchain</small>
          </h2>
        </div>
      </div>

      <div className="jumbotron">
        <h1>Cointoolkit</h1>
        <p>
          Be your own bank, take control of your own money and start using{" "}
          <a href="https://www.peercoin.net/">Peercoin</a> today!
        </p>
        <p>
          <a
            className="btn btn-primary btn-lg"
            href="/address"
            role="button"
          >
            Create new address &raquo;
          </a>
        </p>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-ok"></span> Open Source
          </h3>
          <p>
            Cointoolkit is an open source web based wallet written in javascript
            and released under the <a href="LICENSE">MIT license</a> which means
            it's free to use and edit.
          </p>
        </div>

        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-fullscreen"></span> MultiSig
          </h3>
          <p>
            This is the first tool that supports combining signatures in a multi
            signature transaction. <a href="#verify">Verify</a> your first
            transaction, click the number of signatures and{" "}
            <strong>combine</strong> the other versions
          </p>
        </div>

        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-random"></span> Raw
            Transactions
          </h3>
          <p>
            <a href="#newTransaction">Create</a>, <a href="#verify">verify</a>,{" "}
            <a href="#sign">sign</a> and <a href="#broadcast">broadcast</a>{" "}
            custom raw transactions online with advanced features and minimal
            effort!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-piggy-bank"></span> Wallet
          </h3>
          <p>
            Quick access to an <a href="#wallet">online wallet</a> where only
            you have access to your own private keys!
          </p>
        </div>

        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-globe"></span> Addresses
          </h3>
          <p>
            We support <a href="/address">regular addresses</a>,{" "}
            <a href="#newMultiSig">multisig</a>,{" "}
            <a href="#newSegWit">segwit / bech32</a> and stealth all with access
            to your own private keys!
          </p>
        </div>

        <div className="col-md-4">
          <h3>
            <span className="glyphicon glyphicon-wrench"></span> Development
          </h3>
          <p>
            Use what we've built to write your own projects! See our documention
            (coming soon), or contribute at{" "}
            <a href="https://github.com/backpacker69/cointoolkit">github</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
