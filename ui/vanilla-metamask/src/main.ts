import { Authentication } from "./auth";

const auth = new Authentication();

const address = document.querySelector<HTMLDivElement>("#address")!;
const balance = document.querySelector<HTMLDivElement>("#balance")!;
const chainId = document.querySelector<HTMLDivElement>("#chainId")!;

const connect = document.querySelector<HTMLButtonElement>("#connect")!;
const disconnect = document.querySelector<HTMLButtonElement>("#disconnect")!;

connect.addEventListener("click", auth.requestAccounts);
disconnect.addEventListener("click", auth.disconnect);

auth.hook(() => {
  address.innerText = `Your address is: ${auth.wallet.metamaskAccount}`;
  balance.innerText = `Your balance is: ${auth.wallet.metamaskBalance}`;
  chainId.innerText = `Your chainId is: ${auth.wallet.metamaskChainId}`;
});
