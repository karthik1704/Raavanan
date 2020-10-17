from django.contrib.auth.models import (
  BaseUserManager,   
)

class PhoneAndEmailUserManager(BaseUserManager):

    def normalize_phone(self, phone, country_code='+91'):
        phone = phone.strip().lower()
        try:
            import phonenumbers
            phone_number = phonenumbers.parse(phone, country_code)
            phone = phonenumbers.format_number(
                phone_number, phonenumbers.PhoneNumberFormat.E164)
        except ImportError:
            pass

        return phone

    def _create_user(self, username ,  password=None, is_active=True, is_superuser=False, is_staff=False, country_code='IN'):

        if not username: 
            raise ValueError('The given email_or_phone must be set')

        if '@' in username: 
            username = self.normalize_email(username)
            username, email, phone = (username, username,'')
        else: 
            username = self.normalize_phone(username, country_code = country_code)
            username, email, phone = (username, '', username)

        user = self.model(
            username = username,
            email = email,
            phone = phone
        )
        user.is_active = is_active
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.set_password(password)
        user.save(using= self._db)

        return user
        
    def create_user(self, username ,  password=None, country_code='IN'):

        return self._create_user(username,password , country_code=country_code )

    def create_superuser(self, username, password=None , country_code="IN" ):
        
        return self._create_user(username, password,is_superuser=True, is_staff=True, country_code=country_code )