/**
 * Created by xujianke on 2017/6/14.
 */
import {environment} from '../../environments/environment';
export class Api {
  //用户注册
  //public static register = environment.apiHost + "/user-service/owner/user/register";
  public static getOrderInfoLocationList = environment.apiHost + "/test-service/test/info/getOrderInfoLocationList";
  public static adminList = environment.apiHost + "/manage-service/admin/findList";
  public static adminAll = environment.apiHost + "/manage-service/admin/findAll";
  //创建管理员
  public static adminSave = environment.apiHost + "/manage-service/admin/save";
  //修改管理员信息
  public static adminUpdate = environment.apiHost + "/manage-service/admin/update";
  //检测管理员账号是否可用
  public static adminCheckUname = environment.apiHost + "/manage-service/admin/checkUname";
  //根据ID查询用户信息
  public static adminFindById = environment.apiHost + "/manage-service/admin/findById";
  //修改用户状态
  public static adminUpdateStatus = environment.apiHost + "/manage-service/admin/updateStatus";
  //登陆
  public static adminLogin = environment.apiHost + "/manage-service/admin/login";
  //使用登录信息中的角色ID查询菜单接口权限
  public static adminFindMenu = environment.apiHost + "/manage-service/admin/findMenu";
  //查看个人信息
  public static adminMyself = environment.apiHost + "/manage-service/admin/myself";
  //修改个人信息
  public static adminUpdateMyself = environment.apiHost + "/manage-service/admin/updateMyself";
  //保存角色
  public static roleSave = environment.apiHost + "/manage-service/role/save";
  //查询全部角色
  public static roleFindAll = environment.apiHost + "/manage-service/role/findAll";
  //删除角色
  public static roleRemoveById = environment.apiHost + "/manage-service/role/removeById";
  //查询角色菜单接口ID
  public static roleFindMenuIds = environment.apiHost + "/manage-service/role/findMenuIds";
  //修改角色菜单权限
  public static roleUpdateRoleMenu = environment.apiHost + "/manage-service/role/updateRoleMenu";
  //保存部门
  public static departmentSave = environment.apiHost + "/manage-service/department/save";
  //查询全部部门
  public static departmentFindAll = environment.apiHost + "/manage-service/department/findAll";
  //删除部门
  public static departmentRemoveById = environment.apiHost + "/manage-service/department/removeById";

  //保存菜单
  public static menuSave = environment.apiHost + "/manage-service/menu/save";
  //查询全部菜单
  public static menuFindAll = environment.apiHost + "/manage-service/menu/findAll";
  //删除菜单
  public static menuRemoveById = environment.apiHost + "/manage-service/menu/removeById";
  //查询充值记录
  public static rechargeList = environment.apiHost + "/manage-service/recharage/findList";
  //银行卡充值
  public static rechargeSave = environment.apiHost + "/manage-service/recharage/save";
  //查询充值详情
  public static rechargeFindById = environment.apiHost + "/manage-service/recharage/findById";
  //中金快捷支付充值状态同步
  public static rechargeFasterPaySync = environment.apiHost + "/manage-service/recharage/cpcnFasterPaySync";
  //查询提现记录
  public static withdrawList = environment.apiHost + "/manage-service/withdrawDeposit/findList";
  //查询提现详情
  public static withdrawFindById = environment.apiHost + "/manage-service/withdrawDeposit/findById";
  //同步提现记录
  public static withdrawettlementSync = environment.apiHost + "/manage-service/withdrawDeposit/settlementSync";
  //提现记录标记退汇
  public static withdrawettlementSendBack = environment.apiHost + "/manage-service/withdrawDeposit/sendBack";
  //中金支付结算查询
  public static withdrawettlementQuery = environment.apiHost + "/manage-service/withdrawDeposit/settlementQuery";
  //查询redis值
  public static redisGet = environment.apiHost + "/manage-service/redis/get";
  //保存提现申请
  public static withDrawApplicationSave = environment.apiHost + "/manage-service/withDrawApplication/save";
  //查看待提现审核列表
  public static withDrawApplicationListForAudit = environment.apiHost + "/manage-service/withDrawApplication/listForAudit";
  //审核提现申请
  public static withDrawApplicationAudit = environment.apiHost + "/manage-service/withDrawApplication/audit";
  //查看提现审核历史记录
  public static withdrawAuditLogList = environment.apiHost + "/manage-service/withdrawAuditLog/list";
  //查询审核流程
  public static wauditProcesslistNode = environment.apiHost + "/manage-service/auditProcess/listNode";
  //执行提现
  public static withDrawApplicationSettlement = environment.apiHost + "/manage-service/withDrawApplication/settlement";
  //撤回提现申请
  public static withDrawApplicationCancel = environment.apiHost + "/manage-service/withDrawApplication/cancel";
  //查看提现申请列表
  public static withDrawApplicationList = environment.apiHost + "/manage-service/withDrawApplication/list";
  //充值手续费列表
  public static cpcnFeeRechargeList = environment.apiHost + "/manage-service/cpcnFee/findRecharge";
  //绑定快捷支付手续费列表
  public static cpcnFeeBidingList = environment.apiHost + "/manage-service/cpcnFee/findBinding";
  //提现手续费列表
  public static cpcnFeeSettlementList = environment.apiHost + "/manage-service/cpcnFee/findSettlement";
  //银行卡列表
  public static bankCardList = environment.apiHost + "/manage-service/bankCard/findList";
  //保存银行卡
  public static bankCardSave = environment.apiHost + "/manage-service/bankCard/save";

