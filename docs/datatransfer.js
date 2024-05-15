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
      } else {
        if ('r' in data) {
          return "signedtype1";
        } else {
          return "unsignedtype1";
        }
      }
    }
  }
}

function checkData(data) {
  const type = dataType(data);
  console.log("\ncheckData - type: " + type + " " + JSON.stringify(data));
  let error = null;
  if (["address", "keystore"].includes(type)) {
    try {
      const testAddress = ethers.utils.getAddress(data.address);
      // console.log("testAddress: " + testAddress);
    } catch (e) {
      error = "'address' invalid";
    }
  }
  if (!error && type == "keystore") {
    if (!('id' in data)) {
      error = "'id' missing";
    }
    if (!error && !('version' in data)) {
      error = "'version' missing";
    }
    if (!error && !('crypto' in data)) {
      error = "'crypto' missing";
    }
    if (!error && !('cipher' in data.crypto)) {
      error = "'crypto.cipher' missing";
    }
    if (!error && !('cipherparams' in data.crypto)) {
      error = "'crypto.cipherparams' missing";
    }
    if (!error && !('iv' in data.crypto.cipherparams)) {
      error = "'crypto.cipherparams.iv' missing";
    }
    if (!error && !('ciphertext' in data.crypto)) {
      error = "'crypto.ciphertext' missing";
    }
    if (!error && !('kdf' in data.crypto)) {
      error = "'crypto.kdf' missing";
    }
    if (!error && !('kdfparams' in data.crypto)) {
      error = "'crypto.kdfparams' missing";
    }
    if (!error && !('salt' in data.crypto.kdfparams)) {
      error = "'crypto.kdfparams.salt' missing";
    }
    if (!error && !('n' in data.crypto.kdfparams)) {
      error = "'crypto.kdfparams.n' missing";
    }
    if (!error && !('dklen' in data.crypto.kdfparams)) {
      error = "'crypto.kdfparams.dklen' missing";
    }
    if (!error && !('p' in data.crypto.kdfparams)) {
      error = "'crypto.kdfparams.p' missing";
    }
    if (!error && !('r' in data.crypto.kdfparams)) {
      error = "'crypto.kdfparams.r' missing";
    }
    if (!error && !('mac' in data.crypto)) {
      error = "'crypto.mac' missing";
    }
  }
  if (!error && ["signedtype1", "unsignedtype1", "signedtype2", "unsignedtype2"].includes(type)) {
    try {
      const testFrom = ethers.utils.getAddress(data.from);
      console.log("testFrom: " + testFrom);
    } catch (e) {
      error = "'from' invalid";
    }
    if (!error) {
      if (!('to' in data)) {
        error = "'to' missing";
      } else {
        if (data.to) {
          try {
            const testTo = ethers.utils.getAddress(data.to);
            console.log("testTo: " + testTo);
          } catch (e) {
            error = "'to' invalid";
          }
        }
      }
    }

    if (!error) {
      if (!('value' in data)) {
        error = "'value' missing";
      } else {
        try {
          const testValue = ethers.BigNumber.from(data.value);
          console.log("testValue: " + testValue);
        } catch (e) {
          error = "'value' invalid";
        }
      }
    }

    // {
    //   "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "value": "1000000000000000000",
    //   "data": "0x",
    //   // "type": 1,
    //   "chainId": 1,
    //   "nonce": 1,
    //   "gasLimit": "1",
    //   "gasPrice": "1000000000",
    //   "accessList": [],
    // },

  }

  console.log("checkData - type: " + type + ", error: " + error);

  return { error };
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
      "data": "0x",
      // "type": 1,
      "chainId": 1,
      "nonce": 1,
      "gasLimit": "1",
      "gasPrice": "1000000000",
      "accessList": [],
    },

    // {
    //    "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //    "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //    "value": "1000000000000000000",
    //    "data": "0x",
    //    // "type": 1,
    //    "chainId": 1,
    //    "nonce": 1,
    //    "gasLimit": "1",
    //    "gasPrice": "1000000000",
    //    "accessList": [],
    //    "hash": "0x6aa502ae42111476faff7ad21ca7428e91de9f8050d2d8616eb870a811e1f9ce",
    //    "v": 1,
    //    "r": "0x02fa15d6d25494980949fa657019e0ad2bfae0ba15deb071a5857db2626988d8",
    //    "s": "0x45c5f68151ac0ee1ada671a365104b01e4028d3cfa24bdb6f4c767efb8f15f72",
    //  },

    // {
    //   "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "value": "1000000000000000000",
    //   "data": "0x",
    //   "type": 2,
    //   "chainId": 1,
    //   "nonce": 1,
    //   "gasLimit": "1",
    //   "maxPriorityFeePerGas": "1000000000",
    //   "maxFeePerGas": "1000000000",
    //   "gasPrice": null,
    //   "accessList": [],
    // },

    // {
    //   "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
    //   "value": "1000000000000000000",
    //   "data": "0x",
    //   "type": 2,
    //   "chainId": 1,
    //   "nonce": 1,
    //   "gasLimit": "1",
    //   "maxPriorityFeePerGas": "1000000000",
    //   "maxFeePerGas": "1000000000",
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
