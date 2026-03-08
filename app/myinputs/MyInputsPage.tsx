'use client'
import { Container, Table, Button, Row, Col, Form } from "react-bootstrap"
import MonthSelector from "../components/monthselector/MonthSelector"
import ValueModal from "../components/valuemodal/ValueModal"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useCurrentUser } from "../lib/useCurrentUser"
import { Input } from "../interfaces/Input"
import { getUserInputs, getAllInputs } from "../actions/myinputs"

const eur = (cents: number) => `${(cents / 100).toFixed(2)} €`

export default function MyInputsPage({ isAdmin }: { isAdmin: boolean }) {
    const { email } = useCurrentUser();

    const [shouldShow, setShouldShow] = useState(false);
    const [modalInEdit, setModalInEdit] = useState(false);
    const [selectedInput, setSelectedInput] = useState<Input | undefined>(undefined);
    const [hoursView, setHoursView] = useState(false);
    const [inputs, setInputs] = useState<Input[]>([]);
    const [refreshTable, setRefreshTable] = useState(0);
    const [selectedEmail, setSelectedEmail] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadInputs = async () => {
            setLoading(true);
            const data = isAdmin ? await getAllInputs(selectedMonth) : await getUserInputs(email, selectedMonth);
            setInputs(data);
            setLoading(false);
        };

        if (isAdmin || email) loadInputs();
    }, [refreshTable, email, isAdmin, selectedMonth]);

    const currentMonth = new Date().toISOString().slice(0, 7);
    const isCurrentMonth = selectedMonth === currentMonth;

    const ownerEmails = [...new Set(inputs.map(i => i.ownerEmail).filter((e): e is string => !!e))];
    const visibleInputs = selectedEmail ? inputs.filter(i => i.ownerEmail === selectedEmail) : inputs;

    const sum = (key: keyof Pick<Input, "hours" | "startMoneyCents" | "turnoverCents" | "turnoverTerminalCents" | "dayExpensesCents" | "endMoneyCents">) =>
        visibleInputs.reduce((acc, i) => acc + (i[key] as number), 0);

    return <Container className='mt-3'>
        <Row className="mb-3">
            <Col xs={6}>
                <MonthSelector selectedMonth={selectedMonth} onMonthChange={setSelectedMonth} />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
                <Button variant="outline-secondary" className="w-50 ms-1" onClick={() => { setShouldShow(true); setModalInEdit(false) }}>Vložiť hodnotu</Button>
                <Button variant={hoursView ? "outline-primary" : "outline-success"} className="w-50 ms-1" onClick={() => { setHoursView(!hoursView) }}>{hoursView ? "Zobraziť všetky dáta" : "Zobraziť len hodiny"}</Button>
            </Col>
        </Row>
        {isAdmin && (
            <Row className="mb-3">
                <Col xs={12} md={4}>
                    <Form.Select value={selectedEmail} onChange={e => setSelectedEmail(e.target.value)}>
                        <option value="">Všetci zamestnanci</option>
                        {ownerEmails.map(email => (
                            <option key={email} value={email}>{email}</option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        )}
        {loading && (
            <div className="d-flex justify-content-center my-5">
                <ClipLoader color="#f0f0f0" size={50} />
            </div>
        )}
        {!loading && <Table bordered hover variant="dark">
            <thead>
                <tr>
                    {isAdmin && <th>Zamestnanec</th>}
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
                {visibleInputs.map((input, i) => {
                    const isEditable = isAdmin || (isCurrentMonth && i >= visibleInputs.length - 2)
                    const money = (cents: number) => isEditable ? eur(cents) : "****"
                    return (
                        <tr key={i} onClick={isEditable ? () => { setShouldShow(true); setModalInEdit(true); setSelectedInput(input); } : undefined} style={isEditable ? { cursor: "pointer" } : { opacity: 0.35, pointerEvents: "none" }}>
                            {isAdmin && <td>{input.owner}</td>}
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
            <tfoot>
                <tr className="table-secondary fw-bold">
                    {isAdmin && <td>Spolu</td>}
                    <td>{!isAdmin && "Spolu"}</td>
                    <td>{sum("hours").toFixed(2)}</td>
                    {!hoursView && <>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{eur(sum("turnoverCents"))}</td>
                        <td>{eur(sum("turnoverTerminalCents"))}</td>
                        <td></td>
                        <td></td>
                    </>}
                </tr>
            </tfoot>
        </Table>}
        <ValueModal shouldShow={shouldShow} setShouldShow={setShouldShow} isNew={!modalInEdit} input={selectedInput} month={selectedMonth} onSuccess={() => setRefreshTable(n => n + 1)} />
    </Container>
}