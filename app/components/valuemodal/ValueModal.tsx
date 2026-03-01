import { Dispatch, SetStateAction } from "react"
import { Button, Modal, InputGroup, Form } from "react-bootstrap"

const LABEL_WIDTH = 140

export default function ValueModal({ shouldShow, setShouldShow, isNew }: { shouldShow: boolean, setShouldShow: Dispatch<SetStateAction<boolean>>, isNew: boolean }) {
    return (
        <Modal show={shouldShow} onHide={() => setShouldShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{isNew ? "Vložiť hodnotu" : "Upraviť hodnotu"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Dátum</InputGroup.Text>
                    <Form.Control type="date" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Štart suma</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Príchod</InputGroup.Text>
                    <Form.Control type="time" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Odchod</InputGroup.Text>
                    <Form.Control type="time" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Hodiny</InputGroup.Text>
                    <Form.Control type="number" step="0.5" min="0" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Tržba</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Terminal</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Výdaj faktúry</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" />
                </InputGroup>
                <InputGroup className="mb-2">
                    <InputGroup.Text style={{ width: LABEL_WIDTH }}>Konečná suma</InputGroup.Text>
                    <Form.Control type="number" step="0.01" min="0" />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                {isNew ? (
                    <div className="d-flex gap-2 w-100">
                        <Button variant="outline-secondary" className="w-100">Vložiť hodnotu</Button>
                    </div>
                ) : (
                    <div className="d-flex gap-2 w-100">
                        <Button variant="outline-secondary" className="w-100">Upraviť</Button>
                        <Button variant="outline-danger" className="w-100">Vymazať</Button>
                    </div>
                )}
            </Modal.Footer>
        </Modal>
    )
}
