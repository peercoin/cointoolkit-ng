function About() {
  return (
    <div className="tab-pane tab-content active" id="about">
      <h2>
        About <small>open source toolkit</small>
      </h2>
      <p>
        Github{" "}
        <a href="https://github.com/peercoin/cointoolkit">
          https://github.com/peercoin/cointoolkit
        </a>
      </p>
      <h3>Information</h3>
      <p>
        Cointoolkit is a free and open source project released under the MIT
        license, originally released by{" "}
        <a
          href="https://bitcointalk.org/index.php?action=profile;u=34834"
          target="_blank"
          rel="noreferrer"
        >
          OutCast3k
        </a>{" "}
        as Coinb.in in 2013, and modified to work with Peershares assets by
        ttutdxh.nubits@gmail.com and finally adopted by Peercoin.
      </p>
      <h3>Tests</h3>
      <p>
        Click <a href="test.html">here</a> to test cointoolkit!
      </p>
    </div>
  );
}

export default About;
