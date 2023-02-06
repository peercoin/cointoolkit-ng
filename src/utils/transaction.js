import bitcore, { Address, PrivateKey, Script, Transaction } from "bitcore-lib";
import { isValidAddress } from "./addresses";

// bitcore.Networks.defaultNetwork = bitcore.Networks.get("peercoin-testnet");
const url = "https://tblockbook.peercoin.net";

export const getUtxos = async (addr) => {
  let address = "";
  let valid = false;

  if (isValidAddress(addr)) {
    valid = true;
    address = addr;
  }

  if (!valid) {
    try {
      const priv = new PrivateKey(addr);
      if (isValidAddress(priv.toAddress())) {
        valid = true;
        address = priv.toAddress().toString();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!valid) {
    try {
      const redeemScript = Script(addr);
      if (isValidAddress(redeemScript.toAddress())) {
        valid = true;
        address = redeemScript.toAddress().toString();
      }
    } catch (error) {}
  }

  if (!valid) return { address: "", utxos: "" };

  let res = "";
  try {
    const req = await fetch(url + "/api/utxo/" + address);
    res = await req.json();
  } catch (error) {
    console.log({ error });
  }
  const script = new bitcore.Script(new Address(addr)).toHex();

  const utxos = res.map((i) => {
    const utxo = {
      ...i,
      txid: i.txid,
      outputIndex: i.vout,
      address: new Address(addr),
      script,
      satoshis: i.satoshis / 10 ** 2,
    };
    return utxo;
  });
  return { address, utxos };
};

export const selectInputs = (utxos, amount) => {
  // select best UTXOs to be spent

  if (amount === 0) {
    return null;
  }

  let amounts = [];
  for (const i of utxos) {
    amounts.push(i.satoshis);
  }
  const sum = amounts.reduce((partialSum, a) => partialSum + a, 0);

  if (sum < amount) {
    return null;
  }

  let s = 0;
  let remainingAmount = amount;
  let selected = [];

  while (s <= amount) {
    // find closest number
    const t = utxos.sort(
      // eslint-disable-next-line
      (a, b) =>
        Math.abs(a.satoshis - remainingAmount) -
        Math.abs(b.satoshis - remainingAmount)
    )[0];
    s += t.satoshis;
    remainingAmount = remainingAmount - t.satoshis;
    selected.push(t);
    utxos = utxos.filter((item) => item !== t);
  }

  return selected;
};

export const genTransaction = (utxos, toAddr, amount, sender) => {
  const tx = new Transaction()
    .from(selectInputs(utxos, amount * 1000000))
    .to(toAddr, amount * 1000000)
    .change(sender);

  return { tx: tx.toString(), size: tx._estimateSize() };
};

export const signTransaction = async (txString, privKeyWif) => {
  const deriveTx = new Transaction(txString).toObject();
  const privKey = new PrivateKey(privKeyWif).PrivateKey;
  const input = deriveTx.inputs;
  const outputs = deriveTx.outputs;

  const tx = new Transaction(txString)
    .addInput(input)
    .addOutput(outputs)
    .sign(privKey);

  return { tx: tx.toString(), size: tx._estimateSize() };
};

export const brodcastTransaction = async (signedTx) => {
  let res = "";
  try {
    const req = await fetch(url + "/api/sendtx/", {
      method: "post",
      body: signedTx,
    });
    res = (await req.json()).result;
  } catch (error) {
    console.log({ error });
  }

  return res;
};
