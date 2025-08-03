import axios from "../utils/requests.js";       //引入封装好的axios
import base from "./base.js";                   //引入接口列表

const api = {
    /**
     * 登录功能
    */
    login(params) {
        return axios.post(base.baseURL+base.login, params)
    },
    test_response(params) {
        return axios.get(base.baseURL+base.test_response, params)
    },
    get_menu(params) {
        return axios.get(base.baseURL+base.get_menu, params)
    },
    get_menu_list(params) {
        return axios.get(base.baseURL+base.get_menu_list, params)
    },
    get_user_list(params) {
        return axios.get(base.baseURL+base.get_users, params)
    },
    add_user(params){
        return axios.post(base.baseURL+base.get_users, params)
    },
    get_user_by_id(id){
        return axios.get(base.baseURL+base.get_user_by_id+id+'/')
    },
    edit_user(id, params){
        return axios.put(base.baseURL+base.edit_user+id+'/', params)
    },
    delete_user(id){
        return axios.delete(base.baseURL+base.delete_user+id+'/')
    },
    reset_user_password(id){
        return axios.get(base.baseURL+base.rest_user_password+id+'/')
    },
    get_roles(params){
        return axios.get(base.baseURL+base.get_roles, params)
    },
    del_role_menu(rid,mid){
        return axios.get(base.baseURL+base.del_role_menu+rid+'/'+mid+'/')
    },
    set_menu(rid, params){
        return axios.post(base.baseURL+base.set_menu+rid+'/', params)
    },
    get_category(level){
        return axios.get(base.baseURL+base.get_category+'?level='+level)
    },
    add_category(params){
        return axios.post(base.baseURL+base.add_category, params)
    },
    get_attr_by_category(cid,_type){
        return axios.get(base.baseURL+base.get_attr_by_category+'?cid='+cid+'&_type='+_type)
    },
    add_attribute (params){
        return axios.post(base.baseURL+base.add_attr, params)
    },
    update_attr_value(id, params){
        return axios.put(base.baseURL+base.update_attr_value+id+'/', params)
    },
    get_product_list(name){
        if(name){
            return axios.get(base.baseURL+base.get_product_list+'?name='+name)
        }else{
            return axios.get(base.baseURL+base.get_product_list)
        }
    },
    delete_product(id){
        return axios.delete(base.baseURL+base.delete_product+id+'/')
    },
    add_product(params){
        return axios.post(base.baseURL+base.add_product, params)
    },
    get_orders(params){
        return axios.get(base.baseURL+base.get_orders, params)
    },
    get_express(id){
        return axios.get(base.baseURL+base.get_express+id+'/')
    },
    get_category_group(){
        return axios.get(base.baseURL+base.get_cate_group)
    }
}

export default api