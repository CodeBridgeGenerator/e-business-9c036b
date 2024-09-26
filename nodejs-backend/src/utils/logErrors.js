module.exports = function logErrors() {
  return async (context) => {
    const { error, params } = context;

    // console.log("Error Hook Triggered", params);

    if (error) {
      const errorData = {
        serviceName: context.path,
        error: JSON.stringify(error),
        message: error.message,
        stack: "reactjs",
        details: "",
        createdBy: typeof params?.user?._id !== 'undefined'  ? params.user._id : null,
        updatedBy: typeof params?.user?._id !== 'undefined' ? params.user._id : null,
      };

      await context.app.service("errors").create(errorData);
    }
    return context;
  };
};
