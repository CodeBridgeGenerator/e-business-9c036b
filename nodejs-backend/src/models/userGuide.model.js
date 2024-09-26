module.exports = function (app) {
  const modelName = 'user_guide';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      serviceName: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        uppercase: false,
        index: false,
        trim: false,
      },
      expiry: { type: Date, required: false },
      createdBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: 'users', required: true },
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
