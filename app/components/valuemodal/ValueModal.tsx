import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Button, Modal, InputGroup, Form, Toast, ToastContainer } from "react-bootstrap"
import { addInputForUser, deleteInputForUser, updateInputForUser } from "../../actions/myinputs"
import { Input } from "../../interfaces/Input"

const LABEL_WIDTH = 140

const centsToStr = (cents: number) => (cents / 100).toFixed(2)
const today = () => new Date().toISOString().split("T")[0]

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

    const [toast, setToast] = useState<{ show: boolean, message: string, variant: "success" | "warning" }>({ show: false, message: "", variant: "success" })

    useEffect(() => {
        if (!startWorkTime || !endWorkTime) { setHours(""); return }
        const [sh, sm] = startWorkTime.split(":").map(Number)
        const [eh, em] = endWorkTime.split(":").map(Number)
        const diff = (eh * 60 + em) - (sh * 60 + sm)
        if (diff <= 0) { setHours(""); showToast("Odchod musí byť po príchode.", "warning"); return }
        setHours((diff / 60).toFixed(2))
    }, [startWorkTime, endWorkTime])

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
            setDay(today())
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

    function validate(): string | null {
        if (!day) return "Dátum je povinný."
        if (!startWorkTime) return "Príchod je povinný."
        if (!endWorkTime) return "Odchod je povinný."
        if (!hours) return "Odchod musí byť po príchode."
        if (!startMoneyCents || isNaN(parseFloat(startMoneyCents))) return "Štart suma je povinná."
        if (!turnoverCents || isNaN(parseFloat(turnoverCents))) return "Tržba je povinná."
        if (!turnoverTerminalCents || isNaN(parseFloat(turnoverTerminalCents))) return "Terminal je povinný."
        if (!dayExpensesCents || isNaN(parseFloat(dayExpensesCents))) return "Výdaj faktúry je povinný."
        if (!endMoneyCents || isNaN(parseFloat(endMoneyCents))) return "Konečná suma je povinná."
        return null
    }

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

    function showToast(message: string, variant: "success" | "warning") {
        setToast({ show: true, message, variant })
    }

    async function handleInsert() {
        const error = validate()
        if (error) { showToast(error, "warning"); return }
        const { duplicate } = await addInputForUser("test_user", buildInput())
        if (duplicate) { showToast("Záznam pre tento dátum už existuje.", "warning"); return }
        setShouldShow(false)
        onSuccess()
        showToast("Hodnota bola úspešne vložená.", "success")
    }

    async function handleUpdate() {
        if (!input) return
        const error = validate()
        if (error) { showToast(error, "warning"); return }
        await updateInputForUser("test_user", input.day, buildInput())
        setShouldShow(false)
        onSuccess()
        showToast("Hodnota bola úspešne upravená.", "success")
    }

    async function handleDelete() {
        if (!input) return
        await deleteInputForUser("test_user", input.day)
        setShouldShow(false)
        onSuccess()
        showToast("Hodnota bola vymazaná.", "success")
    }

    return (
        <>
            <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
                <Toast bg={toast.variant} show={toast.show} onClose={() => setToast(t => ({ ...t, show: false }))} delay={3000} autohide>
                    <Toast.Body className="text-white fw-semibold">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Modal show={shouldShow} onHide={() => setShouldShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isNew ? "Vložiť hodnotu" : "Upraviť hodnotu"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Dátum</InputGroup.Text>
                        <Form.Control type="date" value={day} onChange={e => setDay(e.target.value)} min={isNew ? today() : undefined} max={isNew ? today() : undefined} readOnly={!isNew} />
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Štart suma</InputGroup.Text>
                        <Form.Control type="number" step="0.01" min="0" value={startMoneyCents} onChange={e => setStartMoneyCents(e.target.value)} />
                        <InputGroup.Text>€</InputGroup.Text>
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
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Tržba</InputGroup.Text>
                        <Form.Control type="number" step="0.01" min="0" value={turnoverCents} onChange={e => setTurnoverCents(e.target.value)} />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Terminal</InputGroup.Text>
                        <Form.Control type="number" step="0.01" min="0" value={turnoverTerminalCents} onChange={e => setTurnoverTerminalCents(e.target.value)} />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Výdaj faktúry</InputGroup.Text>
                        <Form.Control type="number" step="0.01" min="0" value={dayExpensesCents} onChange={e => setDayExpensesCents(e.target.value)} />
                        <InputGroup.Text>€</InputGroup.Text>
                    </InputGroup>
                    <InputGroup className="mb-2">
                        <InputGroup.Text style={{ width: LABEL_WIDTH }}>Konečná suma</InputGroup.Text>
                        <Form.Control type="number" step="0.01" min="0" value={endMoneyCents} onChange={e => setEndMoneyCents(e.target.value)} />
                        <InputGroup.Text>€</InputGroup.Text>
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
        </>
    )
}
