<template>
  <v-container>
    <v-label>Store list </v-label>


    <v-expansion-panels>
      <v-expansion-panel
        v-for="(t,i) in tree"
        :key="i"
        >

        <v-expansion-panel-header>
          <v-card flat>
            <v-card-title>{{ t.group.name }}-{{ t.group.vars.storeName }}</v-card-title>
            <v-card-subtitle>{{ t.group.vars.storeAddress }}</v-card-subtitle>
          </v-card>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-list >
            <template v-for="(host,i) in t.hosts">
              <v-list-item :key="i" v-on:click="t()">
                <v-list-item-icon>
                  <v-icon >{{ host.vars.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="host.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>

                  <v-menu
                    open-on-hover
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        icon
                      >
                        <v-icon>mdi-hammer-screwdriver</v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="(item, index) in actions"
                        :key="index"
                        v-on:click="t()"
                      >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>



  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  
  export default {
    name: 'StoreList',

    methods: {
      ...mapActions(["getHosts", "getGroups", "getTree"]),

      t() {
        
      }
    },

    computed: {
      ...mapGetters(["hosts", "groups", "tree"])
    },

    data: () => ({
      intervalGetHosts: 0,
      intervalGetGroups: 0,
      actions: [
        {"title": "Ping"},
        {"title": "Get status"}
      ]
    }),

    mounted() {
      this.getHosts();
      this.getGroups();
      this.getTree();

      // this.intervalGetHosts = setInterval(() => {this.getHosts()}, 5000)
      // this.intervalGetGroups = setInterval(() => {this.getGroups()}, 5000)

    },
    beforeDestroy() {
      clearInterval(this.intervalGetHosts)
      clearInterval(this.intervalGetGroups)
    }, 
  }
</script>
