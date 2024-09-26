module.exports = function (app) {
  const modelName = "user_login";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      serviceName: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: null,
        maxLength: null,
        index: false,
        trim: false,
      },
      user: { type: Schema.Types.Mixed, required: true },
      results: {
        type: Schema.Types.Mixed,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
