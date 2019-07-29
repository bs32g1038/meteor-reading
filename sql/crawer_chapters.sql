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

 Date: 28/07/2019 08:54:00
*/

DROP SEQUENCE if EXISTS "public"."crawler_chapters_id_seq";  
CREATE SEQUENCE "public"."crawler_chapters_id_seq"  
 INCREMENT 1  
 MINVALUE 1 
 MAXVALUE 9223372036854775807
 START 1000
 CACHE 1;

-- ----------------------------
-- Table structure for crawler_chapters
-- ----------------------------
DROP TABLE IF EXISTS "public"."crawler_chapters";
CREATE TABLE "public"."crawler_chapters" (
  "id" int4 NOT NULL DEFAULT nextval('crawler_chapters_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default",
  "sum_words" int4 DEFAULT 0,
  "novel_id" int4,
  "index" int4,
  "fingerprint" varchar(255) COLLATE "pg_catalog"."default",
  "content" text COLLATE "pg_catalog"."default",
  "created_at" timestamptz(6) NOT NULL,
  "updated_at" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Indexes structure for table crawler_chapters
-- ----------------------------
CREATE INDEX "crawer_chapter_novel_id_index_index" ON "public"."crawler_chapters" USING btree (
  "novel_id" "pg_catalog"."int4_ops" ASC NULLS LAST,
  "index" "pg_catalog"."int4_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table crawler_chapters
-- ----------------------------
ALTER TABLE "public"."crawler_chapters" ADD CONSTRAINT "crawler_chapters_fingerprint_key" UNIQUE ("fingerprint");

-- ----------------------------
-- Primary Key structure for table crawler_chapters
-- ----------------------------
ALTER TABLE "public"."crawler_chapters" ADD CONSTRAINT "crawler_chapters_pkey" PRIMARY KEY ("id");
