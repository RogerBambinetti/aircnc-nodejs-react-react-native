import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import './styles.css';
import Camera from '../../assets/camera.svg';

export default function New({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);
        await api.post('/spots', data, { headers: { user_id } });
        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className={thumbnail ? 'has-thumbnail' : ''} id="thumbnail" style={{ backgroundImage: `url('${preview}')` }} onChange={event => setThumbnail(event.target.files[0])}>
                <input type="file" />
                <img src={Camera} alt="" />
            </label>
            <label htmlFor="company">COMPANY</label>
            <input id="company" type="text" placeholder="Your amazing company" value={company} onChange={event => setCompany(event.target.value)} />
            <label htmlFor="techs">TECHS</label>
            <input id="techs" type="text" placeholder="Thecnologies you use" value={techs} onChange={event => setTechs(event.target.value)} />
            <label htmlFor="price">PRICE</label>
            <input id="price" type="text" placeholder="Price per day" value={price} onChange={event => setPrice(event.target.value)} />
            <button className="button">SUBMIT</button>
        </form>
    );
}