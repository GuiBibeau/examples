import { buildClient, BaseClientOptions, XataRecord } from "@xata.io/client";

export interface Member {
  address?: string | null;
  boolean?: boolean | null;
  amount_minted?: number | null;
}

export type MemberRecord = Member & XataRecord;

export type DatabaseSchema = {
  members: Member;
};

const tables = ["members"];

const DatabaseClient = buildClient();

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super(
      {
        databaseURL: "https://web3-full-stack-mcrsd4.xata.sh/db/allowlist-demo",
        ...options,
      },
      tables
    );
  }
}
