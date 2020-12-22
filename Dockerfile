# Install the base requirements for the app.
FROM python:3
WORKDIR /app
COPY lights.py .
CMD python ./lights.py