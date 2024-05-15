// var ethers = require('./js/ethers-5.7.umd.min.js');

function dataToTransfer(type, data) {
  console.log(moment().format("HH:mm:ss") + " dataToTransfer: " + JSON.stringify(data, bigNumberReplacer, 2));
  let result = null;

  if (type.toLowerCase() == "address") {
    result = data;
  } else if (type.toLowerCase() == "keystore") {
    const newData = { ...data, filename: undefined };
    result = JSON.stringify(newData, bigNumberReplacer, 2);

  }
  console.log(moment().format("HH:mm:ss") + " dataToTransfer - result: " + result);
  return result;
}


function dataType(data) {
  if (data) {
    if ('address' in data) {
      if (data.crypto) {
        return "keystore";
      } else {
        return "address";
      }
    } else if ('from' in data) {
      if (('type' in data) && data.type == "2") {
        if ('r' in data) {
          return "signedtype2";
        } else {
          return "unsignedtype2";
        }
      }
    }
  }
  return "notsupported";
}

function checkData(data) {
  const type = dataType(data);
  console.log("\ncheckData - type: " + type + " " + JSON.stringify(data));
  const errors = [];
  if (["address", "keystore"].includes(type)) {
    try {
      const address = ethers.utils.getAddress(data.address);
      // console.log("address: " + address);
    } catch (e) {
      errors.push("'address' invalid");
    }
  }
  if (type == "keystore") {
    if (!('id' in data)) {
      errors.push("'id' missing");
    }
    if (!('version' in data)) {
      errors.push("'version' missing");
    }
    if (!('crypto' in data)) {
      errors.push("'crypto' missing");
    } else {
      if (!('cipher' in data.crypto)) {
        errors.push("'crypto.cipher' missing");
      }
      if (!('cipherparams' in data.crypto)) {
        errors.push("'crypto.cipherparams' missing");
      } else {
        if (!('iv' in data.crypto.cipherparams)) {
          errors.push("'crypto.cipherparams.iv' missing");
        }
      }
      if (!('ciphertext' in data.crypto)) {
        errors.push("'crypto.ciphertext' missing");
      }
      if (!('kdf' in data.crypto)) {
        errors.push("'crypto.kdf' missing");
      }
      if (!('kdfparams' in data.crypto)) {
        errors.push("'crypto.kdfparams' missing");
      } else {
        if (!('salt' in data.crypto.kdfparams)) {
          errors.push("'crypto.kdfparams.salt' missing");
        }
        if (!('n' in data.crypto.kdfparams)) {
          errors.push("'crypto.kdfparams.n' missing");
        }
        if (!('dklen' in data.crypto.kdfparams)) {
          errors.push("'crypto.kdfparams.dklen' missing");
        }
        if (!('p' in data.crypto.kdfparams)) {
          errors.push("'crypto.kdfparams.p' missing");
        }
        if (!('r' in data.crypto.kdfparams)) {
          errors.push("'crypto.kdfparams.r' missing");
        }
      }
      if (!('mac' in data.crypto)) {
        errors.push("'crypto.mac' missing");
      }
    }
  }
  if (["signedtype2", "unsignedtype2"].includes(type)) {
    try {
      const from = ethers.utils.getAddress(data.from);
      console.log("from: " + from);
    } catch (e) {
      errors.push("'from' invalid");
    }
    // `to` must be specified, but can be null, "", or "0x" for contract deployments
    if (!('to' in data)) {
      errors.push("'to' missing");
    } else {
      if (data.to && data.to != "" && data.to != "0x") {
        try {
          const to = ethers.utils.getAddress(data.to);
          console.log("to: " + to);
        } catch (e) {
          errors.push("'to' invalid");
        }
      }
    }
    if (!('value' in data)) {
      errors.push("'value' missing");
    } else {
      try {
        const value = ethers.BigNumber.from(data.value);
        console.log("value: " + value);
      } catch (e) {
        errors.push("'value' invalid");
      }
    }
    if (!('data' in data)) {
      errors.push("'data' missing");
    } else {
      if (data.data && data.data != "" && data.data != "0x") {
        console.log("data: " + data.data);

        // "data": "0xa9059cbb000000000000000000000000a2113f1e9a66c3b0a75bb466bbbfeeec987ac92e000000000000000000000000000000000000000000000000000000000079dc1f",
        //                      1         2         3         4         5         6         7         8         9        10        11        12        13
        //            0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345
        // "data": "0xa9059cbb000000000000000000000000a2113f1e9a66c3b0a75bb466bbbfeeec987ac92e000000000000000000000000000000000000000000000000000000000079dc1f",
        // if ()


      } else {
        if (!data.to || data.to == "" || data.to == "0x") {
          errors.push("'data' and/or 'to' must be specified");
        }
      }
    }
    if (!('type' in data)) {
      errors.push("'type' missing");
    } else {
      try {
        const type = ethers.BigNumber.from(data.type);
        console.log("type: " + type);
        if (type != 2) {
          errors.push("Only type 2 supported");
        }
      } catch (e) {
        errors.push("'type' invalid");
      }
    }
    if (!('chainId' in data)) {
      errors.push("'chainId' missing");
    } else {
      try {
        const chainId = ethers.BigNumber.from(data.chainId);
        console.log("chainId: " + chainId);
      } catch (e) {
        errors.push("'chainId' invalid");
      }
    }
    if (!('nonce' in data)) {
      errors.push("'nonce' missing");
    } else {
      try {
        const nonce = ethers.BigNumber.from(data.nonce);
        console.log("nonce: " + nonce);
      } catch (e) {
        errors.push("'nonce' invalid");
      }
    }
    if (!('gasLimit' in data)) {
      errors.push("'gasLimit' missing");
    } else {
      try {
        const gasLimit = ethers.BigNumber.from(data.gasLimit);
        console.log("gasLimit: " + gasLimit);
      } catch (e) {
        errors.push("'gasLimit' invalid");
      }
    }
    if (!('maxFeePerGas' in data)) {
      errors.push("'maxFeePerGas' missing");
    } else {
      try {
        const maxFeePerGas = ethers.BigNumber.from(data.maxFeePerGas);
        console.log("maxFeePerGas: " + maxFeePerGas);
      } catch (e) {
        errors.push("'maxFeePerGas' invalid");
      }
    }
    if (!('maxPriorityFeePerGas' in data)) {
      errors.push("'maxPriorityFeePerGas' missing");
    } else {
      try {
        const maxPriorityFeePerGas = ethers.BigNumber.from(data.maxPriorityFeePerGas);
        console.log("maxPriorityFeePerGas: " + maxPriorityFeePerGas);
      } catch (e) {
        errors.push("'maxPriorityFeePerGas' invalid");
      }
    }

  }

  console.log("checkData - type: " + type + ", errors: " + errors.join("; "));

  return { errors };
}

