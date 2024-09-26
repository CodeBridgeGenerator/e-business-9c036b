
module.exports = {
  before: {
    async update(context) {
      await createAuditLog(context, 'update');
      return context;
    },
    async patch(context) {
      await createAuditLog(context, 'patch');
      return context;
    },
    async remove(context) {
      await createAuditLog(context, 'remove');
      return context;
    },
  },
  after: {
    async update(context) {
      await createAuditLog(context, 'update', context.result);
      return context;
    },
    async patch(context) {
      await createAuditLog(context, 'patch', context.result);
      return context;
    },
    async remove(context) {
      await createAuditLog(context, 'remove', context.result);
      return context;
    },
  },
  error: {},
};

async function createAuditLog(context, action, result = null) {
  const { app, method, params, data } = context;
  const userId = params.user ? params.user.name : 'unknown';

  const auditData = {
    action: action,
    createdBy: userId,
    serviceName: context.path,
    method: method,
    details: JSON.stringify(data) || JSON.stringify(result) || '',
    // createdBy:params.user.name,
    // updatedBy:params.user.name,
  };

  await app.service('audits').create(auditData);
}
