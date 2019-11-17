/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { notification } from 'antd';
import fetch from 'dva/fetch';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


const errorMessage = {
  // old
  ':<(': '服务器错误',
  '-1': '服务器错误',
  GENERAL: '服务器错误',
  INTERNAL_ERROR: '服务器错误',
  BAUTH_TOKEN_MISSING: '登录信息已过期',
  NO_ITEMS_SELECTED: '请选择内容',
  USER_NOT_AUTHORIZED: '无权访问',
  DATA_ENTITY_NOT_EXIST: '该数据不存在',
  INVALID_BAUTH_USER: '账号不存在',
  ORGANIZATION_NOT_EXIST: '该机构不存在',
  THE_DATASETS_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  THE_DATA_ENTITY_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  THE_ORGANIZATION_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  DATASETS_NOT_EXIST: '该数据集不存在',
  THE_MEMBER_DOSE_NOT_BELONG_TO_THE_ORGANIZATION: '该成员不属于此机构',
  DATASETS_IS_NOT_SHARED: '无法分享',
  DATASETS_IS_NOT_SHARED_WITH_THE_ORGANIZATION: '无法分享',
  USERNAME_NOT_EXIST: '用户不存在',
  DATASET_ALREADY_EXISTS: '数据集已存在',
  APP_ALREADY_EXISTS: 'App已存在',
  ALREADY_IN_THIS_ORGANIZATION: '该成员已加入此机构',
  MEMBER_OR_DATASETS_NOT_EXIST: '该用户或数据集不存在',
  THE_TEAM_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  PART_OF_THE_TEAM_DOSE_NOT_BELONG_TO_THE_ORGANIZATION: '该团队不属于此机构',
  TEAMS_HAS_BEEN_USED: '团队已被使用',
  UNEXPECTED_ERROR: '网络错误',
  HDFS_ERROR: '存储失败',
  DATASETS_IS_COMPLETE: '数据集已完成，无法修改',
  TEAM_NOT_EXIST: '该团队不存在',
  THE_DATA_ENTITY_DOSE_NOT_BELONG_TO_THE_DATASETS: '该数据不属于此数据集',
  USER_NOT_EXIST: '用户不存在',
  INVALID_OLD_PASSWORD: '旧密码不正确',
  THE_PASSWORD_IS_INCONSISTENT: '两次输入的密码不一致',
  INVALID_CREDENTIAL: '用户名密码错误',
  INVALID_CAPTCHA: '验证码不正确',
  CAPTCHA_EXPIRED: '验证码已过期',
  THE_DESTINATION_FOLDER_DOES_NOT_EXIST: '目标文件夹不存在',
  THE_ENTITY_CAN_NOT_BE_MOVED_ACROSS_DATASETS: '数据不能跨数据集移动',
  RULE_TEMPLATE_NOT_EXIST: '数据清洗模板不存在',
  THE_RULE_TEMPLATE_NAME_HAS_BEEN_TAKEN: '该模板名称已被占用，请重新填写',
  THE_FLOW_TEMPLATE_NAME_HAS_BEEN_TAKEN: '该模板名称已被占用，请重新填写',
  SAMPLE_NOT_EXIST: '抽样数据不存在',
  XTABLE_COLUMN_EXIST: '列名存在重复项，请修改后进行预处理',
  INVALID_DATA_NOT_EXIST: '错误数据不存在',
  INVALID_DATA_IS_TOO_LARGE: '错误数据量过大',

  THE_APP_HAS_BEEN_INSTALLED: '该应用已经安装过了',
  APP_NOT_EXIST: '该应用不存在',
  THE_APP_VERSION_NUMBER_HAS_BEEN_TAKEN: '该版本号已经存在',
  APP_STATUS_EXCEPTION: '应用状态有误',
  REASON_IS_REQUIRED: '请补充理由',
  UNKNOWN_STATUS: '未知状态',
  APP_STATUS_IS_NOT_NEW: '该应用不是新建的',
  PACKAGE_HDFS_PATH_EXCEPTION: '程序包访问出错',
  THE_APP_NAME_HAS_BEEN_TAKEN: '名称已被其它应用使用',
  MEMBER_ALREADY_EXISTS: '成员已存在',
  PROJECT_NOT_FOUND: '项目未找到',
  FOLDER_ALREADY_EXISTS: '文件已存在',

  THE_RULE_HAS_BEEN_TAKEN: '该规则已经设置过了',

  // new
  ORGANIZATION_NOT_FOUND: '该机构不存在',
  ENTITY_NOT_FOUND: '该数据不存在',
  USER_NOT_FOUND: '该用户不存在',
  DATASETS_NOT_FOUND: '该数据集不存在',
  INVALID_ENTITY: '该数据无效',
  THE_ENTITY_IS_NOT_FOLDER: '该数据不是目录',
  // THE_ORGANIZATION_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  // NO_ITEMS_SELECTED: '请选择内容',
  // THE_DATASETS_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  HEADERS_XFS_AUTH_REQUIRED: 'http header缺少xfs auth信息',
  // THE_DATA_ENTITY_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  UNKNOWN_DATASETS_TYPE: '未知的数据集类型',
  INVALID_ACCOUNT: '该账户无效',
  // INVALID_CREDENTIAL: '密码错误',
  THE_USER_DOSE_NOT_JOIN_ANY_ORGANIZATION: '用户未加入机构',
  INVALID_API_KEY: 'API KEY无效',
  HEADERS_AUTHORIZATION_REQUIRED: 'http header缺少授权信息',
  INVALID_BAUTH_TOKEN: '账号不存在',
  INVALID_NOTIFICATION_ID: '该通知无效',
  ENTITY_TYPE_REQUIRED: '缺少实体类型',
  // INVALID_OLD_PASSWORD: '旧密码不正确',
  // THE_PASSWORD_IS_INCONSISTENT: '两次输入的密码不一致',
  UNKNOWN_TYPE_CODE: '未知类型',
  UNKNOWN_VISIBILITY_CODE: '未知的公开性属性',
  INVALID_XFS_OBJECT_ID: '文件ID无效',
  NO_FILES_TO_ADD: '未上传文件',
  THE_FILE_HAS_BEEN_ADDED: '该文件已上传',
  UNKNOWN_FILE_TYPE: '未知的文件系统类型',
  INVALID_DATASETS: '该数据集无效',
  // THE_MEMBER_DOSE_NOT_BELONG_TO_THE_ORGANIZATION: '该成员不属于此机构',
  DATASET_AUTHORIZE_HAS_BEEN_REQUEST: '该数据集已发出授权申请',
  INVALID_AUTHORIZE_ID: '该授权申请无效',
  NOT_AUTHORIZED: '无权访问',
  NO_SUCH_DIRECTORY: '该目录不存在',
  AVATAR_NOT_FOUND: '头像未找到',
  INVALID_UUID: '该头像ID无效',
  AVATAR_SIZE_SHOULD_NOT_BE_GREATER_THAN_61440_BYTES: '上传的头像大小不能超过60K',
  INVALID_DATASET_ACCESS_TOKEN: '该数据集访问token无效',
  DATASET_ACCESS_TOKEN_NOT_FOUND: '该数据集访问token不存在',
  UNKNOWN_ENTITY_TYPE: '未知的通知实体类型',
  DATASETS_HAS_BEEN_PUBLISHED: '数据集已发布，无法修改',

  DIRECTORY_EXISTS: '文件夹已存在',
  FOLD_NAME_FORMAT_ERROR: '目录名称格式错误:特殊符号仅允许"_"、"-"',
  INVALID_FILE_ID: '文件数据异常',
  NAME_IS_EXIST: '文件已存在',
  ATTACHMENT_SIZE_SHOULD_NOT_BE_GREATER_THAN_204800_BYTES: '上传的图片大小不能超过240K',

  THE_FUWU_HAS_BEEN_PURCHASED: '服务已经购买',
  MOUNT_EXIST: '加载的数据集已存在',
  MOUNT_ERROR: '加载数据集失败',
  FUWU_INSTANCE_NOT_FOUND: '服务未找到',
  THE_DATASET_MOUNT_POINT_MUST_BE_UNIQUE: '数据集加载目录不能重复',
  FUWU_NOT_FOUND: '服务未找到',
  FUWU_STATUS_EXCEPTION: '服务状态异常，操作失败',
  MOUNT_NOT_FOUND: '加载的数据集不存在',
  THE_FUWU_NAME_HAS_BEEN_TAKEN: '该名称已被占用，请重新填写',
  FUWU_ICON_SIZE_SHOULD_NOT_BE_GREATER_THAN_61440_BYTES: '图片大小不能超过64k',
  NOT_ALLOWED_TO_BUY_OWN_FUWU: '无法购买自己创建的服务',
  ENDPOINT_NOT_FOUND: '无法关闭已关闭的服务',
  NONPURCHASABLE_DATASET_NOT_SUPPORTED: '不支持不可购买的数据集',
  INVALID_PRICING: '分成价格不能大于售价',
  SELF_PURCHASE_NOT_ALLOWED: '无法购买自己的数据集',
  DATASET_CANNOT_FUWULIZE: '数据集不允许被服务使用',
  TRANSACTION_NOT_FOUND: '交易不存在',
  THE_DATASET_HAS_BEEN_PURCHASED: '该数据集已购买',
  DATASET_UNPUBLISHED: '该数据集未发布',
  INVALID_DATA: '数据无效',
  INVALID_EVENT_ID: '无效的事件',
  REVIEW_HAS_EXPIRED: '本次申请已关闭',
//   FUWU_RUNNER_ERROR: '服务创建失败',
  FUWU_DEPLOYMENT_STOPPING: '服务停止失败',
  UNSUPPORTED_SPARK_DATA_TYPE: '不支持的文件类型',
  IMMUTABLE_FUWU: '不可改变的服务',
  403: '没有权限访问',
  ADMIN_CANNOT_BE_DELETED: 'ADMIN用户无法删除',
  PROJECT_REVOKE_FAILED: '取消授权失败',
  NO_IMPLEMENTATION: '未实现',
  PROJECT_EXISTS_INVALID_DATASET: '项目存在无效的数据集',
  FUWU_RUNNER_ERROR: '服务spec格式不正确',
  DirectoryExist: '文件夹已存在',

};

