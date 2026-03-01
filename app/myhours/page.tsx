'use client'
import Table from 'react-bootstrap/Table'
import { Container } from 'react-bootstrap'
import MonthSelector from "../components/monthselector/MonthSelector"

export default function MyHours() {
    return (
        <Container className='mt-3'>
            <MonthSelector selectedMonth={"2026-03"} onMonthChange={() => { }} />
            <Table striped bordered hover className='mt-3'>
                <thead>
                    <tr>
                        <th>Deň</th>
                        <th>Počet hodín</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>23-5-2026</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>23-5-2026</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>23-5-2026</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>23-5-2026</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}