# lint-frontend:
# 	make -C frontend lint

install:
	npm ci

# start-frontend:
# 	npx start-server -s ./frontend/build

start-backend:
	npx start-server -s ./frontend/build

# deploy:
# 	git push heroku main

start:
	make start-backend 

develop:
	make start-backend & make start-frontend

build:
	rm -rf frontend/build
	npm run build