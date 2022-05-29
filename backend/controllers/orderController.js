import catchAsync from "express-async-handler";
import Order from "../models/orderModel.js";

const addOrderItems = catchAsync(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      error: "No order items",
    });
  } else {
    //console.log("OrderUSer   ", req.user._id);
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    console.log("createdOrder   ", order._id);

    const createdOrder = await order.save();

    res.status(201).json({
      data: createdOrder,
    });
  }
});

const agetOrderIById = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404).json("Order not found");
  }
});

const updateOrderToPaid = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json("Order not found");
  }
});

const updateOrderToDelivered = catchAsync(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDeliveredAt = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    console.log("ORDER_ID ", updatedOrder);
    res.json(updatedOrder);
  } else {
    res.status(404).json("Order not found");
  }
});

const getMyOrders = catchAsync(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});

const getOrders = catchAsync(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
});

export {
  addOrderItems,
  agetOrderIById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
};
