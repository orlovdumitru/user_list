Setup project:
1) setup python environment:
    python3 -m venv env_name
2) install requirements:
    (start environment first)
    pip install -r requirements.txt
3) make migrations:
    python manage.py makemigrations
    python manage.py migrate
4) run project:
    python manage.py runserver
5) setup angular:
    a) cd into client
    b) npm install
6) start angular:
    ng serve
7) open angular in browser
