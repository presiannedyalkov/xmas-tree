# Install the base requirements for the app.
FROM python:3
WORKDIR /app
COPY python .
CMD python3 random_leds.py