import {get,post} from '@/utils/request'

export const apiAddress = (params) => get('https://vue-js.com/api/v1/topics', params);
//组织展示
export const AJuDeps=(params)=>get('/AJuDeps',params);
//组织架构部门人员
export const staffList=(data)=>post('/AJuDeps',data);
//创建部门获取角色
export const AJuDepC=(params)=>get('/AJuDepC',params);
//创建部门
export const create=(data)=>post('/AJuDepC',data);
export const AUsRegs=(params)=>get('/AUsRegs',params)  //邀请成员获取邀请链接
export const getARegi=(params)=>get('/ARegi',params)  //注册页面请求数据接口
export const ARegi=(data)=>post('/ARegi',data)  //用户注册接口
//删除部门
export const AJuDepCDe=(data)=>post('/AJuDepCDe',data);
//编辑部门
export const AJuDepCUp=(data)=>post('/AJuDepCUp',data);
//修改身份账号
export const AJuRolsUp=(data)=>post('/AJuRolsUp',data);
/** 权限组接口 */
export const ARoLi=(params)=>get('/ARoLi',params)   //权限组角色列表
export const ARoRuLi=(params)=>get('/ARoRuLi',params)  //获取创建权限组结构列表
export const PostARoRuLi=(data)=>post('/ARoRuLi',data) //创建权限组接口
export const EditAroRuLi=(params)=>get('/ARoRuPdLi',params)  //设置权限组获取权限列表
export const EditAJuRuLiUp=(params)=>post('/AJuRuLiUp',params) //修改权限组权限
export const DelAroRuDel=(data)=>post('/ARoRuDel',data)    //删除权限组
/** 权限模块接口*/
export const getPerlist=(params)=>get('/ARuLi',params)  //获取权限列表
export const SARuCrLi=(params)=>get('/ARuCrLi',params)  //获取权限增加父级接口地址
export const AddARuCrLi=(data)=>post('/ARuCrLi',data) //权限添加接口
export const SearchARuCrUp=(params)=>get('/ARuCrUp',params) //查看单个权限信息
export const EditARuCrUp=(data)=>post('/ARuCrUp',data) //权限修改
export const DelARuDe=(data)=>post('/ARuDe',data)   //删除权限
export const Filetool=(data)=>post('/Filetool',data)  //权限图片上传
/**集团接口 */
export const BlocList=(params)=>get('/Cy',params)  //获取集团列表
export const AddBloc=(data)=>post('/Cy',data)  //新增集团
export const BlocInfo=(params)=>get('/CyInfo',params) //集团详情
export const EditBlocBase=(data)=>post('/CyBase',data) //修改集团基本信息
export const EditBlocImpor=(data)=>post('/CyImpor',data) //修改集团重要信息
export const pagehole=(params)=>get('/CyKeep',params) //归档集团
export const DelBloc=(params)=>get('/CyDel',params)   //删除集团
/**业态接口 */
export const FormatList=(params)=>get('/InState',params) //获取业态列表
export const InState=(data)=>post('/InState',data) //创建业态
export const deleteInState=(params)=>get('/InStateDel',params)//删除业态
export const GoodsIns=(data)=>post('/GoodsIns',data)//业态产品设置保存
/**产品接口 */
export const GoodsList=(params)=>get('/Goods',params)  //获取产品列表
export const GoodIns=(params)=>get('/GoodsIns',params) //业态下产品列表
/** 门店接口 */
export const Storelist=(params)=>get('/Site',params)  //获取门店列表
export const Storeinfo=(params)=>get('/SiteInfo',params)  //获取门店详细信息
export const StoreAddEdit=(data)=>post('/Site',data)    //门店新增修改
