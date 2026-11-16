CREATE TABLE "readingList" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"blogId" integer NOT NULL,
	"read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "token" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_blogId_blogs_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;