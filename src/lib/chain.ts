import { createPublicClient, createWalletClient, http, parseEther } from 'viem'
import { avalancheFuji, avalanche } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

/**
 * Create a client to read from Avalanche C‑Chain
 */
const publicClient = createPublicClient({
  chain: process.env.NODE_ENV === 'production' ? avalanche : avalancheFuji,
  transport: http(process.env.AVAX_RPC_URL) // from .env.local
})

/**
 * Wallet client for sending transactions
 */
const account = privateKeyToAccount(process.env.MINER_PRIVATE_KEY as `0x${string}`)
const walletClient = createWalletClient({
  account,
  chain: process.env.NODE_ENV === 'production' ? avalanche : avalancheFuji,
  transport: http(process.env.AVAX_RPC_URL)
})

/**
 * Example on‑chain "mine" action — replace with your real contract call
 */
export async function mineOnChain(userAddress: `0x${string}`) {
  // Example: send minimal AVAX to self or a mining contract to simulate work
  const txHash = await walletClient.sendTransaction({
    to: userAddress,
    value: parseEther('0.0001')
  })

  // Wait for the transaction to be mined
  const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash })

  // Replace this with your reward logic
  return {
    blockNumber: Number(receipt.blockNumber),
    reward: 1,
    txHash
  }
}
