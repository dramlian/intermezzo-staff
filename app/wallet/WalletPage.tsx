"use client"

import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { Button, Form, InputGroup, Container, Row, Accordion } from "react-bootstrap"
import { format } from "date-fns"
import { getWallet, getWalletHistory, setWallet } from "../actions/wallet"
import { Wallet } from "../interfaces/Wallet"

const LABEL_WIDTH = 120

export default function WalletPage({ isAdmin }: { isAdmin: boolean }) {
    const [current, setCurrent] = useState<Wallet | null>(null)
    const [history, setHistory] = useState<Wallet[]>([])
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false)

    async function load() {
        setLoading(true)
        const [data, hist] = await Promise.all([getWallet(), getWalletHistory()])
        setCurrent(data)
        setHistory(hist)
        setLoading(false)
    }

    useEffect(() => { load() }, [])

    async function handleSubmit() {
        const cents = Math.round(parseFloat(amount) * 100)
        if (isNaN(cents)) return
        await setWallet(cents)
        setAmount("")
        await load()
    }

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <ClipLoader color="#f0f0f0" size={50} />
        </div>
    )

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

            {isAdmin && (
                <Row className="mt-2 border rounded p-3">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>História</Accordion.Header>
                            <Accordion.Body style={{ maxHeight: 320, overflowY: "auto" }}>
                                {history.map((entry, i) => (
                                    <div key={i}>
                                        {i > 0 && <hr className="my-3" />}
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text style={{ width: LABEL_WIDTH }}>Autor</InputGroup.Text>
                                            <Form.Control value={entry.name} readOnly />
                                        </InputGroup>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text style={{ width: LABEL_WIDTH }}>Aktualizovane</InputGroup.Text>
                                            <Form.Control value={format(new Date(entry.date), "dd/MM/yyyy HH:mm:ss")} readOnly />
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Text>Momentálna suma</InputGroup.Text>
                                            <Form.Control value={(entry.money / 100).toFixed(2)} readOnly />
                                            <InputGroup.Text>€</InputGroup.Text>
                                        </InputGroup>
                                    </div>
                                ))}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
            )}
        </Container>
    )
}