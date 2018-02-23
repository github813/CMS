/**
 * Created by xujianke on 2017/7/28.
 */
export class Dictionary {
  public static payType={1:"微信",2:"中金",9:"线下"};
  public static rechargeStatus={0:"无效",1:"等待",2:"成功",3:"异常",4:"失败"};
  public static payTradeType={1:"APP",2:"公共号",3:"扫码",91:"转账",1311:"网银",1376:"快捷"};
  public static refundStatus={0:"无",1:"等待",2:"成功",3:"失败"};
  public static withdrawStatus={0:'初始',1:'进行中',2:'成功',3:'失败',4:"退汇",5:"回冲"};
  public static settlementStatus={0:'发起',1:'进行中',2:'结束',3:'拒绝',4:'取消',5:'已提现'};
  public static auditResultStatus={true:'通过',false:'拒绝'};
  public static accountType={11:'个人',12:'企业'};
  public static cpcnSettlementStatus={10:'已经受理',30:'正在结算',40:'已经转账',50:'转账退回'};
  public static bankCode={100:'邮储银行',102:'工商银行',103:'农业银行',104:'中国银行',105:'建设银行',
      301:'交通银行',302:'中信银行',303:'广大银行',304:'华夏银行',305:'民生银行',306:'广发银行',
      307:'平安银行',308:'招商银行',309:'兴业银行',310:'浦发银行',311:'恒丰银行',316:'浙商银行'
  };
  public static driverGradeName={1:'普通骑士',2:'铁面骑士',3:'青铜骑士',4:'白银骑士',5:'黄金骑士',6:'圣骑士',7:'神佑骑士'};
  public static ownerGradeName={1:'普通会员',2:'铁牌会员',3:'铜牌会员',4:'银牌会员',5:'金牌会员',6:'铂金会员',7:'钻石会员'};
}
