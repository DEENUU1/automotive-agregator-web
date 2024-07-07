from django.apps import AppConfig


class AuthenticationConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'auth'

    def ready(self):
        import auth.signals
        print("=====Authentication signals connected=====")
