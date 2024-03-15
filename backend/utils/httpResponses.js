export const unauthorizedResponse = (res, msg) => {
  return res.status(401).json({
    success: false,
    msg: msg
  })
}

export const invalidResponse = (res, status = 400, msg) => {
  return res.status(status).json({
    success: false,
    msg: msg
  })
}

export const serverResponse = (res, status = 500, msg) => {
  return res.status(status).json({
    success: false,
    msg: msg || 'Internal Server Error'
  })
}

export const dataResponse = (res, status = 200, data) => {
  return res.status(status).json({
    success: true,
    data: data
  })
}
