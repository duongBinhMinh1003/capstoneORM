CREATE DATABASE db_users;
USE db_users;

CREATE TABLE binh_luan (
    binh_luan_id INT AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_binh_luan TIMESTAMP,
    noi_dung VARCHAR(100),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id)
);
INSERT INTO binh_luan (nguoi_dung_id, hinh_id, ngay_binh_luan, noi_dung)
VALUES
    (1, 1, NOW(), 'Great picture!'),
    (2, 1, NOW(), 'Nice shot!'),
    (3, 2, NOW(), 'Beautiful scenery.'),
    (1, 2, NOW(), 'I love this place.'),
    (2, 3, NOW(), 'Amazing capture!'),
    (3, 3, NOW(), 'Fantastic view.'),
    (1, 4, NOW(), 'Incredible photo.'),
    (2, 4, NOW(), 'Stunning!'),
    (3, 5, NOW(), 'Wonderful shot.'),
    (1, 5, NOW(), 'Impressive!');


CREATE TABLE nguoi_dung (
    nguoi_dung_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(25),
    mat_khau VARCHAR(25),
    ho_ten VARCHAR(25),
    tuoi INT,
    anh_dai_dien VARCHAR(150)
);
INSERT INTO nguoi_dung (email, mat_khau, ho_ten, tuoi, anh_dai_dien)
VALUES
    ('user1@example.com', 'password1', 'User One', 30, 'avatar1.jpg'),
    ('user2@example.com', 'password2', 'User Two', 25, 'avatar2.jpg'),
    ('user3@example.com', 'password3', 'User Three', 35, 'avatar3.jpg'),
    ('user4@example.com', 'password4', 'User Four', 28, 'avatar4.jpg'),
    ('user5@example.com', 'password5', 'User Five', 32, 'avatar5.jpg'),
    ('user6@example.com', 'password6', 'User Six', 27, 'avatar6.jpg'),
    ('user7@example.com', 'password7', 'User Seven', 29, 'avatar7.jpg'),
    ('user8@example.com', 'password8', 'User Eight', 31, 'avatar8.jpg'),
    ('user9@example.com', 'password9', 'User Nine', 26, 'avatar9.jpg'),
    ('user10@example.com', 'password10', 'User Ten', 33, 'avatar10.jpg');

CREATE TABLE hinh_anh (
    hinh_id INT AUTO_INCREMENT PRIMARY KEY,
    ten_hinh VARCHAR(150),
    duong_dan VARCHAR(150),
    mo_ta VARCHAR(100),
    nguoi_dung_id INT,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id)
);
INSERT INTO hinh_anh (ten_hinh, duong_dan, mo_ta, nguoi_dung_id)
VALUES
    ('Image 1', '/images/image1.jpg', 'Description for Image 1', 1),
    ('Image 2', '/images/image2.jpg', 'Description for Image 2', 2),
    ('Image 3', '/images/image3.jpg', 'Description for Image 3', 3),
    ('Image 4', '/images/image4.jpg', 'Description for Image 4', 4),
    ('Image 5', '/images/image5.jpg', 'Description for Image 5', 5),
    ('Image 6', '/images/image6.jpg', 'Description for Image 6', 6),
    ('Image 7', '/images/image7.jpg', 'Description for Image 7', 7),
    ('Image 8', '/images/image8.jpg', 'Description for Image 8', 8),
    ('Image 9', '/images/image9.jpg', 'Description for Image 9', 9),
    ('Image 10', '/images/image10.jpg', 'Description for Image 10', 10);

CREATE TABLE luu_anh (
    nguoi_dung_id INT,
    hinh_id INT,
    ngay_luu TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(nguoi_dung_id),
    FOREIGN KEY (hinh_id) REFERENCES hinh_anh(hinh_id),
    PRIMARY KEY (nguoi_dung_id, hinh_id)
);
INSERT INTO luu_anh (nguoi_dung_id, hinh_id, ngay_luu)
VALUES
    (1, 1, NOW()),
    (2, 2, NOW()),
    (3, 3, NOW()),
    (4, 4, NOW()),
    (5, 5, NOW()),
    (6, 6, NOW()),
    (7, 7, NOW()),
    (8, 8, NOW()),
    (9, 9, NOW()),
    (10, 10, NOW());

