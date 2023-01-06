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
  
  <!------------------------ ОТДЕЛЫ ------------------------------------>
  <Suspense v-if=visibledata.showDivisions>
    <template #default>
	<div>
		<button style="margin: 5em auto auto 10em" @click="visibledata.showDivisions=!visibledata.showDivisions;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-division />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=visibledata.createDivision>
    <template #default>
	<div>
		<form align="right" >
		<button style="margin: 5em 45em auto auto "  @click="visibledata.showDivisions=!visibledata.showDivisions;visibledata.createDivision=!visibledata.createDivision;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<division-create> </division-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <!------------------------РАБОЧИЕ ------------------------------------>
  <Suspense v-if=visibledata.showWorkers>
    <template #default>
	<div>
		<button align="right" @click="visibledata.showWorkers=!visibledata.showWorkers;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-worker />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=visibledata.createWorker>
    <template #default>
	<div>
		<form align="right" >
		<button @click="visibledata.showWorkers=!visibledata.showWorkers;visibledata.createWorker=!visibledata.createWorker;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<worker-create> </worker-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  
  <!------------------------УЧЕТ РАБОЧЕГО ВРЕМЕНИ ------------------------------------>
  <Suspense v-if=visibledata.showTimeSheets>
    <template #default>
	<div>
		<button @click="visibledata.showTimeSheets=!visibledata.showTimeSheets;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-TimeSheet />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=visibledata.createTimesheet>
    <template #default>
	<div>
		<form align="right" >
		<button @click="visibledata.showTimeSheets=!visibledata.showTimeSheets;visibledata.createTimesheet=!visibledata.createTimesheet;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<timesheet-create> </timesheet-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------МЕДИЦИНСКИЕ ОРГАНИЗАЦИИ ------------------------------------>
  <Suspense v-if=visibledata.showMedicalOrganizations>
    <template #default>
	<div>
		<button @click="visibledata.showMedicalOrganizations=!visibledata.showMedicalOrganizations;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-medicalOrganization />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
	</Suspense>
	<Suspense v-if=visibledata.createMedicalOrganization>
    <template #default>
	<div>
		<form align="right" >
		<button @click="visibledata.showMedicalOrganizations=!visibledata.showMedicalOrganizations;visibledata.createMedicalOrganization=!visibledata.createMedicalOrganization;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<medical-organization-create> </medical-organization-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
	</Suspense>
	<!------------------------ДОЛЖНОСТИ ------------------------------------>
  <Suspense v-if=visibledata.showProfessions>
    <template #default>
	<div>
		<button @click="visibledata.showProfessions=!visibledata.showProfessions;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-profession />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=visibledata.createProfession>
    <template #default>
	<div>
		<form align="right" >
		<button @click="visibledata.showProfessions=!visibledata.showProfessions;visibledata.createProfession=!visibledata.createProfession;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<profession-create> </profession-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  
  <!------------------------ОТПУСКА ------------------------------------>
  <Suspense v-if=visibledata.showVacations>
    <template #default>
	<div>
		<button @click="visibledata.showVacations=!visibledata.showVacations;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		<list-vacation />
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if=visibledata.createVacation>
    <template #default>
	<div>
		<form align="right" >
		<button @click="visibledata.showVacations=!visibledata.showVacations;visibledata.createVacation=!visibledata.createVacation;" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> X </button>
		</form>
		<vacation-create> </vacation-create>
	</div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  
</template>

<script>
import { reactive } from '@vue/reactivity'
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
    WorkerCreate: defineAsyncComponent(() =>
      import('../components/workerform/WorkerCreate.vue')
    ),
    TimesheetCreate: defineAsyncComponent(() =>
      import('../components/timesheetform/TimesheetCreate.vue')
    ),  
    ListTimeSheet: defineAsyncComponent(() =>
      import('../components/timesheets/ListTimeSheet.vue'),
    ),
	
    ListMedicalOrganization: defineAsyncComponent(() =>
      import('../components/medicalorganizations/ListMedicalOrganization.vue'),
    ),
    MedicalOrganizationCreate: defineAsyncComponent(() =>
      import('../components/medicalorganizationform/MedicalOrganizationCreate.vue')
    ),
	
	ListProfession: defineAsyncComponent(() =>
      import('../components/professions/ListProfession.vue'),
    ),
	ProfessionCreate: defineAsyncComponent(() =>
      import('../components/professionform/ProfessionCreate.vue')
    ),
	VacationCreate: defineAsyncComponent(() =>
      import('../components/vacationform/VacationCreate.vue')
    ),  
    ListVacation: defineAsyncComponent(() =>
      import('../components/vacations/ListVacation.vue'),
    ),
    
  },
  data() {
	let visibledata=reactive({
			'showDivisions':false,
			'createDivision':false,
			'showWorkers':false,
			'createWorker':false,
			'showTimeSheets':false,
			'createTimesheet':false,
			'showMedicalOrganizations':false,
			'createMedicalOrganization':false,
			'showProfessions':false,
			'createProfession':false,
			'showVacations':false,
			'createVacation':false,
		})
	
	const visibleComponent = (name) => {
		let result=reactive({})
		Object.entries(this.visibledata).forEach(([key]) => {
			if (key == name) {result[key] = true;}
			else {result[key] = false;}
		})
		this.visibledata = result
	}
	
    const handleSelection = (selectedItem) => {
		console.log(selectedItem);
		if (selectedItem=="Показать отделы") {this.visibleComponent('showDivisions');}
		if (selectedItem=="Показать мед. организации") {this.visibleComponent('showMedicalOrganizations');}
		if (selectedItem=="Показать работников") {this.visibleComponent('showWorkers');}
		if (selectedItem=="Показать листы учета рабочего времени") {this.visibleComponent('showTimeSheets');}
		if (selectedItem=="Показать должности") {this.visibleComponent('showProfessions');}
		if (selectedItem=="Показать отпуска") {this.visibleComponent('showVacations');}

		if (selectedItem=="Создать отдел") {this.visibleComponent('createDivision');}
		if (selectedItem=="Создать лист учета рабочего времени") {this.visibleComponent('createTimesheet');}
		if (selectedItem=="Создать мед. организацию") {this.visibleComponent('createMedicalOrganization');}
		if (selectedItem=="Создать должность") {this.visibleComponent('createProfession');}
		if (selectedItem=="Создать работника") {this.visibleComponent('createWorker');}
		if (selectedItem=="Создать запись об отпуске") {this.visibleComponent('createVacation');}

    };
    return {
      handleSelection, visibledata, visibleComponent, 
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
          name: "Отпукска",
          subMenu: {
            name: "sickLeaves",
            items: [{ name: "Создать запись об отпуске" }, { name: "Показать отпуска" }],
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