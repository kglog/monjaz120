// src/lib/orders.ts

type Order = {
  id: number;
  serviceId: number;
  serviceTitle: string;
  buyerName: string;
  price: number;
  status: "جديد" | "جاري" | "تم" | "مرفوض";
};

let orders: Order[] = [];

export function createOrder(service: Order) {
  orders.push(service);
}

export function getOrders() {
  return orders;
}