  //司机的列表查询
  public static driverInfoList = environment.apiHost + "/manage-service/driverInfo/list";
  //货主的列表查询
  public static ownerInfoList = environment.apiHost + "/manage-service/ownerInfo/list";
  //车辆的列表查询
  public static truckInfoList = environment.apiHost + "/manage-service/truckInfo/list";
  //货主入驻的列表查询
  public static ownerAuthInfoList = environment.apiHost + "/manage-service/ownerAuthInfo/list?type=1";
  public static ownerCompanyAuthInfoList = environment.apiHost + "/manage-service/ownerAuthInfo/list?type=2";
  public static driverAuthInfoList = environment.apiHost + "/manage-service/driverAuthInfo/list";
  public static driverLicenceInfoList = environment.apiHost + "/manage-service/driverLicenceInfo/list";
  //根据ID查询用户信息
  public static getDriverInfoByDriverId = environment.apiHost + "/manage-service/driverInfo/getDriverUserById";
  //获取司机星级
  public static DriverStarById= environment.apiHost + "/manage-service/driverInfo/getDriverInfoById";
  //修改司机星级
  public static DriverStarUpdate= environment.apiHost + "/manage-service/driverInfo/updateStar";
  //获取货主星级
  public static OwnerStarById= environment.apiHost + "/manage-service/ownerInfo/getOwnerInfoById";
  //修改货主星级
  public static OwnerStarUpdate= environment.apiHost + "/manage-service/ownerInfo/updateStar";

