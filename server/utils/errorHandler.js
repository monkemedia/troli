const errorHandler = (res, err) => {
  const errors = err.errors

  return res.status(errors[0].status).send(errors)
}

module.exports = errorHandler
