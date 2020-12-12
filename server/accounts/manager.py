from django.contrib.auth.models import BaseUserManager


class MyUserManager(BaseUserManager):
    
    def create_user(self, email, first_name, last_name, phone, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name = first_name,
            last_name = last_name,
            phone = phone
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,  password ):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
           
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user