function errorHandling(err, req, res, next) {
  try {
    console.log(err);
    switch (err.name) {
      case "user not found":
        res.status(401).json({
          message: "User Not Found",
        });
        break;
      case "Unauthenticate":
        res.status(401).json({
          message: "Unauthenticate",
        });
        break;
      case "Forbidden":
        res.status(403).json({
          message: "User role must be admin",
        });
        break;
      case "already in wish":
        res.status(401).json({
          message: "already in wish",
        });
        break;
      case "not admin":
        res.status(401).json({
          message: "Can't take this action if youre role not admin",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          message: "JsonWebTokenError",
        });
        break;
      case "validationError":
        res.status(400).json({
          statusCode: 400,
          message: "Bad request",
        });
        break;
      case "SequelizeValidationError":
        const message = err.errors.map((el) => el.message);
        res.status(400).json({
          statusCode: 400,
          message: message,
        });
        break;
      case "SequelizeUniqueConstraintError":
        res.status(409).json({
          statusCode: 409,
          message: "email already exist",
        });
        break;
      case "Not Found":
        res.status(404).json({
          message: "Not Found",
        });
        break;
      default:
        res.status(500).json({
          allErrors: err,
          message: "Internal server error",
        });
        break;
    }
  } catch (error) {
    next(error);
  }
}

module.exports = errorHandling;
