import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Failure when registering a new incident.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo image not found"/>
                    <h1>Register new case</h1>
                    <p>Provide a complete description of the incident</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Return to home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Title"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                        placeholder="Description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                    <input 
                        placeholder="Value (US$)"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                    
                    <button className="button" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}