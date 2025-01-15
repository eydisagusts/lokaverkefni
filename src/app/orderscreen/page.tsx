'use client';
import React, { useState } from "react";

const OrderScreen = () => {
    const [dishOrder, setDishOrder] = useState<Dish[]>([
    ]);

    const handleConfirmOrder = () => {
        window.location.href = ('/receiptscreen')
    };

    const HandleGoBack = () => {
        window.location.href = ('/menu/pickdrink')
    };

    const total = dishOrder.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="container mx-auto p-4 text-black mt-10">
            <div className="absolute left-2 top-44">
                <button
                type="button"
                onClick={HandleGoBack}
                className="underline text-black hover:text-gray-500"
                >
                    Go Back
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-4">Your Order</h1>
            <ul className="mb-4">
                {dishOrder.map((item) => (
                    <li key={item.id} className="flex justify-between border-b py-2">
                        <span>{item.name}</span>
                        <span>${item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mb-4 ">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
            <div className="absolute right-32">
            <button
                type="button"
                onClick={handleConfirmOrder}
                className="p-2 px-10 text-lg mt-4 rounded-full bg-[#C16757] shadow-md ml-96 hover:bg-[#A34A3F] text-white"
            >
                Confirm Order
            </button>
            </div>
        </div>
    );
};

export default OrderScreen;