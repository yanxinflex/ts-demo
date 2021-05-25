import request from "@/utils/request";
export default {
  list(params: any): any {
    return request({
      url: "/user/list",
      method: "get",
      params,
    });
  },
  add(data: any): any {
    return request({
      url: "/user/add",
      method: "post",
      data,
    });
  },
  update(data: any): any {
    return request({
      url: "/user/update",
      method: "post",
      data,
    });
  },
  del(params: any): any {
    return request({
      url: "/user/del",
      method: "get",
      params,
    });
  },
};
