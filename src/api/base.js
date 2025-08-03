/**
 * 存放所有的API接口地址
 */

const base = {
    baseURL:'http://localhost:5000',        //服务器地址
    login:'/user/login/',                   //登录地址
    test_response:'/user/test/',            //测试response的拦截器是否好用
    get_menu:'/menu/menus/?type_=tree',      //获取菜单,以树形结构返回
    get_menu_list:'/menu/menus/',           //获取菜单,以列表结构返回
    get_users:'/user/users/',                //获取用户列表
    get_user_by_id:'/user/user/',           //根据id获取用户信息
    edit_user:'/user/user/',                //编辑用户信息
    delete_user:'/user/user/',              //删除用户
    rest_user_password:'/user/reset_pwd/', //重置用户密码
    get_roles:'/roles/',                    //获取角色列表
    del_role_menu:'/role/',                 //删除角色菜单
    set_menu:'/role/',                      //设置角色菜单
    get_category:'/categorys/',              //获取分类列表
    add_category:'/categorys/',              //添加分类
    get_attr_by_category:'/attributes/',      //根据分类获取属性
    add_attr:'/attributes/',                 //添加属性
    update_attr_value:'/attribute/',            //更新属性值
    get_product_list:'/products/',            //获取商品列表
    delete_product:'/product/',               //删除商品
    upload_img:'/upload_img/',                //上传图片
    add_product:'/products/',                 //添加商品
    get_orders:'/orders/',                    //获取订单列表
    get_express:'/expresses/',                //获取物流信息
    get_cate_group:'/cate_grup/',             //获取分类组
}
export default base