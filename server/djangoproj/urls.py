from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import RedirectView, TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('djangoapp/', include('djangoapp.urls')),
    path('about/', RedirectView.as_view(url='/static/About.html')),
    path('contact/', RedirectView.as_view(url='/static/Contact.html')),
    re_path(r'^(?!static|media|admin|djangoapp).*$',
            TemplateView.as_view(template_name='index.html')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
