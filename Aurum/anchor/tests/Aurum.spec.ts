import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Aurum} from '../target/types/Aurum'

describe('Aurum', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Aurum as Program<Aurum>

  const AurumKeypair = Keypair.generate()

  it('Initialize Aurum', async () => {
    await program.methods
      .initialize()
      .accounts({
        Aurum: AurumKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([AurumKeypair])
      .rpc()

    const currentCount = await program.account.Aurum.fetch(AurumKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Aurum', async () => {
    await program.methods.increment().accounts({ Aurum: AurumKeypair.publicKey }).rpc()

    const currentCount = await program.account.Aurum.fetch(AurumKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Aurum Again', async () => {
    await program.methods.increment().accounts({ Aurum: AurumKeypair.publicKey }).rpc()

    const currentCount = await program.account.Aurum.fetch(AurumKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Aurum', async () => {
    await program.methods.decrement().accounts({ Aurum: AurumKeypair.publicKey }).rpc()

    const currentCount = await program.account.Aurum.fetch(AurumKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set Aurum value', async () => {
    await program.methods.set(42).accounts({ Aurum: AurumKeypair.publicKey }).rpc()

    const currentCount = await program.account.Aurum.fetch(AurumKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the Aurum account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        Aurum: AurumKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.Aurum.fetchNullable(AurumKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
