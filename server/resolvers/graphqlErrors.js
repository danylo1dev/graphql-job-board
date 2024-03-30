export function notFound(message) {
  return new GraphQLError(message, {
    extensions: { code: "NOT_FOUND" },
  });
}
export function unauthorized(message) {
  return new GraphQLError(message, {
    extensions: { code: "UNAUTHARIZED" },
  });
}
