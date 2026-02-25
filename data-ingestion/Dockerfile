FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY coingecko_ingest.py .

RUN apt-get update && apt-get install -y cron

COPY cronjob.txt /etc/cron.d/ingest-cron

RUN chmod 0644 /etc/cron.d/ingest-cron

RUN crontab /etc/cron.d/ingest-cron

CMD ["cron", "-f"]