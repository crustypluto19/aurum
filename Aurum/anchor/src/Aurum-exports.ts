// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import AurumIDL from '../target/idl/Aurum.json'
import type { Aurum } from '../target/types/Aurum'

// Re-export the generated IDL and type
export { Aurum, AurumIDL }

// The programId is imported from the program IDL.
export const AURUM_PROGRAM_ID = new PublicKey(AurumIDL.address)

// This is a helper function to get the Aurum Anchor program.
export function getAurumProgram(provider: AnchorProvider) {
  return new Program(AurumIDL as Aurum, provider)
}

// This is a helper function to get the program ID for the Aurum program depending on the cluster.
export function getAurumProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Aurum program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return AURUM_PROGRAM_ID
  }
}
