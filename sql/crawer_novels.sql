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

 Date: 28/07/2019 08:45:35
*/

DROP SEQUENCE if EXISTS "public"."crawler_novels_id_seq";  
CREATE SEQUENCE "public"."crawler_novels_id_seq"  
 INCREMENT 1  
 MINVALUE 1 
 MAXVALUE 9223372036854775807
 START 1000
 CACHE 1;

-- ----------------------------
-- Table structure for crawler_novels
-- ----------------------------
DROP TABLE IF EXISTS "public"."crawler_novels";
CREATE TABLE "public"."crawler_novels" (
  "id" int4 NOT NULL DEFAULT nextval('crawler_novels_id_seq'::regclass),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "fingerprint" varchar(255) COLLATE "pg_catalog"."default",
  "pic" varchar(255) COLLATE "pg_catalog"."default",
  "summary" text COLLATE "pg_catalog"."default",
  "author" varchar(255) COLLATE "pg_catalog"."default",
  "tag_id" int4 DEFAULT 0,
  "sum_words" int4 DEFAULT 0,
  "status" bool DEFAULT false,
  "is_deleted" bool DEFAULT false,
  "last_chapter_id" int4,
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Uniques structure for table crawler_novels
-- ----------------------------
ALTER TABLE "public"."crawler_novels" ADD CONSTRAINT "crawler_novels_fingerprint_key" UNIQUE ("fingerprint");

-- ----------------------------
-- Primary Key structure for table crawler_novels
-- ----------------------------
ALTER TABLE "public"."crawler_novels" ADD CONSTRAINT "crawler_novels_pkey" PRIMARY KEY ("id");
