function errorHandling(err, req, res, next) {
  try {
    console.log(err);
    switch (err.name) {
      case "Unauthenticate":
        res.status(401).json({
          message: "Unauthenticate",
        });
        break;
      case "Forbidden":
        res.status(401).json({
          message: "User role must be admin",
        });
        break;
      case "not yours":
        res.status(401).json({
          message: "Can't delete other user product",
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          message: "JsonWebTokenError Bagas",
        });
        break;
      default:
        res.status(500).json({
          message: "Internal server error",
        });
        break;
    }
  } catch (error) {
    next(error);
  }
}

module.exports = errorHandling;