export default function request(url, options) {
  let defaultOptions = {
    credentials: 'omit',
  };
  let newOptions = { ...defaultOptions, ...options };
  newOptions.headers = newOptions.headers || {};
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'PATCH' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body)
    } else {
      // newOptions.body is FormData
      //console.log('test request: ', newOptions.body)
      newOptions.headers = {
        ...newOptions.headers,
      };
    }
  }

  //console.log(url, newOptions)

  return fetch(url, newOptions)
    .then((response) => {
      
      // Check Status
      if (response.status >= 200 && response.status < 300) {
        console.log(response)
        return response;
      }

      if (newOptions && newOptions.headers && newOptions.headers.Accept === 'application/octet-stream') {
        return response;
      }

      response.json().then((responseObj) => {
        console.log('responseObj', responseObj);
        
        let errortext = errorMessage[responseObj.errorCode] || errorMessage[responseObj.error] || responseObj.errorMessage;
        if(responseObj.errorCode ==='FUWU_HAS_BEEN_STOPPED') {
          message.error('该服务已停用');

        } else {
          if(errortext === undefined) {
            message.error('错误');
          } else {
            message.error(errortext);
          }
        }
        
        return responseObj;
      });
    })
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      if (newOptions && newOptions.headers && newOptions.headers.Accept === 'application/octet-stream') {
        return response.json();
      }
      return response.json();
    })
    
}
    
    

