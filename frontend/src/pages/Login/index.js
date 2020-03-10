import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({history}) {

    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email: email.toLowerCase() });
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard');
    }

    return (
        <>
            <p>
               Enter your email to start discovering and sharing new spots.
        </p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input type="email" id="email" value={email} placeholder="Your best email" onChange={event => setEmail(event.target.value)} />
                <button type="submit" className="button">ENTER</button>
            </form>
        </>
    );
}