const Utils = {
  getToken(): string | null {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    return token ? token.split('=')[1] : null;
  },

  setToken(token: string): void {
    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = `token=${token}`;
  },

  getRefreshToken(): string | null {
    const refreshToken = document.cookie.split('; ').find(row => row.startsWith('refreshToken='));
    return refreshToken ? refreshToken.split('=')[1] : null;
  },

  setRefreshToken(refreshToken: string): void {
    // eslint-disable-next-line unicorn/no-document-cookie
    document.cookie = `refreshToken=${refreshToken}`;
  },

  getContentType(data: any): string {
    if (typeof data === 'object' && !(data instanceof FormData)) {
      return 'application/json';
    }
    if (data instanceof FormData) {
      return 'multipart/form-data';
    }
    return 'text/plain';
  },

  buildQueryParams(params: { [key: string]: any }): string {
    return qs.stringify(params, { arrayFormat: 'brackets' });
  },

  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  },

};

export default Utils;
