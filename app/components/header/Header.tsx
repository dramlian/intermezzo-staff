"use client";

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Link from "next/link";
import styles from "./Header.module.css";
import { useSession, signOut } from "next-auth/react";


export default function Header({ isAdmin }: { isAdmin: boolean }) {
    const { data: session } = useSession();

    return <Navbar data-bs-theme="dark" className={styles.navbarGradient}>
        <Container>
            <Navbar.Brand href="/" style={{ fontFamily: 'var(--font-caveat)', fontSize: '1.5rem' }}>Intermezzo staff</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} href="/wallet">Peňaženka</Nav.Link>
                <Nav.Link as={Link} href="/myinputs">Moje vklady</Nav.Link>
            </Nav>
            {session?.user && (
                <div className="d-flex align-items-center gap-2">
                    <span className="text-light" style={{ fontSize: "0.9rem" }}>
                        {session.user.name ?? session.user.email}
                    </span>
                    {isAdmin && (
                        <span className="badge bg-primary text-dark" style={{ fontSize: "0.75rem" }}>Admin</span>
                    )}
                    <Button variant="outline-light" size="sm" onClick={() => signOut()}>
                        Odhlásiť
                    </Button>
                </div>
            )}
        </Container>
    </Navbar>;
}
