lint-frontend:
	make -C chat lint

install:
	npm ci

start-frontend:
	make -C chat start

start-backend:
	npx start-server

start:
	make start-backend

develop:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build