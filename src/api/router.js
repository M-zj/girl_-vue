import request from "@/utils/request";
import { tokenName } from "@/config/settings";

export function getRouterList(accessToken) {
  return request({
    url: "/menu/navigate",
    method: "post",
    data: {
      [tokenName]: accessToken,
    },
  });
}
