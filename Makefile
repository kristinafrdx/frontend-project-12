install:
	npm ci

lint:
	make -C frontend lint

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	make start-backend & make start-frontend