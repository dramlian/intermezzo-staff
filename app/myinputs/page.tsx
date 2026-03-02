'use client'
import { Container, Table, Button, Row, Col } from "react-bootstrap"
import MonthSelector from "../components/monthselector/MonthSelector"
import ValueModal from "../components/valuemodal/ValueModal"
import { useState } from "react"
import Input from "../interfaces/Input"

const eur = (cents: number) => `${(cents / 100).toFixed(2)} €`

const dummyInputs: Input[] = [
    { day: "19-5-2026 / Po", hours: 8,   startMoneyCents: 15000, startWorkTime: "06:00", endWorkTime: "14:00", turnoverCents: 62050, turnoverTerminalCents: 18500, dayExpensesCents: 4500, endMoneyCents: 54050 },
    { day: "20-5-2026 / Ut", hours: 8.5, startMoneyCents: 15000, startWorkTime: "06:00", endWorkTime: "14:30", turnoverCents: 71200, turnoverTerminalCents: 21000, dayExpensesCents: 3200, endMoneyCents: 63000 },
    { day: "21-5-2026 / St", hours: 8,   startMoneyCents: 15000, startWorkTime: "06:00", endWorkTime: "14:00", turnoverCents: 58900, turnoverTerminalCents: 17400, dayExpensesCents: 5100, endMoneyCents: 50800 },
    { day: "22-5-2026 / Št", hours: 8,   startMoneyCents: 15000, startWorkTime: "06:00", endWorkTime: "14:00", turnoverCents: 66300, turnoverTerminalCents: 19800, dayExpensesCents: 4000, endMoneyCents: 58300 },
    { day: "23-5-2026 / Pi", hours: 9,   startMoneyCents: 15000, startWorkTime: "06:00", endWorkTime: "15:00", turnoverCents: 84500, turnoverTerminalCents: 25200, dayExpensesCents: 6100, endMoneyCents: 74400 },
    { day: "24-5-2026 / So", hours: 6,   startMoneyCents: 15000, startWorkTime: "08:00", endWorkTime: "14:00", turnoverCents: 49700, turnoverTerminalCents: 14800, dayExpensesCents: 2800, endMoneyCents: 46900 },
    { day: "25-5-2026 / Ne", hours: 6,   startMoneyCents: 15000, startWorkTime: "08:00", endWorkTime: "14:00", turnoverCents: 43100, turnoverTerminalCents: 12600, dayExpensesCents: 2200, endMoneyCents: 40900 },
]

export default function MyInputs() {

    const [shouldShow, setShouldShow] = useState(false);
    const [modalInEdit, setModalInEdit] = useState(false);
    const [hoursView, setHoursView] = useState(false);

    return <Container className='mt-3'>
        <Row className="mb-3">
            <Col xs={6}>
                <MonthSelector selectedMonth={"2026-03"} onMonthChange={() => { }} />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
                <Button variant="outline-secondary" className="w-50 ms-1" onClick={() => { setShouldShow(true); setModalInEdit(false) }}>Vložiť hodnotu</Button>
                <Button variant={hoursView ? "outline-primary" : "outline-success"} className="w-50 ms-1" onClick={() => { setHoursView(!hoursView) }}>{hoursView ? "Zobraziť všetky dáta" : "Zobraziť len hodiny"}</Button>
            </Col>
        </Row>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Dátum/Deň</th>
                    <th>Hodiny</th>
                    {!hoursView && <>
                        <th>Štart suma</th>
                        <th>Príchod</th>
                        <th>Odchod</th>
                        <th>Tržba</th>
                        <th>Terminal</th>
                        <th>Výdaj faktúry</th>
                        <th>Konečná suma</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {dummyInputs.map((input, i) => (
                    <tr key={i} onClick={() => { setShouldShow(true); setModalInEdit(true); }} style={{ cursor: "pointer" }}>
                        <td>{input.day}</td>
                        <td>{input.hours}</td>
                        {!hoursView && <>
                            <td>{eur(input.startMoneyCents)}</td>
                            <td>{input.startWorkTime}</td>
                            <td>{input.endWorkTime}</td>
                            <td>{eur(input.turnoverCents)}</td>
                            <td>{eur(input.turnoverTerminalCents)}</td>
                            <td>{eur(input.dayExpensesCents)}</td>
                            <td>{eur(input.endMoneyCents)}</td>
                        </>}
                    </tr>
                ))}
            </tbody>
        </Table>
        <ValueModal shouldShow={shouldShow} setShouldShow={setShouldShow} isNew={!modalInEdit} />
    </Container>
}
