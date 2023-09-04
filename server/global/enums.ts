/**
 * 管理员角色
 */
export enum AdminRole {
  Normal = 'NORMAL_ADMIN',
  Super = 'SUPER_ADMIN',
}

/**
 * TOKEN来源
 */
export enum AppOrigin {
  Admin = 'admin',
  Weapp = 'weapp',
  App = 'app',
  Web = 'web',
  Api = 'api',
}

/**
 * 文件类型
 */
export enum FileType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Other = 'OTHER',
}

export enum AccountType {
  Username = 'USERNAME',
  Mobile = 'MOBILE',
  Email = 'EMAIL',
}

export enum AuthType {
  Password = 'PASSWORD',
  Wxmp = 'WXMP',
}
