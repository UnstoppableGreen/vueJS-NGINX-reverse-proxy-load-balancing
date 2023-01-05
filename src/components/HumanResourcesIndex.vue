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
  <div v-if=showDivisions>
      <list-division />
  </div>
  <Suspense v-if=createDivision>
    <template #default>
	<div>
		<form align="right" class="mt-5">
		<button @click="this.showDivisions=!this.showDivisions;this.createDivision=!this.createDivision;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<division-create> </division-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <div v-if=showWorkers>
      <list-worker />
  </div>
  <Suspense v-if=showUsers>
    <template #default>
      <list-user />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=createTimesheet>
    <template #default>
	<div>
		<form align="right" class="mt-5">
		<button @click="this.showTimeSheets=!this.showTimeSheets;this.createTimesheet=!this.createTimesheet;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<timesheet-create> </timesheet-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <div v-if=showTimeSheets>
      <list-TimeSheet />
  </div>
</template>

<script>
import { FloatMenu } from "vue-float-menu";
import "vue-float-menu/dist/vue-float-menu.css";
import { defineAsyncComponent } from 'vue'

export default {
  
  components: {
    FloatMenu,
    ListDivision: defineAsyncComponent(() =>
      import('../components/divisions/ListDivision.vue'),
    ),
    DivisionCreate: defineAsyncComponent(() =>
      import('../components/divisionform/DivisionCreate.vue')
    ),
    ListWorker: defineAsyncComponent(() =>
      import('../components/worker/ListWorker.vue')
    ),
    ListUser: defineAsyncComponent(() =>
      import('../components/user/ListUser.vue')
    ),
    TimesheetCreate: defineAsyncComponent(() =>
      import('../components/timesheetform/TimesheetCreate.vue')
    ),  
    ListTimeSheet: defineAsyncComponent(() =>
      import('../components/timesheets/ListTimeSheet.vue'),
    ),
    
  },
  data() {
    let showDivisions=false;
    let createDivision=false;
    let showWorkers=false;
    let showUsers=false;
    let createTimesheet=false;
    let showTimeSheets=false;
	
    const handleSelection = (selectedItem) => {
      console.log(selectedItem);
      if (selectedItem=="Показать отделы") {this.showDivisions=!this.showDivisions;}
      if (selectedItem=="Создать отдел") {this.createDivision=!this.createDivision;}
      if (selectedItem=="Показать работников") {this.showWorkers=!this.showWorkers;}
      if (selectedItem=="Open Recent") {this.showUsers=!this.showUsers;}
      if (selectedItem=="Создать лист учета рабочего времени") {this.createTimesheet=!this.createTimesheet;}
      if (selectedItem=="Показать листы учета рабочего времени") {this.showTimeSheets=!this.showTimeSheets;}
    };
    return {
      handleSelection, showDivisions, createDivision,showWorkers,showUsers,createTimesheet, showTimeSheets,
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
            items: [{ name: "Создать больничный лист" }, { name: "Показать больничные листы" }],
          },
        },
        {divider: true},
        {
          name: "Командировки",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать командировку" }, { name: "Показать командировки" }],
          },
        },
        {divider: true},
        {
          name: "Листы учета рабочего времени",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать лист учета рабочего времени" }, { name: "Показать листы учета рабочего времени" }],
          },
        },
        {divider: true},
        {
          name: "Работники",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать работника" }, { name: "Показать работников" }],
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