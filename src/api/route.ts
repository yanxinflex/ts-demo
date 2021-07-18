import request from "@/utils/request";
export default {
  list(params: any): any {
    return request({
      url: "/route/list",
      method: "get",
      params,
    });
  },
  add(data: any): any {
    return request({
      url: "/route/add",
      method: "post",
      data,
    });
  },
  update(data: any): any {
    return request({
      url: "/route/update",
      method: "post",
      data,
    });
  },
  del(params: any): any {
    return request({
      url: "/route/del",
      method: "get",
      params,
    });
  },
};
