import datetime
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR, HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from rest_framework_csv.renderers import CSVRenderer
import os
import cv2 as cv
import numpy as np
import userinfo.models as UserModel
from .models import AttendanceTime, UserAttendance
from .serializers import UserAttendanceSerializers, AttendanceTimeSerializers


class RenderCsv(CSVRenderer):
    header = [
        'user_id',
        'user_name',
        'dept',
        'attendance_date',
        'attendance_time',
        'attendance_out_time',
        'attendance_state',
        'late',
        'early_out'
    ]
    labels = dict([
        ('user_id', '工号'),
        ('user_name', '用户名'),
        ('dept', '部门'),
        ('attendance_date', '日期'),
        ('attendance_time', '签到时间'),
        ('attendance_out_time', '签退时间'),
        ('attendance_state', '状态'),
        ('late','是否迟到'),
        ('early_out', '是否早退')
    ])
    encoding = 'utf-8-sig'


class UserAdOneTimeTable(APIView):
    def get(self, request, start_time):
        all_user = [item.user_id for item in UserModel.UserInfo.objects.all()]
        ad_success = 0
        ad_late = 0
        ad_early_out = 0
        for user_id in all_user:
            ad_success += UserAttendance.objects.filter(user_id__user_id=user_id,attendance_date=start_time).count()
            ad_late += UserAttendance.objects.filter(user_id__user_id=user_id,late=True,attendance_date=start_time).count()
            ad_early_out += UserAttendance.objects.filter(user_id__user_id=user_id,early_out=True,attendance_date=start_time).count()
        ad_unattend = UserModel.UserInfo.objects.all().count() - ad_success
        data = [
            {'type': '出勤', 'value': ad_success},
            {'type': '迟到', 'value': ad_late},
            {'type': '缺勤', 'value': ad_unattend},
            {'type': '早退', 'value': ad_early_out},
        ]
        return Response(data, status=HTTP_200_OK)


class UserAdTwoTimeTable(APIView):
    def get(self, request, start_time, end_time):
        time1 = datetime.datetime.strptime(str(start_time), '%Y-%m-%d')
        time2 = datetime.datetime.strptime(str(end_time), '%Y-%m-%d')
        range_time = time2 - time1
        date_list = [start_time]
        for day in range(1, range_time.days + 1):
            date_list.append((time1 + datetime.timedelta(day)).strftime('%Y-%m-%d'))
        all_user = [item.user_id for item in UserModel.UserInfo.objects.all()]
        ad_success = 0
        ad_late = 0
        ad_early_out = 0
        for user_id in all_user:
            for date in date_list:
                ad_success += UserAttendance.objects.filter(user_id__user_id=user_id,attendance_date=date).count()
                ad_late += UserAttendance.objects.filter(user_id__user_id=user_id,late=True,attendance_date=date).count()
                ad_early_out += UserAttendance.objects.filter(user_id__user_id=user_id,early_out=True,attendance_date=date).count()
        ad_unattend = len(date_list) * UserModel.UserInfo.objects.all().count() - ad_success
        data = [
            {'type': '出勤', 'value': ad_success},
            {'type': '迟到', 'value': ad_late},
            {'type': '缺勤', 'value': ad_unattend},
            {'type': '早退', 'value': ad_early_out},
        ]
        return Response(data, status=HTTP_200_OK)


class UserAdOneTimeExcel(APIView):
    def get(self, request, start_time):
        ad = UserAttendance.objects.filter(attendance_date=start_time)
        s = UserAttendanceSerializers(instance=ad, many=True)
        render = RenderCsv()
        data = []
        for item in s.data:
            user_dept = UserModel.UserInfo.objects.get(user_id=item['user_id']).user_dept
            item['late'] = "是" if item['late'] else "否"
            item['early_out'] = "是" if item['early_out'] else "否"
            item['dept'] = user_dept
            item['attendance_date'] = item['attendance_date'] + '\t'
            data.append(item)
        response = HttpResponse(render.render(data), content_type='text/csv')
        name = f'attachment;filename="{start_time}考勤表.csv"'
        response['Content-Disposition'] = name.encode('utf-8').decode('ISO-8859-1')
        return response


class UserAdTwoTimeExcel(APIView):
    def get(self, request, start_time, end_time):
        ad = UserAttendance.objects.filter(attendance_date__range=(start_time, end_time))
        s = UserAttendanceSerializers(instance=ad, many=True)
        render = RenderCsv()
        data = []
        for item in s.data:
            user_dept = UserModel.UserInfo.objects.get(user_id=item['user_id']).user_dept
            item['dept'] = user_dept
            item['late'] = "是" if item['late'] else "否"
            item['early_out'] = "是" if item['early_out'] else "否"
            item['attendance_date'] = item['attendance_date'] + '\t'
            data.append(item)
        response = HttpResponse(render.render(data), content_type='text/csv')
        name = f'attachment;filename="{start_time}至{end_time}考勤表.csv"'
        response['Content-Disposition'] = name.encode('utf-8').decode('ISO-8859-1')
        return response


