// https://eth-ropsten.alchemyapi.io/v2/QddRe-i1LzjX15To50Xmq6la04TTveac
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/QddRe-i1LzjX15To50Xmq6la04TTveac",
      accounts: [
        "4a020179f00d7c537136b00ae0774f986748bdca37a9ff6555b8f7855fc53795",
      ],
    },
  },
};
