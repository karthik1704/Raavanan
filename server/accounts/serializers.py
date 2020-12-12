from rest_framework import serializers

from .models import MyUser


class CustomRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(style={'input_type':'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = MyUser
        fields = ['first_name','last_name', 'email', 'phone', 'password', 'password2']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    def save(self,request):
        user = MyUser(
            email = self.validated_data['email'],
            phone = self.validated_data['phone'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Password Must Match.'})

        user.set_password(password)
        user.save()
        return user
