'use client'
import { Container, Table, Button, Row, Col } from "react-bootstrap"
import MonthSelector from "../components/monthselector/MonthSelector"
import ValueModal from "../components/valuemodal/ValueModal"
import { useEffect, useState } from "react"
import { Input } from "../interfaces/Input"
import { getUserInputs } from "../actions/myinputs"

const eur = (cents: number) => `${(cents / 100).toFixed(2)} €`



export default function MyInputs() {

    const [shouldShow, setShouldShow] = useState(false);
    const [modalInEdit, setModalInEdit] = useState(false);
    const [hoursView, setHoursView] = useState(false);
    const [inputs, setInputs] = useState<Input[]>([]);
    const [refreshTable, setRefreshTable] = useState(0);

    useEffect(() => {
        const loadInputs = async () => {
            const data = await getUserInputs("test_user");
            setInputs(data);
        };

        loadInputs();
    }, [refreshTable]);

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
        <Table bordered hover>
            <thead>
                <tr className="table-light">
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
                {inputs.map((input, i) => {
                    const isEditable = i >= inputs.length - 2
                    const money = (cents: number) => isEditable ? eur(cents) : "****"
                    return (
                        <tr key={i} onClick={isEditable ? () => { setShouldShow(true); setModalInEdit(true); } : undefined} className={isEditable ? "table-light" : "table-secondary"} style={isEditable ? { cursor: "pointer" } : { opacity: 0.5, pointerEvents: "none" }}>
                            <td>{input.day}</td>
                            <td>{input.hours}</td>
                            {!hoursView && <>
                                <td>{money(input.startMoneyCents)}</td>
                                <td>{input.startWorkTime}</td>
                                <td>{input.endWorkTime}</td>
                                <td>{money(input.turnoverCents)}</td>
                                <td>{money(input.turnoverTerminalCents)}</td>
                                <td>{money(input.dayExpensesCents)}</td>
                                <td>{money(input.endMoneyCents)}</td>
                            </>}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
        <ValueModal shouldShow={shouldShow} setShouldShow={setShouldShow} isNew={!modalInEdit} onSuccess={() => setRefreshTable(n => n + 1)} />
    </Container>
}
