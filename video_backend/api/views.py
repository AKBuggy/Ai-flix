# views.py

from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from api.models import Video
from .serializers import VideoSerializer

@api_view(['POST'])
def upload_video(request):
    if request.method == 'POST' and 'video_file' in request.data:
        file_parser = FileUploadParser()
        video_file = request.FILES['video_file']

        serializer = VideoSerializer(data={'video_file': video_file})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'No video file was uploaded.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_video(request):
    videos = Video.objects.all()
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_all_videos(request):
    if request.method == 'DELETE':
        # Delete all videos from the database
        Video.objects.all().delete()
        return Response({'message': 'All videos deleted successfully.'}, status=200)
    return Response({'error': 'Invalid request method.'}, status=400)


@api_view(['POST'])
def upvote_video(request, video_id):
    return vote_video(request, video_id, vote_type='up')

@api_view(['POST'])
def downvote_video(request, video_id):
    return vote_video(request, video_id, vote_type='down')

def vote_video(request, video_id, vote_type):
    try:
        video = Video.objects.get(pk=video_id)

        if vote_type == 'up':
            if request.user.is_authenticated:
                # If the user is authenticated, allow voting
                video.upvotes += 1
            else:
                # If the user is not authenticated, you can implement a different logic here
                # For example, you can allow voting without tracking the user by IP address
                pass
        elif vote_type == 'down':
            if request.user.is_authenticated:
                # If the user is authenticated, allow voting
                video.downvotes += 1
            else:
                # If the user is not authenticated, you can implement a different logic here
                # For example, you can allow voting without tracking the user by IP address
                pass

        video.save()
        return Response({'message': 'Vote updated successfully.'}, status=status.HTTP_200_OK)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def download_video(request, video_id):
    try:
        video = Video.objects.get(pk=video_id)
        # Add logic here to handle the download, such as returning the file for download
        return Response({'message': 'Video download initiated.'}, status=status.HTTP_200_OK)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found.'}, status=status.HTTP_404_NOT_FOUND)