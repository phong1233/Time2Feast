FROM python:3.8.0-buster

WORKDIR /code

COPY requirements.txt /code
RUN pip install -r requirements.txt

COPY . /code

CMD ["python", "app.py"]
