module.exports = function (app) {
  const modelName = 'user_login';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      loginEmail: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: null,
        maxLength: null,
        index: false,
        trim: false,
      },
      code: { type: Number, required: false, min: 0, max: 1000000 },
      access: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 500,
        index: true,
        trim: true,
      },
      sendMailCounter: { type: Number, default: 0 },
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
