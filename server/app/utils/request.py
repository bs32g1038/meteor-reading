import inspect

from fastapi import HTTPException
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

from app.utils.reponse import return_bad_request, return_not_authority


def auth(func):
    async def wrapper(request, **kwargs):
        if not request.session.get("user", None):
            return return_not_authority()
        return await func(request, **kwargs)

    return wrapper


def query_params(func):
    async def wrapper(request, *args, **kwargs):
        args, varargs, keywords, defaults = inspect.getargspec(func)
        defaultParams = dict(zip(args[-len(defaults) :], defaults))
        ks = {}
        try:
            for k, v in defaultParams.items():
                if type(v).__name__ == "SchemaMetaclass":
                    data = {}
                    for field in v.fields.keys():
                        data[field] = request.query_params.get(
                            field, v.fields[field].get_default_value()
                        )
                    data, error = v.validate_or_error(data)
                    if error:
                        return return_bad_request(dict(error))
                    ks[k] = data
                    continue
                rs = type(v)(request.query_params.get(k, v))
                ks[k] = rs
        except ValueError:
            return return_bad_request("{} Must be a {}.".format(k, type(v).__name__))
        return await func(request, **ks)

    return wrapper


def get_user_id(request: Request):
    user_id = request.session.get("user", None)
    if not user_id:
        raise HTTPException(status_code=HTTP_401_UNAUTHORIZED)
    return user_id
