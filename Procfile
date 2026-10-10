web: gunicorn --bind 0.0.0.0:8000 --workers 2 --threads 4 --worker-tmp-dir /dev/shm --access-logfile - --error-logfile - 'app:create_app()'
