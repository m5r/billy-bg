# ---- Base Node ----
FROM node:13-alpine AS base
WORKDIR /app
COPY package*.json ./

# ---- Dependencies ----
FROM base AS dependencies
RUN npm ci --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

# ---- Build ----
FROM dependencies AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Release ----
FROM base AS release
COPY .env ./
COPY --from=dependencies /app/prod_node_modules ./node_modules
COPY --from=build /app/build ./build

CMD [ "node", "build/index.js" ]
