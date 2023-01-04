<template>
  <float-menu
    :position="'top left'"
    :dimension="50"
    :menu-data="items"
    menu-style="accordion"
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
        { name: "Создать справочники",
        subMenu: {
            name: "create-refence",
            items: [{ name: "Создать мед. организацию" }, { name: "Создать должность" }, { name: "Создать отдел" }, { name: "Создать тип нетрудоспособности" },
            { name: "Создать отметку для листа" }, { name: "Создать режим работы" }],
          },
         
        },
        {divider: true},
        {
          name: "Посмотреть справочники",
          subMenu: {
            name: "view-references",
            items: [{ name: "Показать мед. организации" }, { name: "Показать должности" }, { name: "Показать отделы" }, { name: "Показать типы нетрудоспособности" },
            { name: "Показать отметки для листа" }, { name: "Показать режимы работы" }],
          },
        },
        {divider: true},
        {
          name: "Больничные листы",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать больничный лист" }, { name: "Посмотреть больничные листы" }],
          },
        },
        {divider: true},
        {
          name: "Командировки",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать командировку" }, { name: "Посмотреть командировки" }],
          },
        },
        {divider: true},
        {
          name: "Листы учета рабочего времени",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать лист учета рабочего времени" }, { name: "Посмотреть листы учета рабочего времени" }],
          },
        },
        {divider: true},
        {
          name: "Работники",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать работника" }, { name: "Посмотреть работников" }],
          },
        },
        {divider: true},
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