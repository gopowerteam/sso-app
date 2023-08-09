module.exports = {
  gateway: 'http://127.0.0.1:3000',
  openapi: '/api-docs',
  output: './src/http',
  exportModels: true,
  logger: true,
  applications: {
    'admin-service': 'admin',
    'client-service': 'client',
  },
  appendService: false,
  exportServices: {
    responseType: 'promise',
    excludeQueryParams: ['page', 'size', 'order', 'sort', 'paged', 'unpaged'],
  },
}
