# Install the base requirements for the app.
FROM python:3
WORKDIR /app
COPY requirements.txt .
RUN sudo apt-get install python-setuptools
RUN sudo easy_install -U RPIO
COPY python .
CMD python3 random_leds.py