from starlette.responses import JSONResponse


def return_base(data={}, message="ok", code=1, status_code=400, raw=False):
    rs = {
        "code": code,
        "message": message,
        "data": data
    }
    print('sssssssss')
    if raw:
        return JSONResponse(rs, status_code=status_code)
    return rs


# def returnNotFound(message, code=1):
#     return returnBase(message, code)


def return_ok(data=None, message='ok', code=20000):
    return return_base(data=data, message=message, code=code, status_code=200)


def return_bad_request(message, code=40000):
    return return_base(data=None, message=message, code=code, status_code=400)


def return_not_authority(data=None, code=40100, raw=False):
    return return_base(data=data, message='未登录', code=code, status_code=401, raw=raw)

# def returnForbidden(message, code=1):
#     return returnBase(message, code, status=403)


# def returnRedirect(location):
#     return JSONResponse(location)
