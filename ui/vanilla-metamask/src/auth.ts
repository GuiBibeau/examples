const effects: Function[] = [];

export function reactive(object: any) {
  if (object === null || typeof object !== "object") {
    return object;
  }

  for (const property in object) {
    object[property] = reactive(object[property]);
  }

  return new Proxy(object, {
    get(target, property) {
      return target[property];
    },
    set(target, property, value) {
      target[property] = reactive(value);

      effects.forEach((effect) => {
        effect();
      });

      return true;
    },
  });
}

export class Authentication {
  metamaskInstalled = typeof window.ethereum !== "undefined";
  wallet = reactive({
    metamaskAccount: "",
    metamaskChainId: "",
    metamaskBalance: "",
  });

  constructor() {
    this.deserialize();
    this.listenForAccounts();
  }

  hook(callback: Function) {
    effects.push(callback);

    callback();
  }

  serialize = () => {
    localStorage.setItem("wallet", JSON.stringify(this.wallet));
  };

  deserialize = () => {
    const wallet = localStorage.getItem("wallet");
    if (wallet) {
      this.wallet = reactive(JSON.parse(wallet));
    }
  };

  requestAccounts = async () => {
    if (this.metamaskInstalled) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error("No ethereum provider found");
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          this.wallet.metamaskAccount = accounts[0];

          // request the balance
          const balance = await ethereum.request({
            method: "eth_getBalance",
            params: [this.wallet.metamaskAccount, "latest"],
          });
          this.wallet.metamaskBalance = balance;

          // request the chainId
          const chainId = await ethereum.request({
            method: "eth_chainId",
          });
          this.wallet.metamaskChainId = chainId;

          this.serialize();
        }
      } catch (e) {
        console.error("Requesting accounts failed", e);
      }
    }
  };

  disconnect = () => {
    if (this.metamaskInstalled) {
      this.wallet.metamaskAccount = "";
      this.wallet.metamaskChainId = "";
      this.wallet.metamaskBalance = "";
      this.serialize();
    }
  };

  listenForAccounts = async () => {
    if (this.metamaskInstalled) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error("No ethereum provider found");
        }
        ethereum.on("accountsChanged", async (accounts: string[]) => {
          if (accounts.length > 0) {
            this.wallet.metamaskAccount = accounts[0];

            // request the balance
            const balance = await ethereum.request({
              method: "eth_getBalance",
              params: [this.wallet.metamaskAccount, "latest"],
            });
            this.wallet.metamaskBalance = balance;

            // request the chainId
            const chainId = await ethereum.request({
              method: "eth_chainId",
            });
            this.wallet.metamaskChainId = chainId;

            this.serialize();
          } else {
            this.wallet.metamaskAccount = "";
            this.wallet.metamaskBalance = "";
            this.wallet.metamaskChainId = "";
          }
        });
      } catch (e) {
        console.error("Listening for accounts failed", e);
      }
    }
  };
}
