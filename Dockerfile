FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
ARG WALLET_UI_URL
ENV REACT_APP_URL_WALLET_API $WALLET_UI_URL
RUN echo "DEBUG": $REACT_APP_URL_WALLET_API
RUN npm i
CMD ["npm", "run", "start"]
