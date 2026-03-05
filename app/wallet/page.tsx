"use client"

import { useEffect, useState } from "react"
import { Button, Form, InputGroup, Container, Row } from "react-bootstrap"
import { format } from "date-fns"
import { getWallet, setWallet } from "../actions/wallet"
import { Wallet } from "../interfaces/Wallet"

const LABEL_WIDTH = 120

export default function WalletPage() {
    const [current, setCurrent] = useState<Wallet | null>(null)
    const [amount, setAmount] = useState("")

    async function load() {
        const data = await getWallet()
        setCurrent(data)
    }

    useEffect(() => { load() }, [])

    async function handleSubmit() {
        const cents = Math.round(parseFloat(amount) * 100)
        if (isNaN(cents)) return
        await setWallet(cents)
        setAmount("")
        await load()
    }

    return (
        <Container>
            <Row className="mt-5 border rounded p-3">
                <p className="text-muted mb-1">Aktuálny stav</p>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Autor</InputGroup.Text>
                    <Form.Control value={current?.name ?? "—"} readOnly />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Aktualizovane</InputGroup.Text>
                    <Form.Control value={current?.date ? format(new Date(current.date), "dd/MM/yyyy HH:mm:ss") : "—"} readOnly />
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroup.Text>Momentálna suma</InputGroup.Text>
                    <Form.Control value={current != null ? (current.money / 100).toFixed(2) : "—"} readOnly />
                    <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
            </Row>

            <Row className="mt-2 border rounded p-3">
                <p className="text-muted mb-1">Nastaviť novú hodnotu</p>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Nová suma</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={amount} onChange={e => setAmount(e.target.value)} />
                    <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
                <div className="d-grid">
                    <Button variant="outline-secondary" onClick={handleSubmit}>Potvrdiť</Button>
                </div>
            </Row>
        </Container>
    )
}
