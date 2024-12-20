const conn = require("../mariadb");
const { StatusCodes } = require("http-status-codes");

const order = async (req, res) => {
  const { items, delivery, totalQuantity, totalPrice, userId, firstBookTitle } =
    req.body;

  let delivery_id = 3;
  let order_id = 1;

  try {
    // 1 단계
    const sql = `INSERT INTO delivery 
        (address, receiver, contact) VALUES
        (?, ?, ?)`;
    const values = [delivery.address, delivery.receiver, delivery.contact];
    const [results1] = await conn.execute(sql, values);
    delivery_id = results1.insertId;

    // 2 단계
    const sql2 = `INSERT INTO orders
          (book_title, total_quantity, total_price, user_id, delivery_id) VALUES
          (?, ?, ?, ?, ?)`;
    const values2 = [
      firstBookTitle,
      totalQuantity,
      totalPrice,
      userId,
      delivery_id,
    ];
    const [results2] = await conn.execute(sql2, values2);

    order_id = results2.insertId;

    // item Id값 가져오는 sql
    const orderItemsSql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;
    const [orderItems] = await conn.query(orderItemsSql, [items]);

    // 3 단계
    const sql3 = `INSERT INTO orderedBook
        (order_id, book_id, quantity) VALUES ?`;
    const values3 = [];

    orderItems.forEach((item) => {
      values3.push([order_id, item.book_id, item.quantity]);
    });

    const result3 = await conn.query(sql3, [values3]);

    await deleteCartItems(orderItems);
    return res.status(StatusCodes.CREATED).json(result3[0]);
  } catch (error) {
    console.log("err : ", error);

    return res.status(StatusCodes.BAD_REQUEST).end();
  }
};
const getOrders = async (req, res) => {
  const sql = `
        SELECT orders.id, created_at, address, receiver,
        book_title, total_quantity, total_price,
        address, receiver, contact
        FROM orders LEFT JOIN delivery
        ON orders.delivery_id = delivery.id`;
  const [rows, fields] = await conn.execute(sql);

  return res.status(StatusCodes.OK).json({ rows });
};
const getOrderDetail = async (req, res) => {
  const { id } = req.params;
  const sql = `
        SELECT book_id, title, author, price, quantity
        FROM orderedBook LEFT JOIN books
        ON orderedBook.book_id = books.id
        WHERE order_id=?`;

  const [rows] = await conn.query(sql, id);

  return res.status(StatusCodes.OK).json(rows);
};

const deleteCartItems = async (deleteId) => {
  const sql = `DELETE FROM cartItems WHERE id IN (?)`;
  const result = await conn.query(sql, [deleteId]);
  return result;
};

module.exports = {
  order,
  getOrders,
  getOrderDetail,
};