  //删除车辆
  public static deleteTruck = environment.apiHost + "/manage-service/truckInfo/deleteTruck";
  //检查司机信息
  public static checkMobile1 = environment.apiHost + "/manage-service/driverInfo/checkMobile";
  //添加司机
  public static truckAddDriver = environment.apiHost + "/manage-service/truckInfo/truckAddDriver";
  //移除司机
  public static truckDelDriver = environment.apiHost + "/manage-service/truckInfo/truckDelDriver";
  //根据ID查询用户信息
  public static getOwnerInfoByOwnerId = environment.apiHost + "/manage-service/ownerInfo/getOwnerUserById";
  //根据ID查询车辆信息
  public static getTruckById = environment.apiHost + "/manage-service/truckInfo/getTruckById";
  //根据ID查询车辆信息
  public static getTruckDTOById = environment.apiHost + "/manage-service/truckInfo/getTruckDTOById";
  //获取货主的评价信息
  public static getOwnerEvaluateByUserId = environment.apiHost + "/manage-service/evaluate/getOwnerEvaluateByUserId";
  //获取货主的评价信息
  public static getDriverEvaluateByUserId = environment.apiHost + "/manage-service/evaluate/getDriverEvaluateByUserId";
  //审核接口
  public static authUpdate = environment.apiHost + "/manage-service/admin/auth/userAuth";
  //司机过滤列表查询
  public static listDriverInfo = environment.apiHost + "/manage-service/driverInfo/listDriverInfo";
  //货主过滤列表查询
  public static listOwnerInfo = environment.apiHost + "/manage-service/ownerInfo/listOwnerInfo";
  //车辆过滤列表查询
  public static listTruckInfo = environment.apiHost + "/manage-service/truckInfo/listTruckInfo";
  //根据车牌号查询是否有车辆已经提交过审核
  public static getTruckInfoListByTruckNo = environment.apiHost + "/manage-service/admin/auth/getTruckInfoListByTruckNo";
  //货主审核过滤列表查询
  public static listOwnerAuth = environment.apiHost + "/manage-service/ownerAuthInfo/listOwnerAuth";
  //司机审核过滤列表查询
  public static listDriverAuth = environment.apiHost + "/manage-service/driverAuthInfo/listDriverAuth";
  //司机审核过滤列表查询
  public static listLicenceAuth = environment.apiHost + "/manage-service/driverLicenceInfo/listLicenceAuth";
  //字典项列表
  public static listSystemDictionaries = environment.apiHost + "/manage-service/systemDictionaries/list";
  //增加字典项
  public static saveSystemDictionaries = environment.apiHost + "/manage-service/systemDictionaries/save";
  //删除字典项
  public static deleteSystemDictionaries = environment.apiHost + "/manage-service/systemDictionaries/delete";
  //修改字典项
  public static updateSystemDictionaries = environment.apiHost + "/manage-service/systemDictionaries/update";
  //根据id查询
  public static getSystemDictionariesById = environment.apiHost + "/manage-service/systemDictionaries/getSystemDictionariesById";
  //版本升级列表
  public static listVersionControl = environment.apiHost + "/manage-service/systemVersionControl/list";
  //新增版本升级
  public static saveVersionControl = environment.apiHost + "/manage-service/systemVersionControl/save";
  //修改版本升级内容
  public static updateVersionControl = environment.apiHost + "/manage-service/systemVersionControl/update";
  //根据id查询
  public static getSystemVersionById = environment.apiHost + "/manage-service/systemVersionControl/getSystemVersionById";
  //交易列表
  public static listOrderTrade = environment.apiHost + "/manage-service/payment/list";
  //根据支付情况修改订单状态
  public static updateOrderStatus = environment.apiHost + "/manage-service/payment/updateOrderStatus";
  //导出司机信息
  public static EXPORT_DRIVER_USER = environment.apiHost + "/manage-service/driverInfo/driverUser/export";
  //导出车辆信息
  public static EXPORT_TRUCK = environment.apiHost + "/manage-service/truckInfo/export";
  //导出货主信息
  public static EXPORT_OWNER_USER = environment.apiHost + "/manage-service/ownerInfo/ownerUser/export";





  /**->->->->->->->->->->->->->->->->->->->->->->->订单管理相关接口开始->->->->->->->->->->->->->->->->->->->->->->->*/
  // 子订单列表
  public static LIST_ORDER_CHILD = environment.apiHost + "/manage-service/child/list";
  //子订单日志列表
  public static LIST_ORDER_CHILD_LOG = environment.apiHost + "/manage-service/orderChildLog/list";
  // 货源列表
  public static LIST_ORDER_INFO = environment.apiHost + "/manage-service/orderInfo/list";
  //查询联系人/质检员
  public static list = environment.apiHost + "/manage-service/address/ownerAddressContacts/list";
  // 货源列表(和mongo不同的货源)
  public static LIST_ORDER_MONGO = environment.apiHost + "/manage-service/orderInfo/listCompleteOrderInfo";
  // 同步mongo的接口
  public static MONGO_SYNC = environment.apiHost + "/manage-service/orderInfo/syncMongo";
  // 一键取消的接口
  public static COMPLETE_ORDER = environment.apiHost + "/manage-service/child/completeOrder";
  // 修改订单状态接口
  public static UPDATE_STATUS = environment.apiHost + "/manage-service/child/updateOrderStatusToCancel";
  // 查看货源详情
  public static GET_ORDER_INFO = environment.apiHost + "/manage-service/orderInfo/get";
  // 查看子订单相关的图片列表
  public static LIST_ORDER_CHILD_IMAGE = environment.apiHost + "/manage-service/childImage/list";
  //导出报表
  public static  STATISTICS = environment.apiHost + "/manage-service/statistics/orderChild/excel";
  //查看扣款项列表
  public static LIST_ORDER_CHILD_COMPENSATION = environment.apiHost + "/manage-service/orderChildCompensation/list";
  //一键取消货源
  public static CANCEL_ORDER = environment.apiHost + "/manage-service/orderInfo/cancel";
/**===========================================订单管理相关接口结束===========================================*/






