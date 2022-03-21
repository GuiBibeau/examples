import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useWen, getSession } from "wen-connect";
import { WenSession } from "wen-connect/dist/core/models";

type Props = {
  session: WenSession;
};

export default function Demo(props: Props) {
  const router = useRouter();
  const { connect, disconnect, wallet } = useWen(props.session);

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handler = wallet.connected ? handleDisconnect : handleConnect;
  const addressText = wallet.connected ? wallet.address : "Connect";
  const handlerText = wallet.connected ? "Disconnect" : "Connect";

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <section className="space-y-6">
              <div>Client hook</div>

              <div className="text-sm">{addressText}</div>

              <div className="space-y-4">
                <button
                  onClick={handler}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {handlerText}
                </button>
                <div>Server side </div>
                <div className="text-sm">
                  {props.session.wallet.connected
                    ? props.session.wallet.address
                    : "not connected in SSR"}
                </div>
                <button
                  onClick={() => router.replace("/")}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Refresh
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: getSession(context),
    },
  };
};
