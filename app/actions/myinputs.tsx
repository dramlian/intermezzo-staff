"use server";

import { auth } from "../lib/auth";
import { getDb } from "../lib/mongo";
import { Input, InputDbDto } from "../interfaces/Input";

async function requireAuth() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
    return session;
}


export async function getUserInputs(documentName: string): Promise<Input[]> {
    await requireAuth();
    const db = await getDb();

    const day = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName });

    return day?.inputs ?? [];
}

export async function getAllInputs(): Promise<Input[]> {
    await requireAuth();
    const db = await getDb();

    const docs = await db
        .collection<InputDbDto>("inputs")
        .find()
        .toArray();

    return docs.flatMap(doc => doc.inputs ?? []);
}

export async function createDefaultInputsForUser(documentName: string): Promise<void> {
    await requireAuth();
    const db = await getDb();

    if (await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName })) {
        return;
    }

    await db
        .collection<InputDbDto>("inputs")
        .insertOne({ _id: documentName, inputs: [] });
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

export async function addInputForUser(documentName: string, input: Input): Promise<{ duplicate: boolean }> {
    const session = await requireAuth();
    const db = await getDb();

    await createDefaultInputsForUser(documentName);

    const inputWithOwner: Input = { ...input, id: crypto.randomUUID(), owner: session.user!.name! };

    const existing = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName, "inputs.day": input.day });

    if (existing) return { duplicate: true };

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { _id: documentName },
            { $push: { inputs: inputWithOwner } }
        );

    return { duplicate: false };
}