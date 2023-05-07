const prefix = "/";
export default class RouterPath
{
    static HOME = prefix + '';
    static LOGIN = '/login';
    static LIST = '/nhacungcap/danhsach';
    static DETAIL = '/nhacungcap/danhsach/chitiet/:id';
    static ADD = '/nhacungcap/danhsach/them';
    static EDIT = '/nhacungcap/danhsach/sua/:id';
    // static PRODUCTS = '/products';
    // static CATE_HOME = '/home/cate';
    static getRouteWithId(path, id)
    {
        return path.replace(":id", id)
    }
}