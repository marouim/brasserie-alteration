import axios from "axios";

const api = {
  baseUrl: "/api/v2",

  getHosts() {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/hosts",
      auth: {
        username: 'admin',
        password: 'kvjjL5I4Nd3COLAYrZ0FZcdfT9LR6dDc'
      }
    });
  },

  getHostsInGroup(groupId) {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/groups/" + groupId + "/hosts",
      auth: {
        username: 'admin',
        password: 'kvjjL5I4Nd3COLAYrZ0FZcdfT9LR6dDc'
      }
    });
  },

  getGroups(inventoryId) {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/groups?inventory=" + inventoryId,
      auth: {
        username: 'admin',
        password: 'kvjjL5I4Nd3COLAYrZ0FZcdfT9LR6dDc'
      }
    });
  },

  getJobTemplates(labelId) {
    return axios({
      method: "GET",
      baseURL: this.baseUrl,
      url: "/job_templates?labels=" + labelId,
      auth: {
        username: 'admin',
        password: 'kvjjL5I4Nd3COLAYrZ0FZcdfT9LR6dDc'
      }
    });
  }

};

export default api;
