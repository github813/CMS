/**
 * Created by xujianke on 2017/8/18.
 */

export class RedisKey{
  constructor(
    public name:string,
    public key:string,
    public type:string,
    public demo:string
  ){}
}
export class RedisKeys {
  public static list:Array<RedisKey>=[
    new RedisKey('微信accessToken','weixin:accessToken','value',''),
    new RedisKey('角色菜单权限','admin:role:menu','value',''),
    new RedisKey('密码错误次数','wallet:pwdError:{userCode}','value','wallet:pwdError:10000193'),
    new RedisKey('司机登陆token','login:driver:token','hash',''),
    new RedisKey('短信验证码次数','verify:count:{date}:mobile:{mobile}','value','verify:count:20170831:mobile:13111111111'),
  ];
}
