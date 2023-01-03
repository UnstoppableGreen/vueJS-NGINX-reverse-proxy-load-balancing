<template>
  <float-menu
    :position="'top left'"
    :dimension="50"
    :menu-data="items"
    :on-selected="handleSelection"
  >
    Menu
  </float-menu>
  <Suspense v-if=showMedOrg>
    <template #default>
      <list-user />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <template>
</template>
</template>

<script>
import { FloatMenu } from "vue-float-menu";
import "vue-float-menu/dist/vue-float-menu.css";
import { defineAsyncComponent } from 'vue'

export default {
  
  components: {
    FloatMenu, ListUser: defineAsyncComponent(() =>
      import('../../components/user/ListUser.vue')
    ),
  },
  setup() {

  },
  data() {
    let showMedOrg=false;
    const handleSelection = (selectedItem) => {
      console.log(selectedItem);
      if (selectedItem=="Показать мед. организации") {this.showMedOrg=!this.showMedOrg;}
    };
    return {
      handleSelection, showMedOrg,
      items: [
        { name: "New",
        subMenu: {
            name: "create-refence",
            items: [{ name: "Создать мед. организацию" }, { name: "Создать должность" }, { name: "Создать тип нетрудоспособности" },
            { name: "Создать отметку для листа" }, { name: "Создать режим работы" }],
          }, },
        {
          name: "View",
          subMenu: {
            name: "edit-items",
            items: [{ name: "Показать мед. организации" }, { name: "Показать должности" }],
          },
        },
        {
          name: "Open Recent"
        },
        {
          name: "Save",
        }
      ],
    };
  },
};
</script>