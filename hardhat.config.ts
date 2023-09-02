import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    linea_testnet: {
      url: `https://rpc.goerli.linea.build`,
      accounts: [process.env.PRIVATE_KEY_1 + '', process.env.PRIVATE_KEY_2 + '']
    }
  }
};

export default config;
