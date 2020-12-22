# Install the base requirements for the app.
FROM python:3
WORKDIR /app
COPY python .
CMD python ./random_leds.py