FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN apt-get update && apt-get install -y unixodbc unixodbc-dev
RUN apt-get update && \
    apt-get install -y unixodbc unixodbc-dev curl gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /etc/apt/trusted.gpg.d/microsoft.gpg && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18
RUN pip install --no-cache-dir -r requirements.txt

COPY coingecko_ingest.py .

RUN apt-get update && apt-get install -y cron

COPY cronjob.txt /etc/cron.d/ingest-cron

RUN sed -i 's/\r$//' /etc/cron.d/ingest-cron && \
    chmod 0644 /etc/cron.d/ingest-cron && \
    crontab /etc/cron.d/ingest-cron

CMD ["/bin/sh", "-c", "printenv > /etc/environment && cron -f"]