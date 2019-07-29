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

 Date: 29/07/2019 02:15:16
*/

DROP SEQUENCE if EXISTS "public"."bookshelf_id_seq";  
CREATE SEQUENCE "public"."bookshelf_id_seq"  
 INCREMENT 1  
 MINVALUE 1 
 MAXVALUE 9223372036854775807
 START 1000
 CACHE 1;

-- ----------------------------
-- Table structure for bookshelf
-- ----------------------------
DROP TABLE IF EXISTS "public"."bookshelf";
CREATE TABLE "public"."bookshelf" (
  "novel_id" int4 NOT NULL DEFAULT nextval('bookshelf_id_seq'::regclass),
  "user_id" int4,
  "created_at" timestamptz(6),
  "updated_at" timestamptz(6),
  "id" int4 NOT NULL
)
;

-- ----------------------------
-- Primary Key structure for table bookshelf
-- ----------------------------
ALTER TABLE "public"."bookshelf" ADD CONSTRAINT "user_bookself_pkey" PRIMARY KEY ("id");
