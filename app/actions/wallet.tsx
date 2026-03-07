"use server";

import { auth } from "../lib/auth";
import { getDb } from "../lib/mongo";
import { Wallet, WalletDbDto } from "../interfaces/Wallet";

async function requireAuth() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return session;
}

const DOCUMENT_ID = "wallet";
const COLLECTION = "wallet_final";

export async function getWallet(): Promise<Wallet | null> {
    await requireAuth();
    const db = await getDb();
    const doc = await db.collection<WalletDbDto>(COLLECTION).findOne({ _id: DOCUMENT_ID });
    if (!doc || !doc.history?.length) return null;
    return doc.history[doc.history.length - 1];
}

export async function getWalletHistory(): Promise<Wallet[]> {
    await requireAuth();
    const db = await getDb();
    const doc = await db.collection<WalletDbDto>(COLLECTION).findOne({ _id: DOCUMENT_ID });
    if (!doc || !doc.history?.length) return [];
    return [...doc.history].reverse();
}

export async function setWallet(moneyCents: number): Promise<void> {
    const session = await requireAuth();
    const name = session.user!.name!;
    const db = await getDb();
    const entry: Wallet = {
        name,
        money: moneyCents,
        date: new Date().toISOString(),
    };
    await db.collection<WalletDbDto>(COLLECTION).updateOne(
        { _id: DOCUMENT_ID },
        { $push: { history: entry } },
        { upsert: true }
    );
}
