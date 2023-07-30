# urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_video, name='upload_video'),
    path('get_video/', views.get_video, name='get_video'),  
    path('delete_all_videos/', views.delete_all_videos, name='delete_all_videos'),
    path('upvote/<int:video_id>/', views.upvote_video, name='upvote_video'),
    path('downvote/<int:video_id>/', views.downvote_video, name='downvote_video'),
    path('download/<int:video_id>/', views.download_video, name='download_video'),
    # path('reset_vote/<int:video_id>/', views.reset_vote, name='reset_vote'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 
