
const ERRORS_HANDLES = {

  CastError: res =>
    res.status(400).send({ error: 'id send is malformed' }),

  ValidationError: (res, error) =>
    res.status(401).send({
      error: error.message
    }),

  JsonWebError: (res, error) =>
    res.status(401).send({ error: 'token missing or invalid' }),

  DefaultError: res => res.status(500).end()

}


module.exports = (error, req, res, next) => {

  const handler =
    ERRORS_HANDLES[error.name] || ERRORS_HANDLES.DefaultError

  handler(res, error)

}
