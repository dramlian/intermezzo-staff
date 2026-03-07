"use server";

import { auth } from "../lib/auth";
import { getDb } from "../lib/mongo";
import { Input, InputDbDto } from "../interfaces/Input";

async function requireAuth() {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");
}


export async function getUserInputs(documentName: string): Promise<Input[]> {
    await requireAuth();
    const db = await getDb();

    const day = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName });

    return day?.inputs ?? [];
}

export async function createDefaultInputsForUser(documentName: string): Promise<void> {
    await requireAuth();
    const db = await getDb();
    if ((await getUserInputs(documentName)).length > 0) return;

    if (await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName })) {
        return;
    }

    await db
        .collection<InputDbDto>("inputs")
        .insertOne({ _id: documentName, inputs: [] });
}

export async function deleteInputForUser(documentName: string, day: string): Promise<void> {
    await requireAuth();
    const db = await getDb();

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { _id: documentName },
            { $pull: { inputs: { day: day } } }
        );
}

export async function updateInputForUser(documentName: string, originalDay: string, input: Input): Promise<void> {
    await requireAuth();
    const db = await getDb();

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { _id: documentName, "inputs.day": originalDay },
            { $set: { "inputs.$": input } }
        );
}

export async function addInputForUser(documentName: string, input: Input): Promise<{ duplicate: boolean }> {
    await requireAuth();
    const db = await getDb();

    await createDefaultInputsForUser(documentName);

    const existing = await db
        .collection<InputDbDto>("inputs")
        .findOne({ _id: documentName, "inputs.day": input.day });

    if (existing) return { duplicate: true };

    await db
        .collection<InputDbDto>("inputs")
        .updateOne(
            { _id: documentName },
            { $push: { inputs: input } }
        );

    return { duplicate: false };
}