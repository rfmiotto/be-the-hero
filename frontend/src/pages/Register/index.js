import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event) {
        event.preventDefault(); // Do not refresh page after form submission

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Your access ID: ${response.data.id}`)
            history.push('/');
        } catch(err) {
            alert('Error - Registry not completed, please try again.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo image not found"/>
                    <h1>Register</h1>
                    <p>Join our community and support a NGO</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Return
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="NGO name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <input
                        placeholder="Phone number"
                        value={whatsapp}
                        onChange={event => setWhatsapp(event.target.value)}
                    />
                    <div className="input-group">
                        <input
                        placeholder="City"
                        value={city}
                        onChange={event => setCity(event.target.value)}
                        />
                        <input
                        placeholder="State"
                        style={{ width: 100 }}
                        value={uf}
                        onChange={event => setUf(event.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}