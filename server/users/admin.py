from django.contrib import admin

from users.models import User,Profile

# Register your models here.
class ProfileAdmin (admin.StackedInline):
   model=Profile

class UserAdmin(admin.ModelAdmin):
   date_hierarchy = 'date_joined'
   inlines= (ProfileAdmin,)
   # fieldsets=(
   #    ('Personal Information',{
   #       'fields': ('Profile')
   #    }),
   # )


admin.site.register(User, UserAdmin)