  /**->->->->->->->->->->->->->->->->->->->->->->->司机取消订单赔偿规则相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  // 司机取消订单赔偿规则列表
  public static LIST_ORDER_CHILD_DRIVER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildDriverCancelRule/list";
  // 删除司机取消订单赔偿规则
  public static DELETE_ORDER_CHILD_DRIVER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildDriverCancelRule/delete";
  // 保存司机取消订单赔偿规则
  public static CREATE_ORDER_CHILD_DRIVER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildDriverCancelRule/save";
  // 修改司机取消订单赔偿规则
  public static UPDATE_ORDER_CHILD_DRIVER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildDriverCancelRule/update";
  /**==============================================司机取消订单赔偿规则相关接口结束===========================================*/


   /**->->->->->->->->->->->->->->->->->->->->->->->货主取消订单规则相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
   // 货主取消订单规则列表
  public static LIST_ORDER_CHILD_OWNER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildOwnerCancelRule/list";
  //修改货主取消订单规则
  public static UPDATE_ORDER_CHILD_OWNER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildOwnerCancelRule/update";
  //删除货主取消订单规则
  public static DELETE_ORDER_CHILD_OWNER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildOwnerCancelRule/delete";
  //保存货主取消订单规则
  public static CREATE_ORDER_CHILD_OWNER_CANCEL_RULE = environment.apiHost + "/manage-service/orderChildOwnerCancelRule/save";
  /**==============================================货主取消订单赔偿规则相关接口结束===========================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->系统消息相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //系统消息列表
  public static LIST_SYSTEM_MESSAGE = environment.apiHost + "/manage-service/message/systemMessage/list";
  //保存系统消息
  public static SAVE_SYSTEM_MESSAGE = environment.apiHost + "/manage-service/message/systemMessage/save";
  // 修改系统消息
  public static UPDATE_SYSTEM_MESSAGE = environment.apiHost + "/manage-service/message/systemMessage/update";
  /**===============================================系统消息相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->黑名单相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //黑名单列表
  public static LIST_BLACK_MOBILE = environment.apiHost + "/manage-service/blackList/list";
  //添加到黑名单
  public static SAVE_BLACK_MOBILE = environment.apiHost + "/manage-service/blackList/add";
  //从黑名单删除
  public static DELETE_BLACK_MOBILE = environment.apiHost + "/manage-service/blackList/delete";
  /**===============================================黑名单相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->白名单相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //白名单列表
  public static LIST_WHITE_MOBILE = environment.apiHost + "/manage-service/whiteList/list";
  //添加到白名单
  public static SAVE_WHITE_MOBILE = environment.apiHost + "/manage-service/whiteList/add";
  //从白名单删除
  public static DELETE_WHITE_MOBILE = environment.apiHost + "/manage-service/whiteList/delete";
  /**===============================================白名单相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->短信模板相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //短信模板列表
  public static LIST_SMS_TEMPLATE = environment.apiHost + "/manage-service/smsTemplate/list";
  //保存短信模板
  public static SAVE_SMS_TEMPLATE = environment.apiHost + "/manage-service/smsTemplate/save";
  //修改短信模板
  public static UPDATE_SMS_TEMPLATE = environment.apiHost + "/manage-service/smsTemplate/update";
  //删除短信模板
  public static DELETE_SMS_TEMPLATE = environment.apiHost + "/manage-service/smsTemplate/delete";
  /**===============================================短信模板相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->日志相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //日志列表
  public static LIST_LOG = environment.apiHost + "/manage-service/systemLog/list";
  /**===============================================日志相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->Banner相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //banner列表
  public static LIST_BANNER = environment.apiHost + "/manage-service/banner/list";
  //修改banner
  public static UPDATE_BANNER = environment.apiHost + "/manage-service/banner/update";
  //保存banner
  public static SAVE_BANNER = environment.apiHost + "/manage-service/banner/save";
  //删除banner
  public static DELETE_BANNER = environment.apiHost + "/manage-service/banner/delete";
  /**===============================================Banner相关接口结束=============================================*/

