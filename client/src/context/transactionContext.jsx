import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contrtactAddress } from "../utils/constants";

export const TransactionContext = createContext({});

const { ethereum } = window;

const getEthereumContract = () => {
  const Provider = new ethers.providers.Web3Provider(ethereum);
  const signer = Provider.getSigner();
  const transactionContract = new ethers.Contract(
    contrtactAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};

const TransactionProvider = ({ children }) => {
  const [Account, setAccount] = useState();
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("please install meta mask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.log("no eth object");
    }
  };

  const connectToMetaMsk = async () => {
    try {
      if (!ethereum) return alert("please install meta mask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.log("no eth object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("please install meta mask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      console.log(addressTo, amount, keyword, message);
      const params = [
        {
          from: Account,
          to: addressTo,
          gas: "0x5208", // 30400
          value: parsedAmount._hex, // 2441406250
        },
      ];
      await ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      // addToBlockChin(address,uint256,string,string)
      const transactionHash = await transactionContract.addToBlockChin(
        addressTo,
        parsedAmount,
        message,
        keyword
      );
      setLoading(true);
      console.log("loading...", transactionHash.hash);
      await transactionHash.wait();
      setLoading(false);
      console.log("loading done...", transactionHash.hash);
    } catch (error) {
      console.log("no eth object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <TransactionContext.Provider
      value={{
        connectToMetaMsk,
        Account,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        loading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
