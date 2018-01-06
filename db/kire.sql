SET NAMES UTF8;
DROP DATABASE IF EXISTS kire;
CREATE DATABASE kire CHARSET=UTF8;
USE kire;
/*创建用户表**/
CREATE TABLE k_user(
  uid int primary key auto_increment,/**用户id**/
  uname varchar(32) not null unique,
  upwd varchar(32) not null,
  email varchar(32) not null,
  phone varchar(11) not null
);
INSERT INTO k_user VALUES
(NULL,'dingding','123456','ding@teducn',135011234567),
(NULL,'dangdang','123456','dang@teducn',135011234568),
(NULL,'dindin','123456','dang@teducn',135011234568),
(NULL,'dandan','123456','dang@teducn',135011234568),
(10,'qiangdong','123456','dang@teducn',135011234568),
(20,'naicha','123456','dang@teducn',135011234568);

/****创建商品表**/
CREATE TABLE k_product(
   pid INT primary key auto_increment,/**商品编号**/
   pname VARCHAR(64),                  /**商品名称**/
   price FLOAT(10,2),                  /**商品价格**/
   pic varchar(128),                  /**商品图片**/
   href VARCHAR(128),                  /***商品链接***/
);
INSERT INTO k_product VALUES
(1, 'Apple iPhone X (A1865) 64GB 深空灰色 移动联通电信4G手机', 8388.00, 'img/products/ip8.jpg','product_detail.html?pid=1'),
(2, 'Apple iPhone 6s (A1700) 16G 玫瑰金色 移动联通电信4G手机', 3399.00, 'img/products/ip6s.jpg','product_detail.html?pid=2'),
(3, 'Apple iPhone 6 32GB 金色 移动联通电信4G手机 ', 2299.00, 'img/products/ip6.jpg','product_detail.html?pid=3'),
(4, 'Apple 苹果 iPhone7 手机 亮黑色 全网通 32GB', 4499.00, 'img/products/ip7.jpg','product_detail.html?pid=4'),
(5, 'Apple 苹果SE iPhoneSE 苹果手机联通移动4G手机 深空灰色 16G', 3199.00, 'img/products/ipe.jpg','#'),
(6,'Apple iPhone 6s Plus (A1699) 64G 玫瑰金色 移动联通电信4G手机',6699.00,'img/products/phone_06.jpg','#'),
(7,'vivo X7 全网通 4GB+64GB 移动联通电信4G手机 双卡双待',2499.00,'img/products/phone_07.jpg','#'),
(8,'【六个月碎屏换新】荣耀8 4GB+32GB 全网通版 魅海蓝 双镜头，双2.5D玻璃',3699.00,'img/products/phone_08.jpg','#'),
(9,'荣耀7 (PLK-AL10) 3GB+64GB内存版 荣耀金 移动联通电信4G手机',3399.00,'img/products/phone_09.jpg','#'),
(10,'荣耀7 (PLK-AL10) 3GB+64GB内存版 荣耀金 移动联通电信4G手机',2299.00,'img/products/phone_10.jpg','#'),
(11,'荣耀 畅玩5X 3GB内存版 落日金 移动联通电信4G手机 双卡双待 炫酷指纹',2299.00,'img/products/phone_11.jpg','#'),
(12,'Apple iPhone 6 (A1586) 64GB 金色 移动联通电信4G手机',4499.00,'img/products/phone_12.jpg','#'),
(13,'TCL 初现 750 雅金 移动联通电信4G手机 双卡双待 后置1600万摄像，美姿拍照！',5555.00,'img/products/phone_13.jpg','#'),
(14,'vivo X7Plus 全网通 4GB+64GB 移动联通电信4G手机 双卡双待 金色',2798.00,'img/products/phone_14.jpg','#'),
(15,'华为 畅享5S 金色 移动联通电信4G手机 双卡双待 10万好评手机！',1099.00,'img/products/phone_15.jpg','#'),
(16,'Apple iPhone 6 Plus (A1524) 16GB 银色 移动联通电信4G手机',3899.00,'img/products/phone_16.jpg','#'),
(17,'华为 麦芒5 全网通 4GB+64GB版 香槟金 移动联通电信4G手机 双卡双待',2599.00,'img/products/phone_17.jpg','#'),
(18,'小米5 全网通 标准版 3GB内存 32GB ROM 白色 移动联通电信4G手机',1799.00,'img/products/phone_18.jpg','#'),
(19,'华为 P9 全网通 3GB+32GB版 流光金 移动联通电信4G手机 双卡双待 麒麟955',3188.00,'img/products/phone_19.jpg','#'),
(20,'金立 金钢 标准版 爵士金 移动联通电信4G手机 双卡双待 4G全网通',999.00,'img/products/phone_20.jpg','#'),
(21,'360手机 N4 全网通 4GB+32GB 阳光白 移动联通电信4G手机 双卡双待',999.00,'img/products/phone_21.jpg','#'),
(22,'小米 Max 全网通 标准版 3GB内存 32GB ROM 金色 移动联通电信4G手机',1299.00, 'img/products/phone_22.jpg','#'),
(23,'华为 P9 全网通 4GB+64GB版 金色 移动联通电信4G手机 双卡双待 后置1200万',3688.00, 'img/products/phone_23.jpg','#'),
(24,'乐视（Le）乐2（X620）32GB 原力金 移动联通电信4G手机 双卡双待 5.5英寸',988.00,'img/products/phone_24.jpg','#'),
(25,'努比亚(nubia)【3+64GB】小牛5 Z11mini 黑色 移动联通电信4G手机',1299.00, 'img/products/phone_25.jpg','#'),
(26,'乐视（Le）乐2Pro 32GB 金色 移动联通电信4G手机 双卡双待 5.5英寸In-Cell屏',1399.00,'img/products/phone_26.jpg','#'),
(27,'华为 Mate 8 3GB+32GB版 玫瑰金 移动联通电信4G手机 双卡双待 麒麟950芯片',2799.00, 'img/products/phone_27.jpg','#'),
(28,'小米 4c 标准版 全网通 白色 移动联通电信4G手机 双卡双待 高通骁龙808畅销机',799.00,'img/products/phone_28.jpg','#'),
(29,'vivo X7 全网通 4GB+64GB 移动联通电信4G手机 双卡双待 星空灰 vivox7',2498.00, 'img/products/phone_29.jpg','#'),
(30,'联想 乐檬3 （K32C36）16GB 金色 移动4G手机 双卡双待 刀锋致敬经典',599.00,'img/products/phone_30.jpg','#'),
(31,'华为 荣耀 畅玩4X 晨曦金 移动联通电信4G手机 双卡双待 5.5英寸大屏看片利器',749.00,'img/products/phone_31.jpg','#'),
(32,'三星 Galaxy On5（G5500）金色 移动联通4G手机 真皮质感后盖，2600毫安大容量',699.00,'img/products/phone_32.jpg','#'),
(33,'OPPO A37 2GB+16GB内存版 玫瑰金 全网通4G手机 双卡双待 【赠品任你选】',1299.00,'img/products/phone_33.jpg','#');

