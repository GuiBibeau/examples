# metamask-nextjs

Simple setup to get currently connected wallet address in the server and client. ## How to use

Deploy on Vercel using this button. This will guide you and setup all in your own Vercel and Github account.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgbibeaul%2Fweb3-examples%2Ftree%2Fmain%2Fapi%2Fvercel-api&project-name=vercl-api&repo-name=vercel-api&demo-title=https%3A%2F%2Fwww.web3-fullstack.com%2Fblog%2Fbuild-deploy-vercel-api)

You can also manually copy this code and deploy on your own. See [more details on the blog post](https://www.web3-fullstack.com/blog/build-deploy-vercel-api)

## Starting

1. Install with `yarn` or `npm install`
2. Copy the `.env.example` file into `.env` and add a secret value. [Use a strong secret.](http://www.unit-conversion.info/texttools/random-string-generator/)
3. run `yarn dev` or `npm run dev`

## usage

connect/disconnect:

```tsx
import { useConnect } from "wen-connect";

const component = () => {
  // call these functions
  const { connect, disconnect } = useConnect();
};
```

get current address

```tsx
import { useWen } from "wen-connect";


  // empty string if not connected
  const { address } = useWen();
};
```

get address in `getServerSideProps`

```tsx
import { useWen } from "wen-connect";

///...
import {  getSession } from "wen-connect";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const serverAddress = await getSession(context);

  // fetch some data to display based on user address

return {
    props: {
        /// your data
    }
}
```