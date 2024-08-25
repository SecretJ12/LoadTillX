FROM nikolaik/python-nodejs

WORKDIR /app

COPY /app /app

RUN ./setup.sh

ENV chargeTill=50
ENV maxKwh=58

CMD ["python", "server.py"]

EXPOSE 5000

