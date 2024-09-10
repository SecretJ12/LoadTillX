FROM nikolaik/python-nodejs

WORKDIR /app

COPY /app/setup.sh /app/setup.sh
COPY /app/package.json /app/package.json
RUN ./setup.sh

COPY /app /app


ENV chargeTill=50
ENV maxKwh=58
ENV IP=0.0.0.0
ENV PORT=5000

EXPOSE $PORT

CMD node server.js

