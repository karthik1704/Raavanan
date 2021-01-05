from django.contrib.auth.backends import ModelBackend


from .models import User

class EmailPhoneBackend(ModelBackend):

    def authenticate(self, request, email=None, password=None, phone=None, **kwargs):
        
        user = None
        if email is None:
            phone = phone

            if phone is None:
                return None
            else:

                try: 
                    user = User.objects.get(phone=phone)
                except User.DoesNotExist:
                    return None
        else:
            try:
                user = User.objects.get(email__iexact = email)
            except User.DoesNotExist:
                return None
        
        if user.check_password(password):
            return user

    def get_user(self, user_id):
        try:
            return User.objects.get(id = user_id)
        except User.DoesNotExist:
            return None