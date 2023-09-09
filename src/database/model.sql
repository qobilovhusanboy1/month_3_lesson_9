-- DATABASE CREATE
CREATE DATABASE h1;


CREATE TABLE users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_firstname VARCHAR(32),
    user_lastname VARCHAR(32),
    user_username VARCHAR(64),
    user_password TEXT,
    balance FLOAT DEFAULT 100000
);

CREATE TABLE promo_codes(
    promo_code_id SERIAL NOT NULL PRIMARY KEY,
    promo_code_user_id INT,
    promo_code_discountprice INT,
    promo_code text,
    promo_code_expire_date text,
    FOREIGN KEY (promo_code_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE products(
    product_id SERIAL NOT NULL PRIMARY KEY,
    product_name VARCHAR(32),
    product_price FLOAT,
    product_kg INT,
    product_active BOOLEAN DEFAULT true
);

CREATE TABLE user_purchase(
    purchase_id SERIAL NOT NULL,
    purchase_user_id INT,
    purchase_product_id INT,
    purchase_kg INT,
    purchase_promo_code TEXT,
    FOREIGN KEY (purchase_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (purchase_product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE history(
    history_id SERIAL NOT NULL,
    history_user_id INT,
    history_product_id INT,
    history_promo_code_id INT DEFAULT 0,
    created_att TIMESTAMP NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (history_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (history_product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (history_promo_code_id) REFERENCES promo_codes(promo_code_id) ON DELETE CASCADE
);