from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.status import \
    HTTP_200_OK, \
    HTTP_201_CREATED, \
    HTTP_500_INTERNAL_SERVER_ERROR, \
    HTTP_401_UNAUTHORIZED,HTTP_404_NOT_FOUND
import hashlib
from .models import Admin
from .serializers import AdminUserSerializers


class AdminUser(APIView):
    def get(self, request):
        admin = Admin.objects.all()
        s = AdminUserSerializers(admin, many=True)
        result = s.data
        data = []
        for item in result:
            item.pop('password')
            data.append(item)
        return Response(data, status=HTTP_200_OK)

    def post(self, request):
        data = request.data.copy()
        try:
            admin = Admin.objects.get(name=data['name'])
            return Response({'message': "用户名存在，请重试"}, status=HTTP_401_UNAUTHORIZED)
        except Admin.DoesNotExist:
            data['password'] = hashlib.md5(data['password'].encode()).hexdigest()
            s = AdminUserSerializers(data=data)
            if s.is_valid():
                s.save()
                return Response({'message': "添加成功"}, status=HTTP_201_CREATED)
            else:
                return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        data = request.data.copy()
        try:
            admin = Admin.objects.get(id=data['id'])
            if data['old_password'] and data['password']:
                data['old_password'] = hashlib.md5(data['old_password'].encode()).hexdigest()
                data['password'] = hashlib.md5(data['password'].encode()).hexdigest()
                if data['old_password'] == admin.password:
                    s = AdminUserSerializers(instance=admin, data=data)
                    if s.is_valid():
                        s.save()
                        return Response({'message': '修改成功'}, status=HTTP_200_OK)
                    else:
                        return Response({'message': '出现错误，请重试', 'err_message': s.errors},
                                        status=HTTP_500_INTERNAL_SERVER_ERROR)
                else:
                    return Response({'message': '旧密码错误'}, status=HTTP_401_UNAUTHORIZED)
            else:
                data.pop('old_password')
                data.pop('password')
                s = AdminUserSerializers(instance=admin, data=data, partial=True)
                if s.is_valid():
                    s.save()
                    return Response({'message': '修改成功'}, status=HTTP_200_OK)
                else:
                    return Response({'message': '出现错误，请重试', 'err_message': s.errors},
                                    status=HTTP_500_INTERNAL_SERVER_ERROR)
        except Admin.DoesNotExist:
            return Response({'message': "用户不存在，请重试"}, status=HTTP_404_NOT_FOUND)

    def delete(self, request):
        id = request.data['id']
        try:
            admin = Admin.objects.get(id=id)
            admin.delete()
            return Response({'message': "删除成功"}, status=HTTP_200_OK)
        except Admin.DoesNotExist:
            return Response({'message': "用户不存在，请重试"}, status=HTTP_404_NOT_FOUND)


class AdminUserLogin(APIView):
    def post(self, request):
        data = request.data.copy()
        data['password'] = hashlib.md5(data['password'].encode()).hexdigest()
        try:
            admin = Admin.objects.get(name=data['name'])
            s = AdminUserSerializers(admin)
            result = s.data
            result.pop('id')
            if result == data:
                result.pop('password')
                return Response({'message': '登陆成功', 'user': result}, status=HTTP_200_OK)
            else:
                return Response({'message': '信息有误，请重试'}, status=HTTP_401_UNAUTHORIZED)
        except Admin.DoesNotExist:
            return Response({'message': '用户不存在'}, status=HTTP_404_NOT_FOUND)
