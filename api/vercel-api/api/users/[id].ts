import { NowRequest, NowResponse } from "@vercel/node";

const users = ["Bob Smith", "Guillame Bibeau"];

export default (req: NowRequest, res: NowResponse) => {
  const { id } = req.query;
  res.status(200).json({ user: users[Number(id)] });
};
