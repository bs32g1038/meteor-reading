from pydantic import BaseModel, Schema


class BaseSchema(BaseModel):
    def dict(self, **args):
        args['skip_defaults'] = True
        return BaseModel.dict(self, **args)

    class Config:
        allow_population_by_alias = True


class SchemaValue(Schema):
    pass
