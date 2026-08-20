CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"actorId" integer,
	"action" varchar(80) NOT NULL,
	"entityType" varchar(80) NOT NULL,
	"entityId" varchar(80),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "company_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"singletonKey" varchar(32) DEFAULT 'default' NOT NULL,
	"companyName" varchar(160) DEFAULT 'ORA' NOT NULL,
	"legalName" varchar(200),
	"tagline" varchar(240),
	"description" text,
	"contactEmail" varchar(320),
	"contactPhone" varchar(80),
	"location" varchar(160),
	"businessHours" varchar(160),
	"responseTime" varchar(160),
	"websiteUrl" varchar(500),
	"socialLinks" jsonb DEFAULT '{}'::jsonb,
	"privacyPolicy" text,
	"termsOfUse" text,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "company_settings_singletonKey_unique" UNIQUE("singletonKey")
);
--> statement-breakpoint
CREATE TABLE "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(160) NOT NULL,
	"email" varchar(320) NOT NULL,
	"subject" varchar(220),
	"message" text NOT NULL,
	"status" varchar(24) DEFAULT 'new' NOT NULL,
	"internalNotes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(180) NOT NULL,
	"title" varchar(220) NOT NULL,
	"excerpt" varchar(500) NOT NULL,
	"body" text NOT NULL,
	"category" varchar(120),
	"service" varchar(120),
	"clientName" varchar(180),
	"coverImageUrl" varchar(1000),
	"mediaUrls" jsonb DEFAULT '[]'::jsonb,
	"deliverables" jsonb DEFAULT '[]'::jsonb,
	"results" jsonb DEFAULT '[]'::jsonb,
	"techStack" jsonb DEFAULT '[]'::jsonb,
	"clientConsent" integer DEFAULT 0 NOT NULL,
	"featured" integer DEFAULT 0 NOT NULL,
	"displayOrder" integer DEFAULT 0 NOT NULL,
	"status" varchar(24) DEFAULT 'draft' NOT NULL,
	"publishedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portfolio_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "project_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" varchar(24),
	"name" varchar(160) NOT NULL,
	"email" varchar(320) NOT NULL,
	"company" varchar(200),
	"service" varchar(64) NOT NULL,
	"brief" text NOT NULL,
	"status" varchar(32) DEFAULT 'new' NOT NULL,
	"priority" varchar(16) DEFAULT 'normal' NOT NULL,
	"assigneeId" integer,
	"followUpAt" timestamp,
	"internalNotes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_requests_reference_unique" UNIQUE("reference")
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"contentKey" varchar(80) NOT NULL,
	"contentValue" text NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "site_content_contentKey_unique" UNIQUE("contentKey")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"displayName" varchar(160) NOT NULL,
	"role" varchar(160),
	"company" varchar(180),
	"quote" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"avatarUrl" varchar(1000),
	"source" varchar(500),
	"consentToPublish" integer DEFAULT 0 NOT NULL,
	"internalNote" text,
	"status" varchar(24) DEFAULT 'pending' NOT NULL,
	"publishedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" varchar(32) DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId")
);
--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entityType","entityId");--> statement-breakpoint
CREATE INDEX "audit_logs_created_at_idx" ON "audit_logs" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "contact_messages_status_idx" ON "contact_messages" USING btree ("status");--> statement-breakpoint
CREATE INDEX "portfolio_items_status_idx" ON "portfolio_items" USING btree ("status");--> statement-breakpoint
CREATE INDEX "portfolio_items_order_idx" ON "portfolio_items" USING btree ("displayOrder");--> statement-breakpoint
CREATE INDEX "project_requests_status_idx" ON "project_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "project_requests_created_at_idx" ON "project_requests" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "testimonials_status_idx" ON "testimonials" USING btree ("status");