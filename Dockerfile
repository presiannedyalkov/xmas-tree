# Install the base requirements for the app.
FROM python:3
WORKDIR /app
COPY requirements.txt .
RUN pip3 install -r requirements.txt
COPY python .
CMD python3 random_leds.py