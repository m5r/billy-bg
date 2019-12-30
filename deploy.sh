#!/bin/bash

# track .env, deploy and go back to normal
sed -i '/.env/d' .gitignore
git add .
git commit -m "push to dokku with .env"
git push dokku master -f
git reset --soft HEAD^
git checkout origin/master .gitignore
git reset HEAD .env
