const formResp = (res, { code = 200, data, message, ...others }) => {
  return res.status(code).json({ data, message, status_code: code, ...others });
};

export default formResp;