  /**->->->->->->->->->->->->->->->->->->->->->->->上传图片相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //上传图片
  public static UPLOAD_FILE = environment.apiHost + "/manage-service/file/image";
  /**===============================================上传图片相关接口结束=============================================*/


  /**->->->->->->->->->->->->->->->->->->->->->->->担保费规则相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //担保费规则列表
  public static LIST_ORDER_INSURANCE_FEE_RULE = environment.apiHost + "/manage-service/orderInsuranceFeeRule/list";
  //保存担保费规则
  public static SAVE_ORDER_INSURANCE_FEE_RULE = environment.apiHost + "/manage-service/orderInsuranceFeeRule/save";
  //修改担保费规则
  public static UPDATE_ORDER_INSURANCE_FEE_RULE = environment.apiHost + "/manage-service/orderInsuranceFeeRule/update";
  //删除担保费规则
  public static DELETE_ORDER_INSURANCE_FEE_RULE = environment.apiHost + "/manage-service/orderInsuranceFeeRule/delete";
  /**===============================================担保费规则相关接口结束=============================================*/


  /**->->->->->->->->->->->->->->->->->->->->->->->轨迹跟踪相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
  //查询稀疏点
  public static LIST_SPARSE_POINT_RECORDS = environment.apiHost + "/manage-service/sparsePointRecords/list";
  //查询原始点
  public static LIST_POINT_RECORDS = environment.apiHost + "/manage-service/pointRecords/list";
  /**===============================================轨迹跟踪规则相关接口结束=============================================*/

    //2017-11-9 新增
    //货主管理-货主的所有地址
  public static Address_list = environment.apiHost + "/manage-service/address/ownerAddress/list";
  ///货主管理-货主某一地址信息
  public static Address_Info_Id = environment.apiHost + "/manage-service/address/ownerAddress";
// 获取地址联系人
  public static Address_Contacts = environment.apiHost + "/manage-service/address/ownerAddressContacts/list";

// 货主个人信息
  public  static  OwnerDetailById=  environment.apiHost + "/manage-service/ownerInfo/getOwnerDetailById";
//货主黑名单
  public static OwnerBlack= environment.apiHost + "/manage-service/ownerInfo/ownerBlack";
//manage-service/ownerInfo/checkMobile
  public  static OwercheckMobile= environment.apiHost + "/manage-service/ownerInfo/checkMobile";
//添加地址联系人
  public static AddaddressContact= environment.apiHost + "/manage-service/address/ownerAddressContacts/add";
//DELETE /manage-service/address/ownerAddressContacts/delete
  public static DeladdressContact= environment.apiHost + "/manage-service/address/ownerAddressContacts/delete";
//PUT /manage-service/address/ownerAddressContacts/setMain
  public static AddreContactsetMain= environment.apiHost + "/manage-service/address/ownerAddressContacts/setMain";

  /**->->->->->->->->->->->->->->->->->->->->->->->费率和星级相关接口开始->->->->->->->->->->->->->->->->->->->->->->->**/
    //获取司机的费率和星级列表
  public static LIST_DRIVER_STAR_RATE = environment.apiHost + "/manage-service/driver/rate/list";
  //  获取货主费率
  public static LIST_OWNER_STAR_RATE = environment.apiHost + "/manage-service/owner/rate/list";
  //司机根据id查询
  public static getRateDirverById = environment.apiHost + "/manage-service/driver/rate/getDriverStarRateById";
  //增加司机费率和星级的对应关系
  public static saveRateDirver = environment.apiHost + "/manage-service/driver/rate/save";
  //修改司机费率
  public static updateRateDirver = environment.apiHost + "/manage-service/driver/rate/update";
  //货主根据id查询
  public static getRateOwnerById = environment.apiHost + "/manage-service/owner/rate/getOwnerStarRateById";
  //增加货主费率和星级的对应关系
  public static saveRateOwner = environment.apiHost + "/manage-service/owner/rate/save";
  //修改货主费率
  public static updateRateOwner = environment.apiHost + "/manage-service/owner/rate/update";
//  修改车辆载重
  public static updateTruckLoad = environment.apiHost + "/manage-service/truckInfo/updateTruckLoad";
  //  修改子单车辆载重
  public static updatechildTruckLoad = environment.apiHost + "/manage-service/child/updateTruckLoad";

