"use client";
import React from "react";
import { useParams } from "next/navigation";
import PickDishScreen from "../components/pickdish/PickDishScreen";
import PickDrinkScreen from "../components/pickdrink/PickDrinkScreen";
import OrderScreen from "../components/orderscreen/OrderScreen";
import ReceiptScreen from "../components/receiptscreen/ReceiptScreen";

const DynamicPage = () => {
  const params = useParams();
  const { slug } = params;

  return (
    <div>
      {slug === "pickdish" && <PickDishScreen />}
      {slug === "pickdrink" && <PickDrinkScreen />}
      {slug === "orderscreen" && <OrderScreen />}
      {slug === "receiptscreen" && <ReceiptScreen />}
    </div>
  );
};

export default DynamicPage;
