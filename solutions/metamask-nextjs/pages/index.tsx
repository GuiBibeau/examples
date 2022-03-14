import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useConnect, useWen, getSession } from "wen-connect";

export default function Demo({ serverAddress }: { serverAddress: string }) {
  const router = useRouter();
  const { connect, disconnect } = useConnect();
  const { address } = useWen();

  const handleConnect = () => {
    connect();
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handler = address.length > 0 ? handleDisconnect : handleConnect;
  const handlerText = address.length > 0 ? "Disconnect" : "Connect";
  const addressText = address.length > 0 ? address : "not connected";

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
                  {serverAddress ? serverAddress : "not connected in SSR"}
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
  const serverAddress = await getSession(context);
  // this is where you will prefetch data when a user is authenticated
  return {
    props: {
      serverAddress,
    },
  };
};
