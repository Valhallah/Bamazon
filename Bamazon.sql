CREATE DATABASE Bamazon_DB;

USE Bamazon_DB;

CREATE TABLE stock_info(
  id INT auto_increment NOT NULL,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  customer_cost INT(20) NOT NULL,
  quantity INT(20)NOT NULL,
  PRIMARY KEY (id)
);


SELECT * FROM stock_info;

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Pens", "Office Supplies", 3.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Paper", "Office Supplies", 6.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Pride and Pejudice by Jane Austen", "Books", 20.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("The Cursed Child by J.K. Rowling", "Books", 21.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Pencils", "Office Supplies", 2.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("The GIver by Lois Lowry", "Books", 13.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Highlighter - yellow", "Office Supplies", 2.00, 20);
INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Sharpie - black", "Office Supplies", 2.00, 20);

INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("The Hobbit by J.R.R Tolkien", "Books", 15.00, 20);
--
INSERT INTO stock_info(product_name, department_name, customer_cost, quantity)
VALUES("Stapler - Swingline", "Office Supplies", 12.00, 20);
--
