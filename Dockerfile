FROM nikolaik/python-nodejs

WORKDIR /app

COPY /app /app

RUN ./setup.sh

CMD ["python", "server.py"]

EXPOSE 5000

