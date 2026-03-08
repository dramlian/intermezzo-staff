'use client'

import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Container } from 'react-bootstrap'
import styles from './Timetable.module.css'

const DUMMY_EVENTS = [
    { title: 'Ráno - Jana', start: '2026-03-10T07:00:00', end: '2026-03-10T14:00:00', color: '#2d6a4f' },
    { title: 'Popoludní - Peter', start: '2026-03-10T14:00:00', end: '2026-03-10T22:00:00', color: '#4a3a6b' },
    { title: 'Ráno - Mária', start: '2026-03-11T07:00:00', end: '2026-03-11T14:00:00', color: '#2d6a4f' },
    { title: 'Popoludní - Jana', start: '2026-03-11T14:00:00', end: '2026-03-11T22:00:00', color: '#6b3a2d' },
    { title: 'Ráno - Peter', start: '2026-03-12T07:00:00', end: '2026-03-12T14:00:00', color: '#4a3a6b' },
    { title: 'Popoludní - Mária', start: '2026-03-12T14:00:00', end: '2026-03-12T22:00:00', color: '#2d6a4f' },
    { title: 'Celý deň - Jana', start: '2026-03-13T07:00:00', end: '2026-03-13T22:00:00', color: '#6b3a2d' },
    { title: 'Ráno - Mária', start: '2026-03-14T07:00:00', end: '2026-03-14T14:00:00', color: '#2d6a4f' },
    { title: 'Popoludní - Peter', start: '2026-03-14T14:00:00', end: '2026-03-14T22:00:00', color: '#4a3a6b' },
]

export default function TimetablePage() {
    return (
        <Container className={`mt-3 ${styles.calendar}`}>
            <FullCalendar
                plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                locale="sk"
                slotMinTime="06:00:00"
                slotMaxTime="23:00:00"
                allDaySlot={false}
                events={DUMMY_EVENTS}
                height="auto"
                nowIndicator
                buttonText={{
                    today: 'Dnes',
                    month: 'Mesiac',
                    week: 'Týždeň',
                    day: 'Deň',
                }}
            />
        </Container>
    )
}
