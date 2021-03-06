import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from '../../services/api'

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem("ongId", id);
            localStorage.setItem("ongName", response.data.name);

            history.push('/profile');
        } catch(err){
            alert('Login failed, please try again.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Logo image not found" />

                <form onSubmit={handleLogin}>
                    <h1>Sign in</h1>
                    <input
                        placeholder="Your ID"
                        value={id}
                        onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Enter</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Create an account
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes image not found" />

        </div>
    )
}