class DeptAdTable(APIView):
    def get(self, request, department, start_time, end_time):
        '''dept = UserModel.UserInfo.objects.values('user_dept').distinct()
        dept_data = []
        for item in dept:
            dept_data.append(item['user_dept'])'''
        time1 = datetime.datetime.strptime(str(start_time), '%Y-%m-%d')
        time2 = datetime.datetime.strptime(str(end_time), '%Y-%m-%d')
        range_time = time2 - time1
        date_list = [start_time]
        data = []
        late_count = 0
        attend_count = 0
        out_early_count = 0
        for day in range(1, range_time.days + 1):
            date_list.append((time1 + datetime.timedelta(day)).strftime('%Y-%m-%d'))
        for date in date_list:
            attend = UserAttendance.objects.filter(user_id__user_dept=department,attendance_date=date).count()
            late = UserAttendance.objects.filter(user_id__user_dept=department,late=True,attendance_date=date).count()
            # un_attend = UserAttendance.objects.filter(attendance_state="缺勤", user_id__user_dept=department,
            #                                           attendance_date=date).count()
            out_early = UserAttendance.objects.filter(user_id__user_dept=department,early_out=True,attendance_date=date).count()
            un_attend = UserModel.UserInfo.objects.all().count() - attend
            data.append({'date': date, 'value': attend, 'type': '出勤'})
            data.append({'date': date, 'value': late, 'type': '迟到'})
            data.append({'date': date, 'value': un_attend, 'type': '缺勤'})
            data.append({'date': date, 'value': out_early, 'type': '早退'})
            late_count += late
            attend_count += attend
            out_early_count += out_early
        un_attend_count = len(date_list)*UserModel.UserInfo.objects.filter(user_dept=department).count() - attend_count
        count_data = [{'type': '出勤', 'value': attend_count},
                      {'type': '迟到', 'value': late_count},
                      {'type': '缺勤', 'value': un_attend_count},
                      {'type': '早退', 'value': out_early_count}]

        return Response({'data': data, 'count': count_data})


# 需要处理缺勤名单，处理早退，缺勤
class DeptExcel(APIView):
    def get(self, request, department, start_time, end_time):
        ad = UserAttendance.objects.filter(user_id__user_dept=department, attendance_date__range=(start_time, end_time))
        s = UserAttendanceSerializers(instance=ad, many=True)
        render = RenderCsv()
        data = []
        for item in s.data:
            user_dept = UserModel.UserInfo.objects.get(user_id=item['user_id']).user_dept
            item['dept'] = user_dept
            item['late'] = "是" if item['late'] else "否"
            item['early_out'] = "是" if item['early_out'] else "否"
            item['attendance_date'] = item['attendance_date'] + '\t'
            data.append(item)
        response = HttpResponse(render.render(data), content_type='text/csv')
        name = f'attachment;filename="{start_time}至{end_time}{department}考勤表.csv"'
        response['Content-Disposition'] = name.encode('utf-8').decode('ISO-8859-1')
        return response


