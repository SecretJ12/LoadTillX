FROM nikolaik/python-nodejs

WORKDIR /app

COPY /app /app

RUN ./setup.sh

ENV chargeTill 50
ENV maxKwh 58
ENV IP 0.0.0.0
ENV PORT 5000

EXPOSE $PORT

CMD waitress-serve --host $IP --port $PORT server:app

