/* eslint-disable func-names */
export default (env => {
  switch (env) {
    case 'development': {
      return {
        TYPE: 'development',
        API: {
          URL: 'http://localhost',
          PATH: '/api/v1',
          PORT: 3000
        }
      }
    }
    case 'production': {
      return {}
    }
    default: {
      /* eslint-disable no-console */
      console.error('Your environment is invalid: ', env)
      return {}
    }
  }
})(process.env.NODE_ENV)
