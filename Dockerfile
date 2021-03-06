FROM node:10.13.0

# install the 'host' command used to get ip of ipfs container
RUN apt-get update -y && apt-get install dnsutils libsecret-1-dev -y

## Add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.4.0/wait /wait

ADD ops/entry /entry
RUN chmod +x /wait /entry

WORKDIR /usr/app
COPY . .
RUN npm install

ENTRYPOINT [ "/entry" ]
CMD [ "deploy" ]
