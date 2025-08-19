// src/app/api/mine/route.ts
import { NextResponse } from 'next/server'
import { mineOnChain } from '@/lib/chain'

export async function POST() {
  try {
    const userWallet = process.env.TEST_USER_WALLET as `0x${string}`
    if (!userWallet) throw new Error('No user wallet set')

    const { blockNumber, reward, txHash } = await mineOnChain(userWallet)

    return NextResponse.json({ blockNumber, reward, txHash })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Mining failed' }, { status: 500 })
  }
}

