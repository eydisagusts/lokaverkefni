'use client';
import type React from 'react';
import { useState } from 'react';

const ReservationPage: React.FC = () => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ date, time, quantity, name, email, phone });
    };

    return (
        <div className='flex flex-col items-center justify-center mx-auto mt-10 text-black'>
            <h1 className='text-2xl'>Reservation Details</h1>
            <form onSubmit={handleSubmit}>
                <div className='mt-4 text-lg'>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-4 text-xl'>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-4 text-xl'>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>
                <div className='mt-4 text-xl'>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-4 text-xl'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='mt-4 text-xl'>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button 
                type="submit"
                className='mt-4 p-4 rounded-full bg-[#C16757] text-white shadow-md hover:bg-[#A34A3F]'
                >
                    Submit Reservation
                    </button>
            </form>
        </div>
    );
};

export default ReservationPage;