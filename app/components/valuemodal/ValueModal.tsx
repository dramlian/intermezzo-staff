import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Modal, InputGroup, Form } from "react-bootstrap"
import { addInputForUser, deleteInputForUser, updateInputForUser } from "../../actions/myinputs"
import { Input } from "../../interfaces/Input"

const LABEL_WIDTH = 140

const centsToStr = (cents: number) => (cents / 100).toFixed(2)

export default function ValueModal({ shouldShow, setShouldShow, isNew, input, onSuccess }: { shouldShow: boolean, setShouldShow: Dispatch<SetStateAction<boolean>>, isNew: boolean, input?: Input, onSuccess: () => void }) {
    const [day, setDay] = useState("")
    const [hours, setHours] = useState("")
    const [startMoneyCents, setStartMoneyCents] = useState("")
    const [startWorkTime, setStartWorkTime] = useState("")
    const [endWorkTime, setEndWorkTime] = useState("")
    const [turnoverCents, setTurnoverCents] = useState("")
    const [turnoverTerminalCents, setTurnoverTerminalCents] = useState("")
    const [dayExpensesCents, setDayExpensesCents] = useState("")
    const [endMoneyCents, setEndMoneyCents] = useState("")

    useEffect(() => {
        if (!isNew && input) {
            setDay(input.day)
            setHours(String(input.hours))
            setStartMoneyCents(centsToStr(input.startMoneyCents))
            setStartWorkTime(input.startWorkTime)
            setEndWorkTime(input.endWorkTime)
            setTurnoverCents(centsToStr(input.turnoverCents))
            setTurnoverTerminalCents(centsToStr(input.turnoverTerminalCents))
            setDayExpensesCents(centsToStr(input.dayExpensesCents))
            setEndMoneyCents(centsToStr(input.endMoneyCents))
        } else if (isNew) {
            setDay("")
            setHours("")
            setStartMoneyCents("")
            setStartWorkTime("")
            setEndWorkTime("")
            setTurnoverCents("")
            setTurnoverTerminalCents("")
            setDayExpensesCents("")
            setEndMoneyCents("")
        }
    }, [input, isNew])

    function buildInput(): Input {
        return {
            day,
            hours: parseFloat(hours),
            startMoneyCents: Math.round(parseFloat(startMoneyCents) * 100),
            startWorkTime,
            endWorkTime,
            turnoverCents: Math.round(parseFloat(turnoverCents) * 100),
            turnoverTerminalCents: Math.round(parseFloat(turnoverTerminalCents) * 100),
            dayExpensesCents: Math.round(parseFloat(dayExpensesCents) * 100),
            endMoneyCents: Math.round(parseFloat(endMoneyCents) * 100),
        }
    }

    async function handleInsert() {
        await addInputForUser("test_user", buildInput())
        setShouldShow(false)
        onSuccess()
    }

    async function handleUpdate() {
        if (!input) return
        await updateInputForUser("test_user", input.day, buildInput())
        setShouldShow(false)
        onSuccess()
    }

    async function handleDelete() {
        if (!input) return
        await deleteInputForUser("test_user", input.day)
        setShouldShow(false)
        onSuccess()
    }

    return (
        <Modal show={shouldShow} onHide={() => setShouldShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{isNew ? "Vložiť hodnotu" : "Upraviť hodnotu"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Dátum</InputGroup.Text>
                    <Form.Control type="date" value={day} onChange={e => setDay(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Štart suma</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={startMoneyCents} onChange={e => setStartMoneyCents(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Príchod</InputGroup.Text>
                    <Form.Control type="time" value={startWorkTime} onChange={e => setStartWorkTime(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Odchod</InputGroup.Text>
                    <Form.Control type="time" value={endWorkTime} onChange={e => setEndWorkTime(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Hodiny</InputGroup.Text>
                    <Form.Control type="number" step="0.5" min="0" value={hours} onChange={e => setHours(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Tržba</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={turnoverCents} onChange={e => setTurnoverCents(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Terminal</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={turnoverTerminalCents} onChange={e => setTurnoverTerminalCents(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Výdaj faktúry</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={dayExpensesCents} onChange={e => setDayExpensesCents(e.target.value)} />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Konečná suma</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" value={endMoneyCents} onChange={e => setEndMoneyCents(e.target.value)} />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                {isNew ? (
                    <div className="d-flex gap-2 w-100">
                        <Button variant="outline-secondary" className="w-100" onClick={handleInsert}>Vložiť hodnotu</Button>
                    </div>
                ) : (
                    <div className="d-flex gap-2 w-100">
                        <Button variant="outline-secondary" className="w-100" onClick={handleUpdate}>Upraviť</Button>
                        <Button variant="outline-danger" className="w-100" onClick={handleDelete}>Vymazať</Button>
                    </div>
                )}
            </Modal.Footer>
        </Modal>
    )
}
