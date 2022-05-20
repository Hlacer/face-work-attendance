/*
 Navicat Premium Data Transfer

 Source Server         : 本地mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : frap

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 23/04/2022 19:25:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `department` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '无', 'admin');
INSERT INTO `admin` VALUES (9, '111', '698d51a19d8a121ce581499d7b701668', '人事部', '普通管理员');

-- ----------------------------
-- Table structure for attendance_time
-- ----------------------------
DROP TABLE IF EXISTS `attendance_time`;
CREATE TABLE `attendance_time`  (
  `time_id` int NOT NULL AUTO_INCREMENT,
  `attendance_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `out_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attendance_place` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attendance_coordinate` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`time_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of attendance_time
-- ----------------------------
INSERT INTO `attendance_time` VALUES (6, '08:30', '18:30', '大连东软信息学院软件园校区', '121.535749,38.892795');

-- ----------------------------
-- Table structure for auth_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_group`;
CREATE TABLE `auth_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_group
-- ----------------------------

-- ----------------------------
-- Table structure for auth_group_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_group_permissions`;
CREATE TABLE `auth_group_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`) USING BTREE,
  INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_group_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for auth_permission
-- ----------------------------
DROP TABLE IF EXISTS `auth_permission`;
CREATE TABLE `auth_permission`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`) USING BTREE,
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_permission
-- ----------------------------
INSERT INTO `auth_permission` VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO `auth_permission` VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO `auth_permission` VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO `auth_permission` VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO `auth_permission` VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO `auth_permission` VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO `auth_permission` VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO `auth_permission` VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO `auth_permission` VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO `auth_permission` VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO `auth_permission` VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO `auth_permission` VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO `auth_permission` VALUES (13, 'Can add user', 4, 'add_user');
INSERT INTO `auth_permission` VALUES (14, 'Can change user', 4, 'change_user');
INSERT INTO `auth_permission` VALUES (15, 'Can delete user', 4, 'delete_user');
INSERT INTO `auth_permission` VALUES (16, 'Can view user', 4, 'view_user');
INSERT INTO `auth_permission` VALUES (17, 'Can add content type', 5, 'add_contenttype');
INSERT INTO `auth_permission` VALUES (18, 'Can change content type', 5, 'change_contenttype');
INSERT INTO `auth_permission` VALUES (19, 'Can delete content type', 5, 'delete_contenttype');
INSERT INTO `auth_permission` VALUES (20, 'Can view content type', 5, 'view_contenttype');
INSERT INTO `auth_permission` VALUES (21, 'Can add session', 6, 'add_session');
INSERT INTO `auth_permission` VALUES (22, 'Can change session', 6, 'change_session');
INSERT INTO `auth_permission` VALUES (23, 'Can delete session', 6, 'delete_session');
INSERT INTO `auth_permission` VALUES (24, 'Can view session', 6, 'view_session');
INSERT INTO `auth_permission` VALUES (25, 'Can add user info', 7, 'add_userinfo');
INSERT INTO `auth_permission` VALUES (26, 'Can change user info', 7, 'change_userinfo');
INSERT INTO `auth_permission` VALUES (27, 'Can delete user info', 7, 'delete_userinfo');
INSERT INTO `auth_permission` VALUES (28, 'Can view user info', 7, 'view_userinfo');
INSERT INTO `auth_permission` VALUES (29, 'Can add user face', 8, 'add_userface');
INSERT INTO `auth_permission` VALUES (30, 'Can change user face', 8, 'change_userface');
INSERT INTO `auth_permission` VALUES (31, 'Can delete user face', 8, 'delete_userface');
INSERT INTO `auth_permission` VALUES (32, 'Can view user face', 8, 'view_userface');
INSERT INTO `auth_permission` VALUES (33, 'Can add admin', 9, 'add_admin');
INSERT INTO `auth_permission` VALUES (34, 'Can change admin', 9, 'change_admin');
INSERT INTO `auth_permission` VALUES (35, 'Can delete admin', 9, 'delete_admin');
INSERT INTO `auth_permission` VALUES (36, 'Can view admin', 9, 'view_admin');
INSERT INTO `auth_permission` VALUES (37, 'Can add attendance time', 10, 'add_attendancetime');
INSERT INTO `auth_permission` VALUES (38, 'Can change attendance time', 10, 'change_attendancetime');
INSERT INTO `auth_permission` VALUES (39, 'Can delete attendance time', 10, 'delete_attendancetime');
INSERT INTO `auth_permission` VALUES (40, 'Can view attendance time', 10, 'view_attendancetime');
INSERT INTO `auth_permission` VALUES (41, 'Can add user attendance', 11, 'add_userattendance');
INSERT INTO `auth_permission` VALUES (42, 'Can change user attendance', 11, 'change_userattendance');
INSERT INTO `auth_permission` VALUES (43, 'Can delete user attendance', 11, 'delete_userattendance');
INSERT INTO `auth_permission` VALUES (44, 'Can view user attendance', 11, 'view_userattendance');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_login` datetime(6) NULL DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `first_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(254) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_user
-- ----------------------------

-- ----------------------------
-- Table structure for auth_user_groups
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_groups`;
CREATE TABLE `auth_user_groups`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq`(`user_id`, `group_id`) USING BTREE,
  INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id`(`group_id`) USING BTREE,
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_user_groups
-- ----------------------------

-- ----------------------------
-- Table structure for auth_user_user_permissions
-- ----------------------------
DROP TABLE IF EXISTS `auth_user_user_permissions`;
CREATE TABLE `auth_user_user_permissions`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq`(`user_id`, `permission_id`) USING BTREE,
  INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`(`permission_id`) USING BTREE,
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_user_user_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for django_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `django_admin_log`;
CREATE TABLE `django_admin_log`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `object_repr` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `content_type_id` int NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id`) USING BTREE,
  INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for django_content_type
-- ----------------------------
DROP TABLE IF EXISTS `django_content_type`;
CREATE TABLE `django_content_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_content_type
-- ----------------------------
INSERT INTO `django_content_type` VALUES (1, 'admin', 'logentry');
INSERT INTO `django_content_type` VALUES (9, 'adminuser', 'admin');
INSERT INTO `django_content_type` VALUES (10, 'attendance', 'attendancetime');
INSERT INTO `django_content_type` VALUES (11, 'attendance', 'userattendance');
INSERT INTO `django_content_type` VALUES (3, 'auth', 'group');
INSERT INTO `django_content_type` VALUES (2, 'auth', 'permission');
INSERT INTO `django_content_type` VALUES (4, 'auth', 'user');
INSERT INTO `django_content_type` VALUES (5, 'contenttypes', 'contenttype');
INSERT INTO `django_content_type` VALUES (6, 'sessions', 'session');
INSERT INTO `django_content_type` VALUES (8, 'userinfo', 'userface');
INSERT INTO `django_content_type` VALUES (7, 'userinfo', 'userinfo');

-- ----------------------------
-- Table structure for django_migrations
-- ----------------------------
DROP TABLE IF EXISTS `django_migrations`;
CREATE TABLE `django_migrations`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_migrations
-- ----------------------------
INSERT INTO `django_migrations` VALUES (1, 'contenttypes', '0001_initial', '2022-01-27 06:46:03.094295');
INSERT INTO `django_migrations` VALUES (2, 'auth', '0001_initial', '2022-01-27 06:46:03.759765');
INSERT INTO `django_migrations` VALUES (3, 'admin', '0001_initial', '2022-01-27 06:46:03.918850');
INSERT INTO `django_migrations` VALUES (4, 'admin', '0002_logentry_remove_auto_add', '2022-01-27 06:46:03.928823');
INSERT INTO `django_migrations` VALUES (5, 'admin', '0003_logentry_add_action_flag_choices', '2022-01-27 06:46:03.938797');
INSERT INTO `django_migrations` VALUES (6, 'contenttypes', '0002_remove_content_type_name', '2022-01-27 06:46:04.055350');
INSERT INTO `django_migrations` VALUES (7, 'auth', '0002_alter_permission_name_max_length', '2022-01-27 06:46:04.126161');
INSERT INTO `django_migrations` VALUES (8, 'auth', '0003_alter_user_email_max_length', '2022-01-27 06:46:04.199131');
INSERT INTO `django_migrations` VALUES (9, 'auth', '0004_alter_user_username_opts', '2022-01-27 06:46:04.209073');
INSERT INTO `django_migrations` VALUES (10, 'auth', '0005_alter_user_last_login_null', '2022-01-27 06:46:04.271348');
INSERT INTO `django_migrations` VALUES (11, 'auth', '0006_require_contenttypes_0002', '2022-01-27 06:46:04.276335');
INSERT INTO `django_migrations` VALUES (12, 'auth', '0007_alter_validators_add_error_messages', '2022-01-27 06:46:04.286308');
INSERT INTO `django_migrations` VALUES (13, 'auth', '0008_alter_user_username_max_length', '2022-01-27 06:46:04.358116');
INSERT INTO `django_migrations` VALUES (14, 'auth', '0009_alter_user_last_name_max_length', '2022-01-27 06:46:04.424937');
INSERT INTO `django_migrations` VALUES (15, 'auth', '0010_alter_group_name_max_length', '2022-01-27 06:46:04.490761');
INSERT INTO `django_migrations` VALUES (16, 'auth', '0011_update_proxy_permissions', '2022-01-27 06:46:04.500735');
INSERT INTO `django_migrations` VALUES (17, 'auth', '0012_alter_user_first_name_max_length', '2022-01-27 06:46:04.571569');
INSERT INTO `django_migrations` VALUES (18, 'sessions', '0001_initial', '2022-01-27 06:46:04.617424');
INSERT INTO `django_migrations` VALUES (19, 'userinfo', '0001_initial', '2022-01-27 06:46:04.652331');
INSERT INTO `django_migrations` VALUES (20, 'userinfo', '0002_userface', '2022-01-31 01:24:45.356175');
INSERT INTO `django_migrations` VALUES (21, 'userinfo', '0003_rename_user_id_userface_user', '2022-01-31 01:27:28.177836');
INSERT INTO `django_migrations` VALUES (22, 'userinfo', '0004_userface_user_name', '2022-01-31 01:29:51.156838');
INSERT INTO `django_migrations` VALUES (23, 'userinfo', '0005_rename_user_userface_user_id', '2022-02-03 23:42:50.803827');
INSERT INTO `django_migrations` VALUES (24, 'adminuser', '0001_initial', '2022-02-14 15:29:48.319433');
INSERT INTO `django_migrations` VALUES (25, 'attendance', '0001_initial', '2022-02-16 23:06:42.160365');
INSERT INTO `django_migrations` VALUES (26, 'attendance', '0002_attendancetime_attendance_coordinate', '2022-02-16 23:16:09.876746');
INSERT INTO `django_migrations` VALUES (27, 'attendance', '0003_alter_attendancetime_attendance_time_and_more', '2022-02-16 23:48:50.708877');
INSERT INTO `django_migrations` VALUES (28, 'attendance', '0004_alter_userattendance_attendance_time_and_more', '2022-02-17 11:21:52.367925');
INSERT INTO `django_migrations` VALUES (29, 'userinfo', '0006_alter_userinfo_create_time', '2022-02-17 11:21:52.439732');
INSERT INTO `django_migrations` VALUES (30, 'attendance', '0005_rename_out_time_userattendance_attendance_date_and_more', '2022-02-17 22:36:40.864930');
INSERT INTO `django_migrations` VALUES (31, 'attendance', '0006_alter_userattendance_attendance_state', '2022-02-21 21:21:54.676956');
INSERT INTO `django_migrations` VALUES (32, 'attendance', '0007_userattendance_early_out_userattendance_late', '2022-02-22 14:39:13.989100');

-- ----------------------------
-- Table structure for django_session
-- ----------------------------
DROP TABLE IF EXISTS `django_session`;
CREATE TABLE `django_session`  (
  `session_key` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `session_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`) USING BTREE,
  INDEX `django_session_expire_date_a5c62663`(`expire_date`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of django_session
-- ----------------------------

-- ----------------------------
-- Table structure for user_attendance
-- ----------------------------
DROP TABLE IF EXISTS `user_attendance`;
CREATE TABLE `user_attendance`  (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attendance_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attendance_date` date NOT NULL,
  `attendance_state` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `attendance_out_time` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `early_out` tinyint(1) NOT NULL,
  `late` tinyint(1) NOT NULL,
  PRIMARY KEY (`attendance_id`) USING BTREE,
  INDEX `user_attendance_user_id_id_146bc458_fk_user_info_user_id`(`user_id_id`) USING BTREE,
  CONSTRAINT `user_attendance_user_id_id_146bc458_fk_user_info_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `user_info` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 262 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_attendance
-- ----------------------------
INSERT INTO `user_attendance` VALUES (39, '张三1', '09:00:00', '2022-02-01', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (40, '张三1', '09:00:00', '2022-02-02', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (41, '张三1', '09:00:00', '2022-02-03', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (42, '张三1', '09:00:00', '2022-02-04', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (43, '张三1', '09:00:00', '2022-02-05', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (44, '张三1', '09:00:00', '2022-02-06', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (45, '张三1', '09:00:00', '2022-02-07', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (46, '张三1', '09:00:00', '2022-02-08', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (47, '张三1', '09:00:00', '2022-02-09', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (48, '张三1', '09:00:00', '2022-02-10', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (49, '张三1', '09:00:00', '2022-02-11', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (50, '张三1', '09:00:00', '2022-02-12', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (51, '张三1', '09:00:00', '2022-02-13', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (52, '张三1', '09:00:00', '2022-02-14', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (53, '张三1', '09:00:00', '2022-02-15', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (54, '张三1', '09:00:00', '2022-02-16', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (55, '张三1', '09:00:00', '2022-02-17', '成功', 'aaaaaaaa1', '18:00:00', 1, 0);
INSERT INTO `user_attendance` VALUES (56, '张三1', '09:00:00', '2022-02-18', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (57, '张三1', '09:00:00', '2022-02-19', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (58, '张三1', '09:00:00', '2022-02-20', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (59, '张三1', '09:00:00', '2022-02-21', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (60, '张三1', '09:00:00', '2022-02-22', '成功', 'aaaaaaaa1', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (63, '张三1', '09:00:00', '2022-02-25', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (64, '张三1', '09:00:00', '2022-02-26', '成功', 'aaaaaaaa1', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (65, '张三1', '09:00:00', '2022-02-27', '成功', 'aaaaaaaa1', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (66, '张三2', '09:00:00', '2022-02-01', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (67, '张三2', '09:00:00', '2022-02-02', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (68, '张三2', '09:00:00', '2022-02-03', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (69, '张三2', '09:00:00', '2022-02-04', '成功', 'aaaaaaaa2', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (70, '张三2', '09:00:00', '2022-02-05', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (71, '张三2', '09:00:00', '2022-02-06', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (72, '张三2', '09:00:00', '2022-02-07', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (73, '张三2', '09:00:00', '2022-02-08', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (74, '张三2', '09:00:00', '2022-02-09', '成功', 'aaaaaaaa2', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (75, '张三2', '09:00:00', '2022-02-11', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (76, '张三2', '09:00:00', '2022-02-12', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (77, '张三2', '09:00:00', '2022-02-13', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (78, '张三2', '09:00:00', '2022-02-14', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (79, '张三2', '09:00:00', '2022-02-15', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (80, '张三2', '09:00:00', '2022-02-16', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (81, '张三2', '09:00:00', '2022-02-17', '成功', 'aaaaaaaa2', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (82, '张三2', '09:00:00', '2022-02-18', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (83, '张三2', '09:00:00', '2022-02-19', '成功', 'aaaaaaaa2', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (84, '张三2', '09:00:00', '2022-02-20', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (85, '张三2', '09:00:00', '2022-02-21', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (86, '张三2', '09:00:00', '2022-02-22', '成功', 'aaaaaaaa2', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (87, '张三2', '09:00:00', '2022-02-23', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (88, '张三2', '09:00:00', '2022-02-24', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (89, '张三2', '09:00:00', '2022-02-25', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (90, '张三2', '09:00:00', '2022-02-27', '成功', 'aaaaaaaa2', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (91, '张三2', '09:00:00', '2022-02-28', '成功', 'aaaaaaaa2', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (92, '张三3', '09:00:00', '2022-02-01', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (93, '张三3', '09:00:00', '2022-02-02', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (94, '张三3', '09:00:00', '2022-02-03', '成功', 'aaaaaaaa3', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (95, '张三3', '09:00:00', '2022-02-04', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (96, '张三3', '09:00:00', '2022-02-05', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (97, '张三3', '09:00:00', '2022-02-06', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (98, '张三3', '09:00:00', '2022-02-07', '成功', 'aaaaaaaa3', '18:00:00', 1, 0);
INSERT INTO `user_attendance` VALUES (99, '张三3', '09:00:00', '2022-02-08', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (100, '张三3', '09:00:00', '2022-02-10', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (101, '张三3', '09:00:00', '2022-02-11', '成功', 'aaaaaaaa3', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (102, '张三3', '09:00:00', '2022-02-12', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (103, '张三3', '09:00:00', '2022-02-14', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (104, '张三3', '09:00:00', '2022-02-16', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (105, '张三3', '09:00:00', '2022-02-17', '成功', 'aaaaaaaa3', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (106, '张三3', '09:00:00', '2022-02-18', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (107, '张三3', '09:00:00', '2022-02-19', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (108, '张三3', '09:00:00', '2022-02-20', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (109, '张三3', '09:00:00', '2022-02-21', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (110, '张三3', '09:00:00', '2022-02-22', '成功', 'aaaaaaaa3', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (111, '张三3', '09:00:00', '2022-02-24', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (112, '张三3', '09:00:00', '2022-02-25', '成功', 'aaaaaaaa3', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (113, '张三3', '09:00:00', '2022-02-26', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (114, '张三3', '09:00:00', '2022-02-27', '成功', 'aaaaaaaa3', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (115, '张三3', '09:00:00', '2022-02-28', '成功', 'aaaaaaaa3', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (116, '张三4', '09:00:00', '2022-02-01', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (117, '张三4', '09:00:00', '2022-02-02', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (118, '张三4', '09:00:00', '2022-02-04', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (119, '张三4', '09:00:00', '2022-02-05', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (120, '张三4', '09:00:00', '2022-02-06', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (121, '张三4', '09:00:00', '2022-02-07', '成功', 'aaaaaaaa4', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (122, '张三4', '09:00:00', '2022-02-08', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (123, '张三4', '09:00:00', '2022-02-09', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (124, '张三4', '09:00:00', '2022-02-10', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (125, '张三4', '09:00:00', '2022-02-11', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (126, '张三4', '09:00:00', '2022-02-12', '成功', 'aaaaaaaa4', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (127, '张三4', '09:00:00', '2022-02-13', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (128, '张三4', '09:00:00', '2022-02-14', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (129, '张三4', '09:00:00', '2022-02-15', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (130, '张三4', '09:00:00', '2022-02-17', '成功', 'aaaaaaaa4', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (131, '张三4', '09:00:00', '2022-02-19', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (132, '张三4', '09:00:00', '2022-02-20', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (133, '张三4', '09:00:00', '2022-02-21', '成功', 'aaaaaaaa4', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (134, '张三4', '09:00:00', '2022-02-22', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (135, '张三4', '09:00:00', '2022-02-23', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (136, '张三4', '09:00:00', '2022-02-24', '成功', 'aaaaaaaa4', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (137, '张三4', '09:00:00', '2022-02-25', '成功', 'aaaaaaaa4', '18:00:00', 1, 0);
INSERT INTO `user_attendance` VALUES (138, '张三4', '09:00:00', '2022-02-26', '成功', 'aaaaaaaa4', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (211, '张三5', '09:00:00', '2022-02-01', '成功', 'aaaaaaaa5', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (212, '张三5', '09:00:00', '2022-02-02', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (213, '张三5', '09:00:00', '2022-02-03', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (214, '张三5', '09:00:00', '2022-02-04', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (215, '张三5', '09:00:00', '2022-02-05', '成功', 'aaaaaaaa5', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (216, '张三5', '09:00:00', '2022-02-06', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (217, '张三5', '09:00:00', '2022-02-07', '成功', 'aaaaaaaa5', '18:00:00', 1, 1);
INSERT INTO `user_attendance` VALUES (218, '张三5', '09:00:00', '2022-02-08', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (219, '张三5', '09:00:00', '2022-02-09', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (220, '张三5', '09:00:00', '2022-02-10', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (221, '张三5', '09:00:00', '2022-02-11', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (222, '张三5', '09:00:00', '2022-02-12', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (223, '张三5', '09:00:00', '2022-02-13', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (224, '张三5', '09:00:00', '2022-02-14', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (225, '张三5', '09:00:00', '2022-02-15', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (226, '张三5', '09:00:00', '2022-02-16', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (227, '张三5', '09:00:00', '2022-02-18', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (228, '张三5', '09:00:00', '2022-02-19', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (229, '张三5', '09:00:00', '2022-02-20', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (230, '张三5', '09:00:00', '2022-02-21', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (231, '张三5', '09:00:00', '2022-02-22', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (232, '张三5', '09:00:00', '2022-02-24', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (233, '张三5', '09:00:00', '2022-02-25', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (234, '张三5', '09:00:00', '2022-02-26', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (235, '张三5', '09:00:00', '2022-02-27', '成功', 'aaaaaaaa5', '18:00:00', 0, 0);
INSERT INTO `user_attendance` VALUES (236, '张三5', '09:00:00', '2022-02-28', '成功', 'aaaaaaaa5', '18:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (240, '齐博凡', '14:54:49', '2022-02-23', '成功', '19107290408', '22:56:34', 0, 1);
INSERT INTO `user_attendance` VALUES (242, '张三1', '11:42:36', '2022-02-24', '迟到', 'aaaaaaaa1', '00:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (243, '齐博凡', '11:54:29', '2022-02-24', '成功', '19107290408', '00:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (248, '齐博凡', '15:42:29', '2022-02-27', '成功', '19107290408', '15:42:39', 1, 1);
INSERT INTO `user_attendance` VALUES (250, '齐博凡', '22:57:58', '2022-03-05', '成功', '19107290408', '00:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (251, '齐博凡', '22:00:48', '2022-03-10', '成功', '19107290408', '22:01:10', 0, 1);
INSERT INTO `user_attendance` VALUES (256, '齐博凡', '23:10:21', '2022-03-27', '成功', '19107290408', '00:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (259, '齐博凡', '17:39:38', '2022-03-28', '成功', '19107290408', '00:00:00', 0, 1);
INSERT INTO `user_attendance` VALUES (261, '齐博凡', '13:08:42', '2022-04-10', '成功', '19107290408', '13:09:41', 1, 1);

-- ----------------------------
-- Table structure for user_face
-- ----------------------------
DROP TABLE IF EXISTS `user_face`;
CREATE TABLE `user_face`  (
  `pic_id` int NOT NULL AUTO_INCREMENT,
  `face_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`pic_id`) USING BTREE,
  INDEX `user_face_user_id_id_c4922970_fk_user_info_user_id`(`user_id_id`) USING BTREE,
  CONSTRAINT `user_face_user_id_id_c4922970_fk_user_info_user_id` FOREIGN KEY (`user_id_id`) REFERENCES `user_info` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_face
-- ----------------------------
INSERT INTO `user_face` VALUES (37, 'static/face_data/zhangsan1_aaaaaaaa1/', 'aaaaaaaa1', '张三1');
INSERT INTO `user_face` VALUES (38, 'static/face_data/qibofan_19107290408/', '19107290408', '齐博凡');

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `wechat_openid` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_gender` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_dept` varchar(15) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `create_time` date NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('19107290408', 'oAG4L5q1vx6s_5eYT_L57Xhsvx5Q', '齐博凡', '男', '人事部', '15524589072', '2022-02-23');
INSERT INTO `user_info` VALUES ('aaaaaaaa1', '', '张三1', '男', '人事部', '12345678901', '2022-02-19');
INSERT INTO `user_info` VALUES ('aaaaaaaa10', '', '张三10', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa11', '', '张三11', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa12', '', '张三12', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa13', '', '张三13', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa14', '', '张三14', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa15', '', '张三15', '男', '人事部', '12345678909', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa16', '', '张三16', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa17', '', '张三17', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa18', '', '张三18', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa19', '', '张三19', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa2', '', '张三', '男', '人事部', '12345678902', '2022-02-22');
INSERT INTO `user_info` VALUES ('aaaaaaaa20', '', '张三20', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa21', '', '张三21', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa22', '', '张三22', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa23', '', '张三23', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa24', '', '张三24', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa25', '', '张三25', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa26', '', '张三26', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa27', '', '张三27', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa28', '', '张三28', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa29', '', '张三29', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa3', '', '张三3', '男', '人事部', '12345678903', '2022-02-17');
INSERT INTO `user_info` VALUES ('aaaaaaaa30', '', '张三30', '男', '人事部', '12345678909', '2022-03-28');
INSERT INTO `user_info` VALUES ('aaaaaaaa4', '', '张三4', '男', '人事部', '12345678904', '2022-02-17');
INSERT INTO `user_info` VALUES ('aaaaaaaa5', '', '张三5', '男', '人事部', '12345678905', '2022-02-17');
INSERT INTO `user_info` VALUES ('aaaaaaaa6', '', '张三6', '男', '人事部', '12345678906', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa7', '', '张三7', '男', '人事部', '12345678907', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa8', '', '张三8', '男', '人事部', '12345678908', '2022-02-27');
INSERT INTO `user_info` VALUES ('aaaaaaaa9', '', '张三9', '男', '人事部', '12345678909', '2022-02-27');

SET FOREIGN_KEY_CHECKS = 1;
