help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

.PHONY: build-frontend
build-frontend : ## Build frontend container
	@docker build frontend -t lafontaine:frontend --platform linux/amd64

.PHONY: run-frontend
run-frontend : ## Run frontend container
	@docker run -p 80:80 lafontaine:frontend

.PHONY: build-backend
build-backend : ## Build backend container
	@docker build backend -t lafontaine:backend --platform linux/amd64

.PHONY: clean-infra
clean-infra : ## Remove images, containers and database
	@docker system prune -f -a && sudo rm -rf ~/apps/postgres

.PHONY: stop-infra
stop-infra : ## stop the server, client and database
	@docker-compose stop && docker-compose down

.PHONY: spin-new-infra
spin-new-infra : stop-infra clean-infra
	@docker-compose -f compose.yaml build
	@docker-compose -f compose.yaml up --detach
	@docker-compose -f compose.yaml stop && docker-compose -f compose.yaml down

