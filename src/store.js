import Vue from "vue";
import Vuex from "vuex";
import ansibleApi from "./api/ansibleApi";
const yaml = require('js-yaml');

Vue.use(Vuex);

const INVENTORY_ID = 5;

const READ_HOSTS_OK = "READ_HOSTS_OK";
const READ_HOSTS_FAILED = "READ_HOSTS_FAILED";
const READ_GROUPS_OK = "READ_GROUPS_OK";
const READ_TREE_OK = "READ_TREE_OK"

const state = {
  hosts: [],
  groups: [],
  tree: [],
  ansibleCommunicationError: false
};

const mutations = {
  [READ_HOSTS_OK](state, data) {
    state.hosts = data;
    state.ansibleCommunicationError = false;
  },

  [READ_HOSTS_FAILED](state) {
    state.ansibleCommunicationError = true;
  },

  [READ_GROUPS_OK](state, data) {
    state.groups = data;
    state.ansibleCommunicationError = false;
  },

  [READ_TREE_OK](state, data) {
    state.tree.push(data);
    state.ansibleCommunicationError = false;
  }
};

const actions = {
  getHosts({ commit }) {
    ansibleApi.getHosts().then((response) => {
      commit(READ_HOSTS_OK, response.data);
    });
  },

  getGroups({ commit }) {
    ansibleApi.getGroups(INVENTORY_ID).then((response) => {
      commit(READ_GROUPS_OK, response.data);
    });
  },

  getTree({ commit }) {
    ansibleApi.getGroups(INVENTORY_ID).then((groups) => {

      groups.data.results.forEach(group => {
        ansibleApi.getHostsInGroup(group.id).then((hosts) => {
          group.vars = yaml.load(group.variables);

          hosts.data.results.forEach(h => {
            h.vars = yaml.load(h.variables);

            ansibleApi.getJobTemplates(1).then((actions => {
              h.actions = actions.data.results
            }))
          })
          
          commit(READ_TREE_OK, {
            "group": group,
            "hosts": hosts.data.results
          });
        })
      })
    });
  },

  // sendIntegrationsMessage({ commit }, message) {
  //   integrationsApi.postIntegrationsMessage(message).then(() => {
  //     commit(POST_INTEGRATIONS_MESSAGES_SUCCESSFUL);
  //   })
  // }

};

const getters = {
  hosts() {
    return state.hosts;
  },

  groups() {
    return state.groups;
  },

  tree() {
    return state.tree;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
