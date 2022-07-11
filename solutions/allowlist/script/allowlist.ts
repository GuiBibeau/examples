import { xata } from "../lib/xata-client";

export const script = async () => {
  // get addresses from xata
  const addresses = await xata.db.members.all();
};

script();
