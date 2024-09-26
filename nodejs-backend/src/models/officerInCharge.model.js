module.exports = function (app) {
  const modelName = "officer_in_charge";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      officerName: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      designation: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      telephoneNumber: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      icPassportNumber: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      email: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },
      organizationName: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 1000,
        index: true,
        trim: true,
      },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
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
