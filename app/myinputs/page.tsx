'use client'
import { Container, Table, Button, Row, Col } from "react-bootstrap"
import MonthSelector from "../components/monthselector/MonthSelector"
import ValueModal from "../components/valuemodal/ValueModal"
import { useState } from "react"

export default function MyInputs() {

    const [shouldShow, setShouldShow] = useState(false);
    const [modalInEdit, setModalInEdit] = useState(false);

    return <Container className='mt-3'>
        <Row className="mb-3">
            <Col xs={6}>
                <MonthSelector selectedMonth={"2026-03"} onMonthChange={() => { }} />
            </Col>
            <Col xs={6} className="d-flex align-items-center">
                <Button variant="outline-secondary" className="w-100" onClick={() => { setShouldShow(true);; setModalInEdit(false) }}>Vložiť hodnotu</Button>
            </Col>
        </Row>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Dátum/Deň</th>
                    <th>Štart suma</th>
                    <th>Príchod</th>
                    <th>Odchod</th>
                    <th>Hodiny</th>
                    <th>Tržba</th>
                    <th>Terminal</th>
                    <th>Výdaj faktúry</th>
                    <th>Konečná suma</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={() => { setShouldShow(true); setModalInEdit(true); }}>
                    <td>19-5-2026 / Po</td>
                    <td>150.00 €</td>
                    <td>06:00</td>
                    <td>14:00</td>
                    <td>8</td>
                    <td>620.50 €</td>
                    <td>185.00 €</td>
                    <td>45.00 €</td>
                    <td>540.50 €</td>
                </tr>
                <tr>
                    <td>20-5-2026 / Ut</td>
                    <td>200.00 €</td>
                    <td>07:00</td>
                    <td>15:30</td>
                    <td>8.5</td>
                    <td>485.20 €</td>
                    <td>120.00 €</td>
                    <td>0.00 €</td>
                    <td>565.20 €</td>
                </tr>
                <tr>
                    <td>21-5-2026 / St</td>
                    <td>180.00 €</td>
                    <td>06:30</td>
                    <td>14:30</td>
                    <td>8</td>
                    <td>730.00 €</td>
                    <td>210.50 €</td>
                    <td>85.00 €</td>
                    <td>614.50 €</td>
                </tr>
                <tr>
                    <td>22-5-2026 / Št</td>
                    <td>160.00 €</td>
                    <td>05:45</td>
                    <td>13:45</td>
                    <td>8</td>
                    <td>390.80 €</td>
                    <td>95.00 €</td>
                    <td>30.00 €</td>
                    <td>425.80 €</td>
                </tr>
                <tr>
                    <td>23-5-2026 / Pi</td>
                    <td>175.00 €</td>
                    <td>06:00</td>
                    <td>15:00</td>
                    <td>9</td>
                    <td>890.30 €</td>
                    <td>275.00 €</td>
                    <td>60.00 €</td>
                    <td>730.30 €</td>
                </tr>
                <tr>
                    <td>24-5-2026 / So</td>
                    <td>200.00 €</td>
                    <td>07:00</td>
                    <td>13:00</td>
                    <td>6</td>
                    <td>1 120.00 €</td>
                    <td>340.00 €</td>
                    <td>0.00 €</td>
                    <td>980.00 €</td>
                </tr>
                <tr>
                    <td>25-5-2026 / Ne</td>
                    <td>190.00 €</td>
                    <td>08:00</td>
                    <td>14:00</td>
                    <td>6</td>
                    <td>950.60 €</td>
                    <td>280.00 €</td>
                    <td>110.00 €</td>
                    <td>750.60 €</td>
                </tr>
            </tbody>
        </Table>
        <ValueModal shouldShow={shouldShow} setShouldShow={setShouldShow} isNew={!modalInEdit} />
    </Container >
}