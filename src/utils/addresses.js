import bitcore, {
  Address,
  HDPrivateKey, PrivateKey,
  PublicKey,
  Script
} from "bitcore-lib";

// bitcore.Networks.defaultNetwork = bitcore.Networks.get("peercoin-testnet");

export const genAddressKeys = (seed = "") => {
  const privateKey = seed ? new PrivateKey(seed) : new PrivateKey();
  const privateKeyWif = privateKey.toWIF();
  const publicKey = privateKey.toPublicKey();

  return {
    address: publicKey.toAddress().toString(),
    publicKey: publicKey.toString(),
    privateKeyWif: privateKeyWif.toString(),
    privateKeyHex: privateKey.toString(),
  };
};

export const genHDAddress = (seed = "") => {
  const value = Buffer.from(seed);
  const hash = bitcore.crypto.Hash.sha256(value);
  const hdPrivateKey = seed
    ? new HDPrivateKey.fromSeed(hash)
    : new HDPrivateKey();

  return {
    publicAddress: hdPrivateKey.xpubkey,
    privateKey: hdPrivateKey.xprivkey,
  };
};

export const genMultiSigAddress = (pubs, requiredSigCount) => {
  const address = new Address(pubs, Number(requiredSigCount));
  const redeemScript = new Script.buildMultisigOut(
    pubs,
    Number(requiredSigCount)
  );

  return {
    address: address.toString(),
    redeemScript: redeemScript.toHex(),
  };
};

export const genSegWitAddr = (seed = "", bech32 = false) => {
  const value = Buffer.from(seed);
  const hash = bitcore.crypto.Hash.sha256(value);
  const bn = bitcore.crypto.BN.fromBuffer(hash);

  const privateKey = seed ? new PrivateKey(bn) : new PrivateKey();
  const publicKey = privateKey.toPublicKey();

  // bech32 ==> witnesspubkeyhash
  // hash ==> scripthash
  const type = bech32 ? "witnesspubkeyhash" : "scripthash";
  const address = new Address(publicKey, undefined, type);
  const scriptBuild = new Script.fromAddress(address);
  let redeemScript = scriptBuild.toHex();

  return {
    segWitAddress: address.toString(),
    privateKeyWif: privateKey.toWIF().toString(),
    publicKey: publicKey.toString(),
    redeemScript,
  };
};

export const genAddrScriptHash = (addr) => {
  const scriptBuild = new Script.fromAddress(addr);
  return scriptBuild.toHex();
};

export const genTimeLockAddress = (pubkey, checklocktimeverify) => {
  const address = new Address([pubkey], 1);
  const pubKey = new PublicKey(pubkey).toBuffer();

  const redeemScript = Script()
    .add(Buffer.from(`${checklocktimeverify}`))
    .add("OP_CHECKLOCKTIMEVERIFY") // OP_CHECKLOCKTIMEVERIFY
    .add("OP_DROP") // OP_DROP
    .add(pubKey) // Public Key
    .add("OP_CHECKSIG"); // OP_CHECKSIG

  return {
    address: address.toString(),
    redeemScript: redeemScript.toHex(),
  };
};

export const isValidAddress = (addr) => {
  if (Address.isValid(addr, undefined)) return true;
  return false;
};
