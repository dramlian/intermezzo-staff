"use server";

import { auth } from "../lib/auth";
import { getDb } from "../lib/mongo";
import { Input, InputDbDto } from "../interfaces/Input";

async function requireAuth() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return session;
}

const docId = (email: string, month: string) => `${email}_${month}`;

export async function getUserInputs(email: string, month: string): Promise<Input[]> {
    await requireAuth();
    const db = await getDb();

    const doc = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: docId(email, month) });

    return doc?.inputs ?? [];
}

export async function getAllInputs(month: string): Promise<Input[]> {
    await requireAuth();
    const db = await getDb();

    const docs = await db
        .collection<InputDbDto>("inputs")
        .find({ _id: { $regex: `_${month}$` } })
        .toArray();

    return docs.flatMap(doc => doc.inputs ?? []);
}

async function createDefaultInputsForUser(id: string): Promise<void> {
    const db = await getDb();

    if (await db.collection<InputDbDto>("inputs").findOne({ _id: id })) {
        return;
    }

    await db.collection<InputDbDto>("inputs").insertOne({ _id: id, inputs: [] });
}

export async function deleteInputForUser(id: string): Promise<void> {
    await requireAuth();
    const db = await getDb();

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { "inputs.id": id },
            { $pull: { inputs: { id } } }
        );
}

export async function updateInputForUser(id: string, input: Input): Promise<void> {
    await requireAuth();
    const db = await getDb();

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { "inputs.id": id },
            { $set: { "inputs.$": input } }
        );
}

export async function addInputForUser(email: string, month: string, input: Input): Promise<{ duplicate: boolean }> {
    const session = await requireAuth();
    const db = await getDb();

    const id = docId(email, month);
    await createDefaultInputsForUser(id);

    const inputWithOwner: Input = { ...input, id: crypto.randomUUID(), owner: session.user!.name!, ownerEmail: session.user!.email! };

    const existing = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: id, "inputs.day": input.day });

    if (existing) return { duplicate: true };

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { _id: id },
            { $push: { inputs: inputWithOwner } }
        );

    return { duplicate: false };
}
