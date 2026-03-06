"use client";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import styles from "./Header.module.css";


export default function Header() {
    return <Navbar data-bs-theme="dark" className={styles.navbarGradient}>
        <Container>
            <Navbar.Brand href="/" style={{ fontFamily: 'var(--font-caveat)', fontSize: '1.5rem' }}>Intermezzo staff</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} href="/wallet">Peňaženka</Nav.Link>
                <Nav.Link as={Link} href="/myinputs">Moje vklady</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
}