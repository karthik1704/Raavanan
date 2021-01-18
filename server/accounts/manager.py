from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):

    def create_user(self, email, phone, password=None, **kwargs):

        if not email:
            raise ValueError('User must have email address.')
        
        # if not username: 
        #     raise ValueError('User must have username address.')


        user = self.model(
           # username = username,
            email = self.normalize_email(email), 
            phone = phone,
        )

       
        # user.first_name = kwargs.first_name
        # user.last_name = kwargs.last_name
        # user.birth_year = kwargs.birth_year
        # user.country = kwargs.country

        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, email, phone, password=None, **kwargs):

        user = self.create_user(
            #username,
            email,
            phone,
            password = password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using = self._db)

        return user


