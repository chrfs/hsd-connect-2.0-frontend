export default ((env: string) => {
  switch (env) {
    case 'development': {
      return {
        TYPE: 'development',
        API_HOST: 'http://localhost:3000/api/v1'
      };
    }
    case 'production': {
      return {};
    }
    default: {
      // tslint:disable:no-console
      console.error(`Your environment is invalid: ${env}`);
      return {};
    }
  }
})(process.env.NODE_ENV as any);
