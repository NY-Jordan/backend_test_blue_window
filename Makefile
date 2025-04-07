# Makefile

# Define the name of your service
SERVICE_NAME=blue_window

# Define the Prisma commands
MIGRATE_DEV = docker-compose exec $(SERVICE_NAME) npx prisma migrate dev
MIGRATE_DEPLOY = docker-compose exec $(SERVICE_NAME) npx prisma migrate deploy
MIGRATE_PUSH = docker-compose exec $(SERVICE_NAME) npx prisma db push
PRISMA_GENERATE = docker-compose exec $(SERVICE_NAME) npx prisma generate
RESET_DB = docker-compose exec $(SERVICE_NAME) npx prisma migrate reset
# Default target
.PHONY: help
help:
	@echo "Makefile for running Prisma migrations"
	@echo "Usage:"
	@echo "  make migrate-dev     Run Prisma migrations in dev mode"
	@echo "  make migrate-deploy  Run Prisma migrations in deploy mode"

# Migrate (dev mode)
.PHONY: migrate-dev
prisma-migrations:
	$(MIGRATE_DEV)

prisma-migrate :
	$(MIGRATE_PUSH)

prisma-generate :
	$(PRISMA_GENERATE)

prisma reset-db :
	$(RESET_DB)

# Migrate (deploy mode)
.PHONY: migrate-deploy
migrations-deploy:
	$(MIGRATE_DEPLOY)
