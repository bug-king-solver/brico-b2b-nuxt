FROM node:14

# Create app directory
WORKDIR /app

# # Bundle app source
# COPY . .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./

RUN yarn
# If you are building your code for production
# RUN npm ci --only=production



EXPOSE 4000
# CMD [ "yarn", "dev" ]