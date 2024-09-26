module.exports = function (app) {
  const modelName = "tickets";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      ticket: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
        index: true,
        trim: true,
      },
      project: {
        type: String,
        required: false,
        unique: false,
        lowercase: false,
        uppercase: false,
        minLength: 2,
        maxLength: 150,
        index: true,
        trim: true,
      },
      title: {
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
      description: {
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
      status: {
        type: String,
        required: false,
        enum: ["open", "closed", "inprogress", "reopened"],
      },
      priority: {
        type: String,
        required: false,
        enum: ["high", "medium", "low", "critical"],
      },
      type: { type: String, required: false, enum: ["bug", "feature", "task"] },
      reporter: { type: Schema.Types.ObjectId, ref: "users" },
      assignee: { type: Schema.Types.ObjectId, ref: "users" },
      closed: {
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
