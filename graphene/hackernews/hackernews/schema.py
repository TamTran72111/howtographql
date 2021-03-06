import graphene
import graphql_jwt

import links.schema
import links.relay_schema
import users.schema


class Query(users.schema.Query, links.schema.Query, links.relay_schema.RelayQuery, graphene.ObjectType):
    pass


class Mutation(links.schema.Mutation, users.schema.Mutation, links.relay_schema.RelayMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