function testIt() {

  const TESTDATALIST = [

    // {
    //   "address": null, // Null
    // },
    // {
    //   "address": "", // Blank
    // },
    // {
    //   "address": "720169e755ba14017df473d9d10e682e1e41395a", // No 0x prefix
    // },
    // {
    //   "address": "0x720169E755Ba14017DF473d9D10e682E1e41395A", // 0x prefix
    // },
    // {
    //   "address": "0x720169E755Ba14017DF473d9D10e682E1e41395a", // Incorrect case
    // },
    // {
    //   "address": "0x720169e755ba14017df473d9d10e682e1e41395a2", // Too long
    // },
    // {
    //   "address": "0x720169E755Ba14017DF473d9D10e682E1e41395", // Too short
    // },

    // {
    //   "address": "720169e755ba14017df473d9d10e682e1e41395a",
    //   "id": "b4969a37-2d49-4190-bdb5-1987b2f02c21",
    //   "version": 3,
    //   "crypto": {
    //     "cipher": "aes-128-ctr",
    //     "cipherparams": {
    //       "iv": "adb90f4d486c314e2ec08efbb5f3acac"
    //     },
    //     "ciphertext": "94e241c724d6eeabe900c4d400fee4d504c622e8b1f4432e75fe4dc261fcb05f",
    //     "kdf": "scrypt",
    //     "kdfparams": {
    //       "salt": "fab44d0fe773999496d90a135fe2e5b5c6aef8aee67451c6de5e0efa9076f0e3",
    //       "n": 131072,
    //       "dklen": 32,
    //       "p": 1,
    //       "r": 8
    //     },
    //     "mac": "d4c16a7003d98d2d8f5962181f8c81a1b2d01f9a8c11553e886919967a3d02da"
    //   },
    // },

    {
      "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
      "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
      "value": "1000000000000000000",
      // "data": "0x",
      "data": "0xa9059cbb000000000000000000000000a2113f1e9a66c3b0a75bb466bbbfeeec987ac92e000000000000000000000000000000000000000000000000000000000079dc1f",
      "type": 2,
      // "type": null,
      // "type": "",
      // "type": 1,
      "chainId": 1,
      // "chainId": "1a",
      // "chainId": null,
      // "chainId": "",
      "nonce": 1,
      // "nonce": "1a",
      // "nonce": null,
      // "nonce": "",
      "gasLimit": "1",
      // "gasLimit": "1a",
      // "gasLimit": null,
      // "gasLimit": "",
      "maxFeePerGas": "1000000000",
      // "maxFeePerGas": "1000000000b",
      // "maxFeePerGas": "0x1000000000b",
      // "maxFeePerGas": null,
      // "maxFeePerGas": "",
      "maxPriorityFeePerGas": "1000000000",
      // "maxPriorityFeePerGas": "1000000000a",
      // "maxPriorityFeePerGas": null,
      // "maxPriorityFeePerGas": "",
      "gasPrice": null,
      "accessList": [],
    },

    // {
    //   "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "value": "1000000000000000000",
    //   "data": "0x",
    //   "type": 2,
    //   "chainId": 1,
    //   "nonce": 1,
    //   "gasLimit": "1",
    //   "maxFeePerGas": "1000000000",
    //   "maxPriorityFeePerGas": "1000000000",
    //   "gasPrice": null,
    //   "accessList": [],
    //   "hash": "0x6aa502ae42111476faff7ad21ca7428e91de9f8050d2d8616eb870a811e1f9ce",
    //   "v": 1,
    //   "r": "0x02fa15d6d25494980949fa657019e0ad2bfae0ba15deb071a5857db2626988d8",
    //   "s": "0x45c5f68151ac0ee1ada671a365104b01e4028d3cfa24bdb6f4c767efb8f15f72",
    // },

  ];

  for (const testData of TESTDATALIST) {
    const dataOk = checkData(testData);
    // console.log(dataType(testData) + ": " + JSON.stringify(testData, null, 2));
  }

  console.log("Hi hi");
}

testIt();
