"use client";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";


export default function Header() {
    return <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <Navbar.Brand href="/">Intermezzo staff</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} href="/myinputs">Moje vklady</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
}