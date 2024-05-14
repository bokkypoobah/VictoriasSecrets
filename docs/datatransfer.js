function dataToTransfer(type, data) {
  console.log(moment().format("HH:mm:ss") + " dataToTransfer: " + JSON.stringify(data, bigNumberReplacer, 2));
  let result = null;

  if (type.toLowerCase() == "address") {
    result = data;
  } else if (type.toLowerCase() == "keystore") {
    const newData = { ...data, filename: undefined };
    result = JSON.stringify(newData, bigNumberReplacer, 2);





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
    //   "filename": "UTC--2024-05-01T03-43-30.0Z--720169e755ba14017df473d9d10e682e1e41395a"
    // }

  }
  console.log(moment().format("HH:mm:ss") + " dataToTransfer - result: " + result);
  return result;
}