class Attendance(APIView):
    def get(self, request):
        ad = AttendanceTime.objects.all().first()
        if ad:
            s = AttendanceTimeSerializers(instance=ad)
            return Response(s.data, status=HTTP_200_OK)
        else:
            return Response(None, status=HTTP_200_OK)

    def post(self, request):
        s = AttendanceTimeSerializers(data=request.data)
        if s.is_valid():
            s.save()
            return Response({"message": '设置成功'}, status=HTTP_201_CREATED)
        else:
            return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request):
        try:
            ad = AttendanceTime.objects.get(time_id=request.data['time_id'])
            s = AttendanceTimeSerializers(instance=ad, data=request.data)
            if s.is_valid():
                s.save()
                return Response({"message": '修改成功'}, status=HTTP_201_CREATED)
            else:
                return Response({'message': '出现错误，请重试', 'err_message': s.errors}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        except AttendanceTime.DoesNotExist:
            return Response({'message': '考勤不存在'}, status=HTTP_404_NOT_FOUND)


class Search(APIView):
    def post(self, request):
        data = request.data
        if 'department' not in data and 'user_id' not in data:
            ad = UserAttendance.objects.filter(attendance_date__range=(data['start_time'], data['end_time']))
        elif 'department' not in data and data['user_id'] == '':
            ad = UserAttendance.objects.filter(attendance_date__range=(data['start_time'], data['end_time']))
        elif data['user_id'] == '':
            ad = UserAttendance.objects.filter(user_id__user_dept=data['department'],
                                               attendance_date__range=(data['start_time'], data['end_time']))
        elif 'department' not in data:
            ad = UserAttendance.objects.filter(user_id=data['user_id'],
                                               attendance_date__range=(data['start_time'], data['end_time']))
        else:
            ad = UserAttendance.objects.filter(user_id=data['user_id'], user_id__user_dept=data['department'],
                                               attendance_date__range=(data['start_time'], data['end_time']))
        s = UserAttendanceSerializers(instance=ad, many=True)
        result = []
        for item in s.data:
            user_dept = UserModel.UserInfo.objects.get(user_id=item['user_id']).user_dept
            item['user_dept'] = user_dept
            result.append(item)
        return Response({'message': '搜索成功', 'data': result}, status=HTTP_200_OK)


class AttendanceUser(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.FACE_CASCADE = cv.CascadeClassifier('static/cascades/haarcascade_frontalface_default.xml')
        self.FACE_MODELS = cv.face.LBPHFaceRecognizer_create()

    def get(self, request):
        user_attendance = UserAttendance.objects.all().order_by('-attendance_date')
        s = UserAttendanceSerializers(instance=user_attendance, many=True)
        data = []
        for item in s.data:
            user_dept = UserModel.UserInfo.objects.get(user_id=item['user_id']).user_dept
            item['user_dept'] = user_dept
            data.append(item)
        return Response(data, HTTP_200_OK)

    def post(self, request):
        type = request.data['type']
        id_list = []
        for dirname, son_dirname, filenames in os.walk("static/face_data"):
            for user_dirname in son_dirname:
                id_list.append(user_dirname.split("_")[1])
        self.FACE_MODELS.read('static/cascades/face_models.yml')
        face_img = cv.imdecode(np.fromstring(request.FILES['face_img'].read(), np.uint8), 1)
        gary_face = cv.cvtColor(face_img, cv.COLOR_BGR2GRAY)
        face = self.FACE_CASCADE.detectMultiScale(gary_face, 1.1, 5)
        if len(face) == 1:
            for x, y, w, h in face:
                roi = gary_face[y:y + h, x:x + w]
                roi_face = cv.resize(roi, (200, 200))
                '''# 全局直方均衡
                a = cv.equalizeHist(roi_face)
                # 降噪
                blur = cv.medianBlur(a, 5)
                # 二值
                retval, erzhihua_face = cv.threshold(blur, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)'''
                '''#局部直方均衡
                calhe = cv.createCLAHE(clipLimit=1.5, tileGridSize=(4,4))
                dst = calhe.apply(roi_face)
                # 二值化
                retval, erzhihua_face = cv.threshold(dst, 0, 255, cv.THRESH_BINARY + cv.THRESH_OTSU)'''
                # 识别
                label, confidence = self.FACE_MODELS.predict(roi_face)
                if confidence > 80:
                    print({"name": "陌生人", 'con': confidence, "id": id_list[label]})
                    return Response({'message': '未识别，请重试'})
                else:
                    print('标签id:', label, '置信评分:', confidence, '姓名:', id_list[label])
                    user = UserModel.UserInfo.objects.get(user_id=id_list[label])
                    ad_time = AttendanceTime.objects.all().first().attendance_time
                    out_time = AttendanceTime.objects.all().first().out_time
                    now_time = datetime.datetime.now().strftime('%H:%M:%S')
                    if type == '考勤':
                        if now_time > ad_time:
                            attendance_state = '迟到'
                            late = True
                        else:
                            attendance_state = '成功'
                            late = False
                        data = {
                            'user_id': user.user_id,
                            'user_name': user.user_name,
                            'attendance_time': now_time,
                            'attendance_date': datetime.date.today(),
                            'attendance_state': attendance_state,
                            'late':late,
                            'attendance_out_time': '00:00:00'
                        }
                        s = UserAttendanceSerializers(data=data)
                        if s.is_valid():
                            s.save()
                            return Response({'message': '考勤成功', 'ad_time': now_time, 'code': True})
                        else:
                            print(s.errors)
                            return Response({'message': '出现错误，请重试', 'code': False, 'err_message': s.errors})
                    if type == '签退':
                        if now_time > out_time:
                            attendance_state = '成功'
                            early_out = False
                        else:
                            attendance_state = '早退'
                            early_out = True
                        data = {
                            'attendance_state': attendance_state,
                            'attendance_out_time': now_time,
                            'early_out':early_out
                        }
                        user_ad = UserAttendance.objects.get(user_id=user.user_id)
                        s = UserAttendanceSerializers(instance=user_ad, data=data, partial=True)
                        if s.is_valid():
                            s.save()
                            return Response({'message': '签退成功', 'out_time': now_time, 'code': True})
                        else:
                            print(s.errors)
                            return Response({'message': '出现错误，请重试', 'code': False, 'err_message': s.errors})
        else:
            return Response({'message': '未检测到人脸', 'code': False})

    def put(self, request):
        wx_openid = request.data['openid']
        date = request.data['date']
        user_id = UserModel.UserInfo.objects.get(wechat_openid=wx_openid).user_id
        ad = UserAttendance.objects.filter(user_id=user_id,attendance_date=date)
        if len(ad)==1:
            s = UserAttendanceSerializers(instance=ad,many=True)
            return Response({'isAd':True,'data':s.data})
        else:
            return Response({'isAd':False})
