import { createContext, useContext, useState, useEffect } from "react";

export type Dish = {
  id: string;

  name: string;

  description: string;

  imageSource: string;

  ingredients: string[];

  category: string;

  price: number;
};

type Drink = {
  id: string;

  name: string;

  description: string;

  imageSource: string;

  category: string;

  ingredients: string[];

  price: number;
};

export type OrderItem = {
  dish?: Dish;
  drink?: Drink;
  quantity: number;
};

type OrderContextType = {
  dishOrderList: OrderItem[];
  drinkOrderList: OrderItem[];
  addDishToOrder: (dish: Dish) => void;
  addDrinkToOrder: (drink: Drink) => void;
  removeDishFromOrder: (id: string) => void;
  removeDrinkFromOrder: (id: string) => void;
  clearOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dishOrderList, setDishOrderList] = useState<OrderItem[]>(() => {
    const savedDishes = localStorage.getItem("dishOrderList");
    return savedDishes ? JSON.parse(savedDishes) : [];
  });

  const [drinkOrderList, setDrinkOrderList] = useState<OrderItem[]>(() => {
    const savedDrinks = localStorage.getItem("drinkOrderList");
    return savedDrinks ? JSON.parse(savedDrinks) : [];
  });

  useEffect(() => {
    localStorage.setItem("dishOrderList", JSON.stringify(dishOrderList));
  }, [dishOrderList]);

  useEffect(() => {
    localStorage.setItem("drinkOrderList", JSON.stringify(drinkOrderList));
  }, [drinkOrderList]);

  const addDishToOrder = (dish: Dish) => {
    setDishOrderList((prev) => {
      const existingItem = prev.find((item) => item.dish?.id === dish.id);
      if (existingItem) {
        return prev.map((item) =>
          item.dish?.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { dish, quantity: 1 }];
    });
  };

  const addDrinkToOrder = (drink: Drink) => {
    setDrinkOrderList((prev) => {
      const existingItem = prev.find((item) => item.drink?.id === drink.id);
      if (existingItem) {
        return prev.map((item) =>
          item.drink?.id === drink.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { drink, quantity: 1 }];
    });
  };

  const removeDishFromOrder = (id: string) => {
    setDishOrderList((prev) =>
      prev
        .map((item) =>
          item.dish?.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeDrinkFromOrder = (id: string) => {
    setDrinkOrderList((prev) =>
      prev
        .map((item) =>
          item.drink?.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearOrder = () => {
    setDishOrderList([]);
    setDrinkOrderList([]);
    localStorage.removeItem("dishOrderList");
    localStorage.removeItem("drinkOrderList");
  };

  return (
    <OrderContext.Provider
      value={{
        dishOrderList,
        drinkOrderList,
        addDishToOrder,
        addDrinkToOrder,
        removeDishFromOrder,
        removeDrinkFromOrder,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
