export const orders = [
  {
    id: "ORD-1001",
    userId: 1,
    customerName: "Demo Customer",
    date: "2026-08-10",
    status: "Delivered",
    total: 164.98,
    items: [
      { productId: 1, quantity: 1, price: 89.99 },
      { productId: 4, quantity: 1, price: 29.99 },
      { productId: 15, quantity: 1, price: 44.99 }
    ]
  },
  {
    id: "ORD-1002",
    userId: 1,
    customerName: "Demo Customer",
    date: "2026-08-14",
    status: "Processing",
    total: 599.99,
    items: [
      { productId: 5, quantity: 1, price: 599.99 }
    ]
  },
  {
    id: "ORD-1003",
    userId: 1,
    customerName: "Demo Customer",
    date: "2026-08-17",
    status: "Shipped",
    total: 124.98,
    items: [
      { productId: 2, quantity: 1, price: 74.99 },
      { productId: 3, quantity: 1, price: 49.99 }
    ]
  },
  {
    id: "ORD-1004",
    userId: 2,
    customerName: "Admin User",
    date: "2026-08-19",
    status: "Pending",
    total: 449.99,
    items: [
      { productId: 7, quantity: 1, price: 449.99 }
    ]
  },
  {
    id: "ORD-1005",
    userId: 1,
    customerName: "Demo Customer",
    date: "2026-08-21",
    status: "Cancelled",
    total: 69.99,
    items: [
      { productId: 17, quantity: 1, price: 69.99 }
    ]
  }
];
