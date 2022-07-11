import { ethers } from "ethers";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

/**
 * It takes a hex string, removes the `0x` prefix, pads it with zeros to the left, and returns a Buffer
 * @param {any} addr - The address to be converted to a buffer
 * @returns A buffer of the address with the 0's padded to the front.
 */
const padBuffer = (addr: any) => {
  return Buffer.from(addr.substr(2).padStart(32 * 2, 0), "hex");
};

/**
 * It takes an array of addresses, pads each address with zeros, and then creates a Merkle tree from
 * the padded addresses
 * @param {string[]} addresses - string[] - an array of addresses to be included in the allowlist
 * @returns A MerkleTree object
 */
export const getAllowList = (addresses: string[]) => {
  const leaves = addresses.map((address) => padBuffer(address));
  return new MerkleTree(leaves, keccak256, { sort: true });
};

/**
 * It takes an array of addresses and an address, and returns a proof that the address is in the array
 * @param {string[]} addresses - The list of addresses that are allowed to send transactions to the
 * contract.
 * @param {string} address - The address to check if it's in the list
 * @returns The proof that the address is in the allow list.
 */
export const getAllowProof = (addresses: string[], address: string) => {
  const allowList = getAllowList(addresses);
  const proof = allowList.getProof(padBuffer(address));
  return proof;
};

/**
 * `getAllowRoot` returns the root of the allow list if the address is in the allow list, otherwise it
 * returns the entire allow list
 * @param {string[]} addresses - string[] - an array of addresses to check against the allowlist
 * @returns The root of the allow list.
 */
export const getAllowRoot = (addresses: string[]) => {
  const allowList = getAllowList(addresses);
  return allowList.getRoot();
};
