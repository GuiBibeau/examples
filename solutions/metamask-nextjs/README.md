# metamask-nextjs

Simple setup to get currently connected wallet address in the server and client. ## How to use

Deploy on Vercel using this button. This will guide you and setup all in your own Vercel and Github account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgbibeaul%2Fweb3-examples%2Ftree%2Fmain%2Fsolutions%2Fmetamask-nextjs&env=WEN_SECRET&envDescription=A%20key%20to%20encrypt%20jwt%20tokens%20Wen%20connect%20uses&envLink=http%3A%2F%2Fwww.unit-conversion.info%2Ftexttools%2Frandom-string-generator%2F)

## Starting

1. Install with `yarn` or `npm install`
2. Copy the `.env.example` file into `.env` and add a secret value. [Use a strong secret.](http://www.unit-conversion.info/texttools/random-string-generator/)
3. run `yarn dev` or `npm run dev`

## usage

Everything you need in 1 hook:

```tsx
import { useWen, getSession } from "wen-connect";

const component = () => {
  const { connect, disconnect, wallet } = useWen(props.session);

  return <>{wallet.address}</>;
};
```

Get the session data on the server:

```tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: getSession(context),
    },
  };
};
```

Hydrate the client side hook with the server session to avoid rerenders:

```tsx
export default function Demo(props: Props) {
  const { connect, disconnect, wallet } = useWen(props.session);

  return <>{wallet.address}</>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: getSession(context),
    },
  };
};
```
