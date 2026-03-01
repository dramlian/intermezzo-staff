'use client';

import { Col, Form, Row } from "react-bootstrap";

export default function MonthSelector({ selectedMonth, onMonthChange }: { selectedMonth: string; onMonthChange: (month: string) => void }) {

    return (
        <Col>
            <Form.Control
                type="month"
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
            />
        </Col>
    );
}