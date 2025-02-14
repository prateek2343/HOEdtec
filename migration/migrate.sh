#!/bin/sh

echo 'migrating database...'
# npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
echo 'goodbye...'
