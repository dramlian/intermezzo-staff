"use client"

import { useState } from "react"
import { Button, Form, InputGroup, Container, Row } from "react-bootstrap"

const LABEL_WIDTH = 120

export default function Wallet() {
    const [amount, setAmount] = useState("")

    function handleSubmit() {
        console.log({ amount })
    }

    return (
        <Container>
            <Row className="mt-5 border rounded p-3">
                <p className="text-muted mb-1">Aktuálny stav</p>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Autor</InputGroup.Text>
                    <Form.Control value="Bob Joe" readOnly />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Dátum zmeny</InputGroup.Text>
                    <Form.Control value="10-9-2018" readOnly />
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroup.Text >Momentálna suma</InputGroup.Text>
                    <Form.Control value="500" readOnly />
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
        </Container >
    )
}
