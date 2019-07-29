def parse_time(value):
    return value.strftime("%Y-%m-%dT%H:%M:%SZ")


def get_offset_limit_from_pagination(pagination):
    page = pagination.page
    limit = pagination.limit
    offset = (page - 1) * limit
    return offset, limit


def underscore_to_camelcase(value):
    def camelcase():
        yield str.lower
        while True:
            yield str.capitalize

    c = camelcase()
    return "".join(next(c)(x) if x else "_" for x in value.split("_"))
