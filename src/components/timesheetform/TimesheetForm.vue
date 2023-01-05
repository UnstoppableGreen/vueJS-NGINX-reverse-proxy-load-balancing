<template style="max-width:600px">
  <div
    style="margin: 0 25% 0 25%; width: 50%"
    class="
      z-0
      flex
      items-center
      justify-center
      mb-8
      py-7
      md:py-12
      px-4
      sm:px-6
      lg:px-8
      items-center
    "
  >
    <div
      class=" p-4 bg-gray-100 rounded-xl shadow-lg z-10"
    >
      <div class="grid gap-8 grid-cols-1">
        <div class="flex flex-col">
          <div class="flex flex-col sm:flex-row items-center">
            <h2 v-if="!timesheetID" class="font-semibold text-lg mr-auto">
              Создать запись учета рабочего времени
            </h2>
            <h2 v-else class="font-semibold text-lg mr-auto">
              Изменить запись учета рабочего времени
            </h2>
            <div class="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0"></div>
          </div>
          <form @submit.prevent="saveTimesheet" class="mt-5">
            <div class="form">
              <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-0"
                    >Выберите метку:
                  </label>
                  <input
                    type="text"
                    v-model="timesheetdata.markstimesheet_id"
                    list="json-datalist-marks"
                  />
                  <datalist id="json-datalist-marks">
                    <option
                      v-for="mark in marks"
                      :key="mark.mark"
                      :value="mark.id"
                    >
                      {{ mark.mark}}
                    </option>
                  </datalist>
                </div>
              </div>
              <div class="md:flex flex-row md:space-x-4 w-full text-xs">
                <div class="mb-3 space-y-2 w-full text-xs">
                  <label class="font-semibold text-gray-600 py-0"
                    >Выберите сотрудника:
                  </label>
                  <input
                    type="text"
                    v-model="timesheetdata.workers_id"
                    list="json-datalist-workers"
                  />
                  <datalist id="json-datalist-workers">
                    <option
                      v-for="wrkr in workers"
                      :key="wrkr.name"
                      :value="wrkr.id"
                    >
                      {{ wrkr.id +" "+wrkr.name }}
                    </option>
                  </datalist>
                </div>
              </div>
             
              <div v-if="!timesheetID" class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">Дата-время входа</label>
									<input v-model="timesheetdata.entryDate"  type="datetime-local" placeholder="2021-01-01" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" name="integration[street_address]" id="integration_street_address">
								</div>
							</div>
              <div v-if="timesheetID" class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">Дата-время входа</label>
									<input disabled v-model="timesheetdata.entryDate"  type="datetime-local" placeholder="2021-01-01" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" name="integration[street_address]" id="integration_street_address">
								</div>
							</div>

              <div v-if="!timesheetID" class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">Дата-время выхода</label>
									<input v-model="timesheetdata.exitDate"  type="datetime-local" placeholder="2021-01-01" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" name="integration[street_address]" id="integration_street_address">
								</div>
							</div>
              <div v-if="timesheetID" class="md:flex md:flex-row md:space-x-4 w-full text-xs">
								<div class="w-full flex flex-col mb-3">
									<label class="font-semibold text-gray-600 py-2">Дата-время выхода</label>
									<input disabled v-model="timesheetdata.exitDate"  type="datetime-local" placeholder="2021-01-01" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4" name="integration[street_address]" id="integration_street_address">
								</div>
							</div>
              <!--<p> ответ {{JSON.stringify(orderdata.orderDetails)}} </p>-->
              <div
                class="
                  mt-5
                  text-right
                  md:space-x-3 md:block
                  flex flex-col-reverse
                "
              >
                <button
                  type="submit"
                  v-if="!timesheetID"
                  class="
                    transition
                    duration-200
                    ease-in-out
                    mb-2
                    md:mb-0
                    bg-green-400
                    px-5
                    py-2
                    text-sm
                    shadow-sm
                    font-medium
                    tracking-wider
                    text-white
                    rounded-full
                    hover:shadow-lg hover:bg-green-600
                  "
                >
                  Создать
                </button>
                <button
                  v-else
                  class="
                    transition
                    duration-200
                    ease-in-out
                    mb-2
                    md:mb-0
                    bg-green-400
                    px-5
                    py-2
                    text-sm
                    shadow-sm
                    font-medium
                    tracking-wider
                    text-white
                    rounded-full
                    hover:shadow-lg hover:bg-green-600
                  "
                >
                  Обновить
                </button>
              </div>
            </div>
            <button @click="this.$router.push('/human-resources')" class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Назад </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import useTimeSheets from "../../composables/TimeSheets";
import useWorkers from "../../composables/Workers";
import useMarks from "../../composables/MarksTimesheet";
import { ref } from "@vue/reactivity";