/**手机图片表*/
CREATE TABLE k_pic(
  kid INT PRIMARY KEY AUTO_INCREMENT,
  k_id INT,             #家居商品编号
  sm VARCHAR(128),            #小图片路径
  md VARCHAR(128),            #中图片路径
  lg VARCHAR(128)             #大图片路径
);
INSERT INTO k_pic VALUES
(1, 1, 'img/products/ip8_s1.jpg', 'img/products/ip8_s1_m.jpg', 'img/products/ip8_s1_l.jpg'),
(2, 1, 'img/products/ip8_s2.jpg', 'img/products/ip8_s2_m.jpg', 'img/products/ip8_s2_l.jpg'),
(3, 1, 'img/products/ip8_s3.jpg', 'img/products/ip8_s3_m.jpg', 'img/products/ip8_s3_l.jpg'),
(4, 1, 'img/products/ip8_s4.jpg', 'img/products/ip8_s4_m.jpg', 'img/products/ip8_s4_l.jpg'),
(5, 1, 'img/products/ip8_s5.jpg', 'img/products/ip8_s5_m.jpg', 'img/products/ip8_s5_l.jpg'),
(6, 1, 'img/products/ip8_s6.jpg', 'img/products/ip8_s6_m.jpg', 'img/products/ip8_s6_l.jpg'),
(7, 1, 'img/products/ip8_s7.jpg', 'img/products/ip8_s7_m.jpg', 'img/products/ip8_s7_l.jpg'),
(8, 1, 'img/products/ip8_s8.jpg', 'img/products/ip8_s8_m.jpg', 'img/products/ip8_s8_l.jpg'),
(9, 2, 'img/products/ip6s_s1.jpg', 'img/products/ip6s_s1_m.jpg', 'img/products/ip6s_s1_l.jpg'),
(10, 2, 'img/products/ip6s_s2.jpg', 'img/products/ip6s_s2_m.jpg', 'img/products/ip6s_s2_l.jpg'),
(11, 2, 'img/products/ip6s_s3.jpg', 'img/products/ip6s_s3_m.jpg', 'img/products/ip6s_s3_l.jpg'),
(12, 2, 'img/products/ip6s_s4.jpg', 'img/products/ip6s_s4_m.jpg', 'img/products/ip6s_s4_l.jpg'),
(13, 2, 'img/products/ip6s_s5.jpg', 'img/products/ip6s_s5_m.jpg', 'img/products/ip6s_s5_l.jpg'),
(14, 2, 'img/products/ip6s_s6.jpg', 'img/products/ip6s_s6_m.jpg', 'img/products/ip6s_s6_l.jpg'),
(15, 2, 'img/products/ip6s_s7.jpg', 'img/products/ip6s_s7_m.jpg', 'img/products/ip6s_s7_l.jpg'),
(16, 2, 'img/products/ip6s_s8.jpg', 'img/products/ip6s_s8_m.jpg', 'img/products/ip6s_s8_l.jpg'),
(17, 3, 'img/products/ip6_s1.jpg', 'img/products/ip6_s1_m.jpg', 'img/products/ip6_s1_l.jpg'),
(18, 3, 'img/products/ip6_s2.jpg', 'img/products/ip6_s2_m.jpg', 'img/products/ip6_s2_l.jpg'),
(19, 3, 'img/products/ip6_s3.jpg', 'img/products/ip6_s3_m.jpg', 'img/products/ip6_s3_l.jpg'),
(20, 3, 'img/products/ip6_s4.jpg', 'img/products/ip6_s4_m.jpg', 'img/products/ip6_s4_l.jpg'),
(21, 3, 'img/products/ip6_s5.jpg', 'img/products/ip6_s5_m.jpg', 'img/products/ip6_s5_l.jpg'),
(22, 3, 'img/products/ip6_s6.jpg', 'img/products/ip6_s6_m.jpg', 'img/products/ip6_s6_l.jpg'),
(23, 3, 'img/products/ip6_s7.jpg', 'img/products/ip6_s7_m.jpg', 'img/products/ip6_s7_l.jpg'),
(24, 3, 'img/products/ip6_s8.jpg', 'img/products/ip6_s8_m.jpg', 'img/products/ip6_s8_l.jpg'),
(25, 4, 'img/products/ip7_s1.jpg', 'img/products/ip7_s1_m.jpg', 'img/products/ip7_s1_l.jpg'),
(26, 4, 'img/products/ip7_s2.jpg', 'img/products/ip7_s2_m.jpg', 'img/products/ip7_s2_l.jpg'),
(27, 4, 'img/products/ip7_s3.jpg', 'img/products/ip7_s3_m.jpg', 'img/products/ip7_s3_l.jpg'),
(28, 4, 'img/products/ip7_s4.jpg', 'img/products/ip7_s4_m.jpg', 'img/products/ip7_s4_l.jpg'),
(29, 4, 'img/products/ip7_s5.jpg', 'img/products/ip7_s5_m.jpg', 'img/products/ip7_s5_l.jpg'),
(30, 4, 'img/products/ip7_s6.jpg', 'img/products/ip7_s6_m.jpg', 'img/products/ip7_s6_l.jpg'),
(31, 4, 'img/products/ip7_s7.jpg', 'img/products/ip7_s7_m.jpg', 'img/products/ip7_s7_l.jpg'),
(32, 4, 'img/products/ip7_s8.jpg', 'img/products/ip7_s8_m.jpg', 'img/products/ip7_s8_l.jpg');


