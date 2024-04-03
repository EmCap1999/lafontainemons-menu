help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

.PHONY: build-frontend
build-frontend : ## Build frontend container
	@docker build frontend -t lafontaine:frontend --platform linux/amd64

.PHONY: run-frontend
run-frontend : ## Run frontend container
	@docker run -p 8081:8081 lafontaine:frontend

.PHONY: build-backend
build-backend : ## Build backend container
	@docker build backend -t lafontaine:backend --platform linux/amd64

.PHONY: clean-docker
clean-docker : ## Remove images and containers
	@docker stop $$(docker ps -a -q) && docker rm $$(docker ps -a -q) && docker rmi $$(docker images -a -q)
