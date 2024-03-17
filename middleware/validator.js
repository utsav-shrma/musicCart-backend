const validator = (schema) => {
  return async function (req, res, next) {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ error: "bad request", type: err.name, message: err.message });
    }
  };
};

module.exports = validator;