/**用户购物车表***/
CREATE TABLE k_cart(
 cid INT PRIMARY KEY AUTO_INCREMENT,/**购物车编号***/
 userId INT                          /****用户id****/
);
INSERT INTO k_cart VALUES(101,10);

/***购物车详情表***/
CREATE TABLE k_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,  /**商品编号**/
  cartId INT,                            /**购物车编号***/
  productId INT,                         /**产品编号**/
  count INT                             /**购买数量**/
);
INSERT INTO k_cart_detail VALUES
(1,101,15,3),
(2,101,18,1),
(3,101,21,2);

/**用户订单信息表**/
CREATE TABLE k_order(
  oid INT PRIMARY KEY AUTO_INCREMENT,  /**订单编号**/
  rcvName VARCHAR(32),                  /***接收人姓名***/
  addr VARCHAR(128),                    /***地址***/
  price FLOAT(10,2),                    /***价格***/
  payment INT,                          /***付款方式1在线支付/2微信支付/3支付宝支付/4银卡支付***/
  orderTime BIGINT,                     /**下单时间***/
  status INT,                            /***订单状态1/2/3/4/5**/
  userId INT                             /****要好****/
);

INSERT INTO k_order VALUES
(NULL,'要好1','佛山市桂城区','3000.00','1','201711210202','3','1'),
(NULL,'要好2','佛山市桂城区','3500.00','2','201712210202','4','1'),
(NULL,'要好3','佛山市桂城区','3580.00','3','201713210202','5','1'),
(NULL,'要好4','佛山市桂城区','3050.00','4','201714210202','6','1'),
(NULL,'要好5','佛山市桂城区','3090.00','1','201715210202','7','1');


/**订单详情表**/
CREATE TABLE k_order_detail(
 did INT PRIMARY KEY AUTO_INCREMENT,    /***详情编号**/
 orderId INT,                            /******订单编号****/
 productId INT,                           /******产品编号****/
 count INT                               /****购买数量****/
);
INSERT INTO k_order_detail VALUES
(NULL,1,10,1),
(NULL,1,10,1),
(NULL,2,16,1),
(NULL,2,15,5),
(NULL,3,12,3),
(NULL,3,18,4),
(NULL,4,1,5),
(NULL,4,8,6),
(NULL,4,9,5),
(NULL,5,22,4),
(NULL,5,26,6);

/**创建抽奖表***/
CREATE TABLE k_lottery(
  lid INT PRIMARY KEY AUTO_INCREMENT, /***抽奖编号**/
  userId INT,                          /**用户id**/
  lotteryTime BIGINT,                     /**抽奖时间**/
  grade INT                              /***抽奖等级***/
);

INSERT INTO k_lottery VALUES
(NULL,1,1501234567890,2),
(NULL,1,1502234567890,2),
(NULL,1,1503234567890,2),
(NULL,1,1504234567890,2);
