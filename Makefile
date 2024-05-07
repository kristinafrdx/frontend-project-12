# lint-frontend:
# 	make -C frontend lint

# install:
# 	npm ci

# start-frontend:
# 	cd ./frontend & npm run start

# start-backend:
# 	npx start-server

# start:
# 	make start-backend & make start-frontend

# develop:
# 	git push

# build:
# 	rm frontend/build -rf
# 	npm run build

lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server -s ./frontend/build

deploy:
	git push heroku main

start:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build