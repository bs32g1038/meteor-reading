import io
import random

from fastapi import APIRouter
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from starlette.requests import Request
from starlette.responses import PlainTextResponse

router = APIRouter()


class Picture(object):
    def __init__(self, text_str, size, background):
        """
        text_str: 验证码显示的字符组成的字符串
        size:  图片大小
        background: 背景颜色
        """
        self.text_list = list(text_str)
        self.size = size
        self.background = background
        self.random_str = ""

    def create_pic(self):
        """
        创建一张图片
        """
        self.width, self.height = self.size
        self.img = Image.new("RGB", self.size, self.background)
        # 实例化画笔
        self.draw = ImageDraw.Draw(self.img)

    def create_point(self, num, color):
        """
        num: 画点的数量
        color: 点的颜色
        功能：画点
        """
        for i in range(num):
            self.draw.point(
                (random.randint(0, self.width), random.randint(0, self.height)),
                fill=color,
            )

    def create_line(self, num, color):
        """
        num: 线条的数量
        color: 线条的颜色
        功能：画线条
        """
        for i in range(num):
            self.draw.line(
                [
                    (random.randint(0, self.width), random.randint(0, self.height)),
                    (random.randint(0, self.width), random.randint(0, self.height)),
                ],
                fill=color,
            )

    def get_random_str(self):
        return "".join(self.random_str)

    def create_text(self, font_type, font_size, font_color, font_num, start_xy):
        """
        font_type: 字体
        font_size: 文字大小
        font_color: 文字颜色
        font_num:  文字数量
        start_xy:  第一个字左上角坐标,元组类型，如 (5,5)
        功能： 画文字
        """
        font = ImageFont.truetype(font_type, font_size)
        self.random_str = random.sample(self.text_list, font_num)
        self.draw.text(start_xy, " ".join(self.random_str), font=font, fill=font_color)

    def opera(self):
        """
        功能：给画出来的线条，文字，扭曲一下，缩放一下，位移一下，滤镜一下。
        就是让它看起来有点歪，有点扭。
        """
        params = [
            1 - float(random.randint(1, 2)) / 100,
            0,
            0,
            0,
            1 - float(random.randint(1, 10)) / 100,
            float(random.randint(1, 2)) / 500,
            0.001,
            float(random.randint(1, 2)) / 500,
        ]
        self.img = self.img.transform(self.size, Image.PERSPECTIVE, params)
        self.img = self.img.filter(ImageFilter.EDGE_ENHANCE_MORE)


# 创建字体（字体的路径，服务器路径）
font_path = "./app/plume.otf"


def get_random_color():
    # 获取随机颜色
    R = random.randrange(255)
    G = random.randrange(255)
    B = random.randrange(255)
    return (R, G, B)


@router.get("/v1/api/captcha", summary="验证码", tags=["验证码"])
async def get_verify_img(request: Request):

    strings = "abcdefghjkmnpqrstwxyz23456789ABCDEFGHJKLMNPQRSTWXYZ"
    size = (130, 50)
    background = "white"
    pic = Picture(strings, size, background)
    pic.create_pic()
    pic.create_point(500, (220, 220, 220))
    pic.create_line(30, (220, 220, 220))
    pic.create_text(font_path, 30, (216, 92, 92), 5, (10, 10))

    # 记录给哪个请求发了什么验证码
    request.session["captcha_code"] = pic.get_random_str()
    # print(request.session)
    # 获得一个缓存区
    buf = io.BytesIO()
    # 将图片保存到缓存区
    pic.img.save(buf, "png")

    # 将缓存区的内容返回给前端 .getvalue 是把缓存区的所有数据读取
    return PlainTextResponse(buf.getvalue(), media_type="image/png")
