// {
//   "address": "720169e755ba14017df473d9d10e682e1e41395a",
// }


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
// }

// Unsigned Type 1 does not include hash, v, r, s
// {
//  "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B"
//  "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
//  "value": "1000000000000000000",
//  "data": "0x",
//  "type": 1,
//  "chainId": 1,
//  "nonce": 1,
//  "gasLimit": "1",
//  "gasPrice": "1000000000",
//  "accessList": [],
//  "hash": "0x6aa502ae42111476faff7ad21ca7428e91de9f8050d2d8616eb870a811e1f9ce",
//  "v": 1,
//  "r": "0x02fa15d6d25494980949fa657019e0ad2bfae0ba15deb071a5857db2626988d8",
//  "s": "0x45c5f68151ac0ee1ada671a365104b01e4028d3cfa24bdb6f4c767efb8f15f72",
// }

// Unsigned Type 2 does not include hash, v, r, s
// {
//  "from": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B"
//  "to": "0x4a7075B7D7E0bB80e8e6A0Fcf4fB6E1f33963F6B",
//  "value": "1000000000000000000",
//  "data": "0x",
//  "type": 2,
//  "chainId": 1,
//  "nonce": 1,
//  "gasLimit": "1",
//  "maxPriorityFeePerGas": "1000000000",
//  "maxFeePerGas": "1000000000",
//  "gasPrice": null,
//  "accessList": [],
//  "hash": "0x6aa502ae42111476faff7ad21ca7428e91de9f8050d2d8616eb870a811e1f9ce",
//  "v": 1,
//  "r": "0x02fa15d6d25494980949fa657019e0ad2bfae0ba15deb071a5857db2626988d8",
//  "s": "0x45c5f68151ac0ee1ada671a365104b01e4028d3cfa24bdb6f4c767efb8f15f72",
// }


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
