/*
 Navicat Premium Data Transfer

 Source Server         : localhost_5432
 Source Server Type    : PostgreSQL
 Source Server Version : 110001
 Source Host           : localhost:5432
 Source Catalog        : read_dev
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110001
 File Encoding         : 65001

 Date: 29/07/2019 02:15:08
*/

DROP SEQUENCE if EXISTS "public"."user_id_seq";  
CREATE SEQUENCE "public"."user_id_seq"  
 INCREMENT 1  
 MINVALUE 1 
 MAXVALUE 9223372036854775807
 START 1000
 CACHE 1;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS "public"."user";
CREATE TABLE "public"."user" (
  "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
  "nickname" varchar(200) COLLATE "pg_catalog"."default",
  "account" varchar(200) COLLATE "pg_catalog"."default",
  "email" varchar(200) COLLATE "pg_catalog"."default",
  "password" varchar(200) COLLATE "pg_catalog"."default" NOT NULL,
  "avatar" varchar(200) COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Uniques structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_email_54dc62b2_uniq" UNIQUE ("email");

-- ----------------------------
-- Primary Key structure for table user
-- ----------------------------
ALTER TABLE "public"."user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