  /**->->->->->->->->->->->->->->->->->->->->->->->会员俱乐部->->->->->->->->->->->->->->->->->->->->->->->**/
  /**
   * 等级权益列表
   * */
  public static LIST_DRIVER_GRADE = environment.apiHost + "/manage-service/driver/grade/list";
  //增加司机等级权益
  public static saveDriverGrade = environment.apiHost + "/manage-service/driver/grade/save";
  //修改司机等级权益
  public static updateDriverGrade = environment.apiHost + "/manage-service/driver/grade/update";
  //删除司机等级权益
  public static deleteDriverGrade = environment.apiHost + "/manage-service/driver/grade/delete";
  //根据id查询
  public static getDriverUserGradeById = environment.apiHost + "/manage-service/driver/grade/getDriverUserGradeById";
  //货主等级权益列表
  public static LIST_OWNER_GRADE = environment.apiHost + "/manage-service/owner/grade/list";
  //增加货主等级权益
  public static saveOwnerGrade = environment.apiHost + "/manage-service/owner/grade/save";
  //修改货主等级权益
  public static updateOwnerGrade = environment.apiHost + "/manage-service/owner/grade/update";
  //根据货主id查询
  public static getOwnerUserGradeById = environment.apiHost + "/manage-service/owner/grade/getOwnerUserGradeById";
   //删除等级权益（只能删除最大的等级权益）
  public static OwnerUserGradeDel = environment.apiHost + "/manage-service/owner/grade/delete";

  /**
 * 成长值配置
 */
  //司机成长值获取规则
  public static driverExpList = environment.apiHost + "/manage-service/driverExpConfig/list";
  //货主成长值获取规则
  public static ownerExpList = environment.apiHost + "/manage-service/ownerExpConfig/list";
  //司机成长值配置项
  public static driverExpConfig = environment.apiHost + "/manage-service/driverExpConfig/save";
  //货主成长值配置项
  public static ownerExpConfig = environment.apiHost + "/manage-service/ownerExpConfig/save";
  //删除司机成长值配置
  public static driverExpDelete = environment.apiHost + "/manage-service/driverExpConfig/delete";
  //删除货主成长值配置
  public static ownerExpDelete = environment.apiHost + "/manage-service/ownerExpConfig/delete";

 /**
  * 客服赠送成长值
  */
  //获取司机成长值
  public static driverInfoquery = environment.apiHost + "/manage-service/driverInfo/query";
  //获取货主成长值
  public static ownerInfoquery = environment.apiHost + "/manage-service/ownerInfo/query";
  // 保存司机的成长值
  public static savedriverExpLog = environment.apiHost + "/manage-service/driverExpLog/save";
  // 保存司机的成长值
  public static saveownerExpLog = environment.apiHost + "/manage-service/ownerExpLog/save";
  // 货主成长值记录
  public static ownerExpLoglist = environment.apiHost + "/manage-service/ownerExpLog/list";
  // 司机成长值记录
  public static driverExpLoglist = environment.apiHost + "/manage-service/driverExpLog/list";
  //修改用户费率
  public static updateHasReturnFeeByUserId= environment.apiHost + "/manage-service/ownerInfo/updateHasReturnFeeByUserId";

  //标准地址查询
  public static getSystemOwnerAddressList = environment.apiHost + "/manage-service/system/ownerAddress/getSystemOwnerAddressList"
  //添加标准地址
  public static saveSystemOwnerAddress = environment.apiHost + "/manage-service/system/ownerAddress/save"
  //修改标准地址
  public static editSystemOwnerAddress = environment.apiHost + "/manage-service/system/ownerAddress/update"
  //获取每个省的下拉列表
  public static getProvinceList = "http://clx-dev.oss-cn-beijing.aliyuncs.com/province/";
  //删除标准地址
  public static deleteSystemOwnerAddressById = environment.apiHost + "/manage-service/system/ownerAddress/deleteSystemOwnerAddressById"


//  大客户列表
  public static VipList = environment.apiHost + "/manage-service/vip/list";
//  添加大客户
  public static VipSave = environment.apiHost + "/manage-service/vip/save";
//  修改大客户
  public static VipUpdate = environment.apiHost + "/manage-service/vip/update";
}