let marks = ref([]);
let timesheets = ref([]);
let workers = ref([]);
export default {
  name: "timesheetForm",
  props: {
    requestID: {
      timesheetID: true,
      type: String,
    },
  },
  data: function () {
    const { marksdata,getMarksTimesheet } = useMarks();
    const { timesheetsdata, getAllTimeSheetData } = useTimeSheets();
    const { workersdata,	getAllWorkerData, } = useWorkers();

    onMounted(getMarksTimesheet());
    marks = marksdata;
    onMounted(getAllTimeSheetData());
    timesheets = timesheetsdata;
    onMounted(getAllWorkerData());
    workers = workersdata;
    return {
      marks,
      timesheets,
      workers,
    };
  },
  setup(props) {
    const { timesheet, getTimeSheetById, storeTimeSheet, updateTimeSheet } = useTimeSheets();

    if (props.timesheetID) {
      onMounted(getTimeSheetById(props.timesheetID));
      timesheetdata = timesheet;
    }

    const saveTimesheet = async () => {
      console.log(timesheetdata);
      var pojotimesheet = {};
      pojotimesheet.markstimesheet = [];
      pojotimesheet.workers = [];

      pojotimesheet.markstimesheet.push({markstimesheet_id: timesheetdata['markstimesheet_id']});
      pojotimesheet.workers.push({workers_id: timesheetdata['workers_id']});

      //pojotimesheet['markstimesheet'][0]['markstimesheet_id']=timesheetdata['markstimesheet_id'];
      ////delete timesheetdata['markstimesheet_id'];
      //pojotimesheet['workers'][0]['workers_id']=timesheetdata['workers_id'];
      ////delete timesheetdata['workers_id']; 
      
      pojotimesheet['entryDate'] =  timesheetdata['entryDate'].replace('T', ' ');
      pojotimesheet['exitDate'] =  timesheetdata['exitDate'].replace('T', ' ');
      pojotimesheet['duration']=0;
      console.log(pojotimesheet);
      props.timesheetID
        ? await updateTimeSheet({ ...pojotimesheet })
        : await storeTimeSheet({ ...pojotimesheet });
    };

    return {
      timesheetdata,
      saveTimesheet,
    };
  },
};

// eslint-disable-next-line no-unused-vars
let timesheetdata = reactive({
  markstimesheet_id: "",
  workers_id: "",
  entryDate: "",
  exitDate: "",
});
</script>

<style scoped>
.scroll-table-body {
  height: 150px;
  overflow-x: auto;
  margin-top: 0px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.scroll-table table {
  width: 100%;
  table-layout: fixed;
  border: none;
}

.scroll-table tbody td {
  text-align: left;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}
.scroll-table tbody tr:nth-child(even) {
  background: #f3f3f3;
}

/* Стили для скролла */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
h1 {
  margin-top: 0;
}

label {
  display: block;
  margin-top: 2em;
  margin-bottom: 0.5em;
  color: #999999;
}

input {
  width: 100%;
  padding: 0.5em 0.5em;
  font-size: 1.2em;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
}

button {
  display: inline-block;
  border-radius: 3px;
  border: none;
  font-size: 0.9rem;
  padding: 0.5rem 0.8em;
  background: #69c773;
  border-bottom: 1px solid #498b50;
  color: white;
  -webkit-font-smoothing: antialiased;
  font-weight: bold;
  margin: 0;
  width: 100%;
  text-align: center;
}

button:hover,
button:focus {
  opacity: 0.75;
  cursor: pointer;
}

button:active {
  opacity: 1;
  box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1) inset;
}

body,
input {
  /* Настройка шрифта */
  font-family: Helvetica Neue, Arial, sans-serif;
  font-size: 14px;
  color: #106070;
}

table {
  /* Параметры таблицы */
  width: 430px;
  margin: auto;
  border: 2px solid #308090;
  border-radius: 3px;
  background-color: #fff;
}

th,
td {
  /* Общие параметры заголовка и строк */
  min-width: 20px;
  padding: 10px 10px;
}

th {
  /* Параметры заголовка */
  background-color: #308090;
  color: #ffffff;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  /* Параметры строк */
  background-color: #f3f8f9;
}

.b20 {
  /* Параметры кнопок */
  cursor: pointer;
  width: 30px;
  margin: 0 calc(50% - 15px);
  text-align: center;
}

.th60 {
  /* Параметры полей ввода */
  width: 40px;
  margin: 0 calc(50% - 40px);
}

.th180 {
  /* Параметры полей ввода */
  width: 180px;
}

.thAm {
  /* Параметры поля "Сумма" */
  font-weight: bold;
  border: 1px solid #a9a9a9;
  background-color: #f3f8f9;
}

/* Настройка цвета placeholder */
::-webkit-input-placeholder {
  color: #a9a9a9;
}
::-moz-placeholder {
  color: #a9a9a9;
}
:-moz-placeholder {
  color: #a9a9a9;
}
:-ms-input-placeholder {
  color: #a9a9a9;
}

/* Скрытие placeholder когда поле в фокусе */
:focus::-webkit-input-placeholder {
  color: transparent;
}
:focus::-moz-placeholder {
  color: transparent;
}
:focus:-moz-placeholder {
  color: transparent;
}
:focus:-ms-input-placeholder {
  color: transparent;
}
</style>
