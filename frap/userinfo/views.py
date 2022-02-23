from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.views import APIView
import os
import cv2 as cv
import numpy as np
import pandas as pd
import requests
import json
import pypinyin
import shutil
from .serializers import UserInfoSerializer, UserFaceSerializers
from .models import UserInfo, UserFace


class User(APIView):
    def get(self, request):
        user = UserInfo.objects.all()
        s = UserInfoSerializer(user, many=True)
        data = s.data
        user_data = []
        for item in data:
            face = UserInfo.objects.filter(userface__user_id=item['user_id']).order_by('user_id')
            if len(face) == 1:
                item['isFace'] = '是'
            else:
                item['isFace'] = '否'
            user_data.append(item)
        return Response(user_data, status=HTTP_200_OK)

    def post(self, request):
        if 'staff_excel' in request.FILES:
            staff_excel = request.FILES['staff_excel']
            is_user = 0
            staff_list = pd.read_excel(staff_excel)
            user_id_list = staff_list[u'工号'].values
            user_name_list = staff_list[u'姓名'].values
            user_gender_list = staff_list[u'性别'].values
            user_dept_list = staff_list[u'部门'].values
            user_phone_list = staff_list[u'手机号'].values
            lens = len(staff_list.index.values)
            user_list = []
            for i in range(lens):
                data = {
                    'user_id' :str(user_id_list[i]),
                    'user_name' : user_name_list[i],
                    'user_gender' : user_gender_list[i],
                    'user_dept' : user_dept_list[i],
                    'user_phone' : str(user_phone_list[i])
                }
                try:
                    user = UserInfo.objects.get(user_id=data['user_id'])
                    is_user += 1
                except UserInfo.DoesNotExist:
                    user_list.append(data)
            s = UserInfoSerializer(data=user_list,many=True)
            if s.is_valid():
                s.save()
                return Response({'message': f'导入{lens}个,{is_user}个已存在'},status=HTTP_201_CREATED)
            else:
                return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            data = request.data.copy()
            try:
                user = UserInfo.objects.get(user_id=data['user_id'])
                return Response({'message': "员工已存在，请重试"}, status=HTTP_401_UNAUTHORIZED)
            except UserInfo.DoesNotExist:
                s = UserInfoSerializer(data=data)
                if s.is_valid():
                    s.save()
                    return Response({'message': "添加成功"}, status=HTTP_201_CREATED)
                else:
                    return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        data = request.data.copy()
        try:
            user = UserInfo.objects.get(user_id=data['user_id'])
            s = UserInfoSerializer(instance=user, data=data,partial=True)
            if s.is_valid():
                s.save()
                return Response({'message': '修改成功'}, status=HTTP_200_OK)
            else:
                return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except UserInfo.DoesNotExist:
            return Response({'message': "员工不存在，请重试"}, status=HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        user_id = request.data['user_id']
        user_name = ''
        try:
            user = UserInfo.objects.get(user_id=user_id)
            for i in pypinyin.pinyin(user.user_name, style=pypinyin.NORMAL):
                user_name += ''.join(i)
            if os.path.exists('static/face_data/{0}_{1}/'.format(user_name, user.user_id)):
                shutil.rmtree('static/face_data/{0}_{1}/'.format(user_name, user.user_id))
            user.delete()
            return Response({'message': "删除成功"}, status=HTTP_200_OK)
        except UserInfo.DoesNotExist:
            return Response({'message': "员工不存在，请重试"}, status=HTTP_401_UNAUTHORIZED)


class OpenId(APIView):
    def post(self, request):
        appid = 'wxda5d7576900652f8'
        secret = 'c04d37e706c60e7091fa1ad49008d47a'
        js_code = request.data['code']
        auth_url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + secret + "&js_code=" + js_code + "&grant_type=authorization_code"
        response = json.loads(requests.get(auth_url).content)
        openid = response['openid']
        try:
            user = UserInfo.objects.get(wechat_openid=openid)
        except UserInfo.DoesNotExist:
            user = None
        if user:
            return Response({"isOpenId": True, 'openid': openid})
        else:
            return Response({"isOpenId": False, 'openid': openid})

    def put(self, request):
        user_id = request.data['user_id']
        user_name = request.data['user_name']
        user_dept = request.data['user_dept']
        wechat_openid = request.data['wechat_openid']
        user = UserInfo.objects.filter(user_id=user_id, user_name=user_name, user_dept=user_dept)
        if len(user) == 1:
            s = UserInfoSerializer(instance=user[0], data={"wechat_openid": wechat_openid}, partial=True)
            if s.is_valid():
                s.save()
                return Response({'code': True, 'message': "验证成功，点击确定进行人脸采集"})
            else:
                return Response({'code': False, 'message': s.errors})
        else:
            return Response({'code': False, 'message': "信息不匹配，请核对"})


class Face(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.FACE_CASCADE = cv.CascadeClassifier('static/cascades/haarcascade_frontalface_default.xml')

    def get(self, request):
        img_array, label_array = [], []
        img_label = 0
        for dirname, son_dirname, filenames in os.walk("static/face_data"):
            for user_dirname in son_dirname:
                face_img_path = os.path.join(dirname, user_dirname)
                for face_img in os.listdir(face_img_path):
                    face = cv.imread(os.path.join(face_img_path, face_img))
                    if face is None:
                        continue
                    gary_face = cv.cvtColor(face, cv.COLOR_BGR2GRAY)
                    '''# 全局直方均衡
                    a = cv.equalizeHist(gary_face)
                    # 降噪
                    blur = cv.medianBlur(a, 5)
                    # 二值
                    retval, erzhihua_face = cv.threshold(blur, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)'''
                    ''' # 局部直方均衡
                        calhe = cv.createCLAHE(clipLimit=1.5, tileGridSize=(4, 4))
                        dst = calhe.apply(gary_face)
                        # 二值化
                        retval, erzhihua_face = cv.threshold(dst, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)'''
                    calhe = cv.createCLAHE(clipLimit=1.5, tileGridSize=(4, 4))
                    dst = calhe.apply(gary_face)
                    blur = cv.medianBlur(dst, 5)
                    # 准备训练
                    img_array.append(blur)
                    label_array.append(img_label)
                img_label += 1
        img_array = np.asarray(img_array, np.uint8)
        label_array = np.asarray(label_array, np.int32)
        LBPH_TRAIN = cv.face.LBPHFaceRecognizer_create(threshold=60)
        LBPH_TRAIN.train(img_array, label_array)
        LBPH_TRAIN.save("static/cascades/face_models.yml")
        return Response({'code': True})

    def post(self, request):
        user_name = ''
        user = UserInfo.objects.get(wechat_openid=request.data['open_id'])
        try:
            user_face = UserFace.objects.get(user_id=user.user_id)
        except UserFace.DoesNotExist:
            user_face = None
        for i in pypinyin.pinyin(user.user_name, style=pypinyin.NORMAL):
            user_name += ''.join(i)
        OUT_PATH = 'static/face_data/{0}_{1}/'.format(user_name, user.user_id)
        FILE_NAME = request.data['file_name']
        FILE_TYPE = '.' + request.FILES['face_img'].name.split('.')[1]
        if not os.path.exists(OUT_PATH):
            os.makedirs(OUT_PATH)
        if user_face is None:
            s = UserFaceSerializers(data={"face_path": OUT_PATH, "user_id": user.user_id, "user_name": user.user_name})
            if s.is_valid():
                s.save()
            else:
                print(s.errors)
        # 相当于cv.imread()
        face_img = cv.imdecode(np.fromstring(request.FILES['face_img'].read(), np.uint8), 1)
        gary_face = cv.cvtColor(face_img, cv.COLOR_BGR2GRAY)
        face = self.FACE_CASCADE.detectMultiScale(gary_face, 1.1, 5)

        if len(face) == 1:
            for x, y, w, h in face:
                roi = face_img[y:y + h, x:x + w]
                roi_face = cv.resize(roi, (200, 200))
                flip_face = cv.flip(roi_face, 1)
                cv.imwrite(OUT_PATH + FILE_NAME + FILE_TYPE, roi_face)
                cv.imwrite(OUT_PATH + FILE_NAME + "-flip" + FILE_TYPE, flip_face)
                return Response({'code': True})
        else:
            return Response({'code': False})


class CheckFace(APIView):
    def post(self, request):
        user = UserInfo.objects.get(wechat_openid=request.data['open_id'])
        try:
            user_face = UserFace.objects.get(user_id=user.user_id)
        except UserFace.DoesNotExist:
            user_face = None
        if user_face:
            return Response({'isFirst': False})
        else:
            return Response({'isFirst': True})
