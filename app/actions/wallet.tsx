"use server";

import { getDb } from "../lib/mongo";
import { Wallet, WalletDbDto } from "../interfaces/Wallet";

const DOCUMENT_ID = "wallet";
const COLLECTION = "wallet_final";
const HARDCODED_NAME = "Joe Doe";

export async function getWallet(): Promise<Wallet | null> {
    const db = await getDb();
    const doc = await db.collection<WalletDbDto>(COLLECTION).findOne({ _id: DOCUMENT_ID });
    if (!doc || !doc.history?.length) return null;
    return doc.history[doc.history.length - 1];
}

export async function getWalletHistory(): Promise<Wallet[]> {
    const db = await getDb();
    const doc = await db.collection<WalletDbDto>(COLLECTION).findOne({ _id: DOCUMENT_ID });
    if (!doc || !doc.history?.length) return [];
    return [...doc.history].reverse();
}

export async function setWallet(moneyCents: number): Promise<void> {
    const db = await getDb();
    const entry: Wallet = {
        name: HARDCODED_NAME,
        money: moneyCents,
        date: new Date().toISOString(),
    };
    await db.collection<WalletDbDto>(COLLECTION).updateOne(
        { _id: DOCUMENT_ID },
        { $push: { history: entry } },
        { upsert: true }
    );
}
