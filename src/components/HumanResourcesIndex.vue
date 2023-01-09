<template>
  <div style="margin: auto auto 2em 11em">
    <div
      style="margin: auto auto auto auto"
      ref="draggableContainer"
      id="draggable-container"
    >
      <div
        class="cursor-pointer"
        id="draggable-header"
        @mousedown="dragMouseDown"
      >
        <slot name="header">
          <div>
            <div class="relative">
              <!-- Dropdown toggle button -->
              <div style="cursor: context-menu">
                <button
                  @click="visiblemenu.show = !visiblemenu.show"
                  class="
                    flex
                    items-center
                    p-2
                    text-indigo-100
                    bg-indigo-600
                    rounded-md
                  "
                >
                  <span class="mr-4">Menu</span>
                </button>
              </div>
              <!-- Dropdown menu -->
              <div
                v-show="visiblemenu.show"
                class="
                  absolute
                  right-0
                  py-2
                  mt-2
                  bg-indigo-500
                  rounded-md
                  shadow-xl
                  w-44
                "
              >
                <div v-if="checkRole('changeReferences')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showCreate')"
                  >
                    Создать справочники
                  </div>
                  <div
                    v-show="visiblemenu.showCreate"
                    style="background-color: #f3f4f6"
                    class="
                      absolute
                      right-0
                      py-2
                      mt-2
                      bg-grey-500
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('createMedicalOrganization')"
                    >
                      Создать мед. организацию
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('createProfession')"
                    >
                      Создать должность
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('createDivision')"
                    >
                      Создать отдел
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchReferences')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showReferneces')"
                  >
                    Посмотреть справочники
                  </div>
                  <div
                    v-show="visiblemenu.showReferneces"
                    style="background-color: #f3f4f6"
                    class="
                      absolute
                      right-0
                      py-2
                      mt-2
                      bg-grey-500
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="
                        visibleComponent('showMedicalOrganizations');
                        checkRole('watchAll');
                      "
                    >
                      Показать мед. организации
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showProfessions')"
                    >
                      Показать должности
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showDivisions')"
                    >
                      Показать отделы
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchSickLeave')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showSickLeave')"
                  >
                    Больничные листы
                  </div>
                  <div
                    v-show="visiblemenu.showSickLeave"
                    style="background-color: #f3f4f6"
                    class="
                      absolute
                      right-0
                      py-2
                      mt-2
                      bg-grey-500
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div v-if="checkRole('changeSickLeave')">
                      <div
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-grey-100
                          hover:bg-indigo-200 hover:text-grey-100
                        "
                        @click="visibleComponent('createSickLeave')"
                      >
                        Создать больничный лист
                      </div>
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showSickLeaves')"
                    >
                      Показать больничные листы
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchBusinessTrip')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showBusinessTrip')"
                  >
                    Командировки
                  </div>
                  <div
                    v-show="visiblemenu.showBusinessTrip"
                    style="background-color: #f3f4f6"
                    class="
                      absolute
                      right-0
                      py-2
                      mt-2
                      bg-grey-500
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div v-if="checkRole('changeBusinessTrip')">
                      <div
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-grey-100
                          hover:bg-indigo-200 hover:text-grey-100
                        "
                        @click="visibleComponent('createBusinessTrip')"
                      >
                        Создать командировку
                      </div>
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showBusinessTrips')"
                    >
                      Показать командировки
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchTimesheet')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showTimesheet')"
                  >
                    Листы учета рабочего времени
                  </div>
                  <div
                    v-show="visiblemenu.showTimesheet"
                    style="background-color: #f3f4f6"
                    class="
                      absolute
                      right-0
                      py-2
                      mt-2
                      bg-grey-500
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div v-if="checkRole('changeTimesheet')">
                      <div
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-grey-100
                          hover:bg-indigo-200 hover:text-grey-100
                        "
                        @click="visibleComponent('createTimesheet')"
                      >
                        Создать лист учета рабочего времени
                      </div>
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showTimesheets')"
                    >
                      Показать листы учета рабочего времени
                    </div>
					<div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showTimesheetReport')"
                    >
                      Показать отчет
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchWorker')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showWorker')"
                  >
                    Работники
                  </div>
                  <div
                    v-show="visiblemenu.showWorker"
                    style="background-color: #f3f4f6"
                    class="absolute right-0 py-2 mt-2 rounded-md shadow-xl w-44"
                  >
                    <div v-if="checkRole('changeWorker')">
                      <div
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-grey-100
                          hover:bg-indigo-200 hover:text-grey-100
                        "
                        @click="visibleComponent('createWorker')"
                      >
                        Создать работника
                      </div>
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showWorkers')"
                    >
                      Показать работников
                    </div>
                  </div>
                </div>
                <div v-if="checkRole('watchVacation')">
                  <div
                    class="
                      block
                      px-4
                      py-2
                      text-sm text-indigo-100
                      hover:bg-indigo-400 hover:text-indigo-100
                    "
                    @click="visibleCompMenu('showVacation')"
                  >
                    Отпуска
                  </div>
                  <div
                    v-show="visiblemenu.showVacation"
                    style="background-color: #f3f4f6"
                    class="
                      text-dark
                      absolute
                      right-0
                      py-2
                      mt-2
                      rounded-md
                      shadow-xl
                      w-44
                    "
                  >
                    <div v-if="checkRole('changeVacation')">
                      <div
                        class="
                          block
                          px-4
                          py-2
                          text-sm text-grey-100
                          hover:bg-indigo-200 hover:text-grey-100
                        "
                        @click="visibleComponent('createVacation')"
                      >
                        Создать запись об отпуске
                      </div>
                    </div>
                    <div
                      class="
                        block
                        px-4
                        py-2
                        text-sm text-grey-100
                        hover:bg-indigo-200 hover:text-grey-100
                      "
                      @click="visibleComponent('showVacations')"
                    >
                      Показать отпуска
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>

  <!------------------------ ОТДЕЛЫ ------------------------------------>
  <Suspense v-if="visibledata.showDivisions">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showDivisions = !visibledata.showDivisions"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-division />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createDivision">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showDivisions = !visibledata.showDivisions;
              visibledata.createDivision = !visibledata.createDivision;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <division-create> </division-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <!------------------------РАБОЧИЕ ------------------------------------>
  <Suspense v-if="visibledata.showWorkers">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showWorkers = !visibledata.showWorkers"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-worker />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createWorker">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showWorkers = !visibledata.showWorkers;
              visibledata.createWorker = !visibledata.createWorker;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <worker-create> </worker-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------УЧЕТ РАБОЧЕГО ВРЕМЕНИ ------------------------------------>
  <Suspense v-if="visibledata.showTimesheets">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showTimesheets = !visibledata.showTimesheets"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-TimeSheet />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createTimesheet">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showTimesheets = !visibledata.showTimesheets;
              visibledata.createTimesheet = !visibledata.createTimesheet;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <timesheet-create> </timesheet-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.showTimesheetReport">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showTimesheetReport = !visibledata.showTimesheetReport"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-timesheet-report />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------МЕДИЦИНСКИЕ ОРГАНИЗАЦИИ ------------------------------------>
  <Suspense v-if="visibledata.showMedicalOrganizations">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="
            visibledata.showMedicalOrganizations =
              !visibledata.showMedicalOrganizations
          "
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-medicalOrganization />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createMedicalOrganization">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showMedicalOrganizations =
                !visibledata.showMedicalOrganizations;
              visibledata.createMedicalOrganization =
                !visibledata.createMedicalOrganization;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <medical-organization-create> </medical-organization-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <!------------------------ДОЛЖНОСТИ ------------------------------------>
  <Suspense v-if="visibledata.showProfessions">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showProfessions = !visibledata.showProfessions"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-profession />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createProfession">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showProfessions = !visibledata.showProfessions;
              visibledata.createProfession = !visibledata.createProfession;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <profession-create> </profession-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------ОТПУСКА ------------------------------------>
  <Suspense v-if="visibledata.showVacations">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showVacations = !visibledata.showVacations"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-vacation />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createVacation">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showVacations = !visibledata.showVacations;
              visibledata.createVacation = !visibledata.createVacation;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <vacation-create> </vacation-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------КОМАНДИРОВКИ ------------------------------------>
  <Suspense v-if="visibledata.showBusinessTrips">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="
            visibledata.showBusinessTrips = !visibledata.showBusinessTrips
          "
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-business-trip />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createBusinessTrip">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showBusinessTrips = !visibledata.showBusinessTrips;
              visibledata.createBusinessTrip = !visibledata.createBusinessTrip;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <business-trip-create> </business-trip-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>

  <!------------------------БОЛЬНИЧНЫЕ ЛИСТЫ ------------------------------------>
  <Suspense v-if="visibledata.showSickLeaves">
    <template #default>
      <div>
        <button
          style="margin: 5em auto auto 10em"
          @click="visibledata.showSickLeaves = !visibledata.showSickLeaves"
          class="
            mb-2
            md:mb-0
            bg-white
            px-5
            py-2
            text-sm
            shadow-sm
            font-medium
            tracking-wider
            border
            text-gray-600
            rounded-full
            hover:shadow-lg hover:bg-gray-100
          "
        >
          X
        </button>
        <list-sick-leave />
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
  <Suspense v-if="visibledata.createSickLeave">
    <template #default>
      <div>
        <form align="right">
          <button
            style="margin: 5em 45em auto auto"
            @click="
              visibledata.showSickLeaves = !visibledata.showSickLeaves;
              visibledata.createSickLeave = !visibledata.createSickLeave;
            "
            class="
              mb-2
              md:mb-0
              bg-white
              px-5
              py-2
              text-sm
              shadow-sm
              font-medium
              tracking-wider
              border
              text-gray-600
              rounded-full
              hover:shadow-lg hover:bg-gray-100
            "
          >
            X
          </button>
        </form>
        <sick-leave-create> </sick-leave-create>
      </div>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { defineAsyncComponent } from "vue";

import { useKeycloak } from "@baloise/vue-keycloak";

const { hasRoles } = useKeycloak();

export default {
  components: {
    ListDivision: defineAsyncComponent(() =>
      import("../components/divisions/ListDivision.vue")
    ),
    DivisionCreate: defineAsyncComponent(() =>
      import("../components/divisionform/DivisionCreate.vue")
    ),
    ListWorker: defineAsyncComponent(() =>
      import("../components/worker/ListWorker.vue")
    ),
    WorkerCreate: defineAsyncComponent(() =>
      import("../components/workerform/WorkerCreate.vue")
    ),
    TimesheetCreate: defineAsyncComponent(() =>
      import("../components/timesheetform/TimesheetCreate.vue")
    ),
    ListTimeSheet: defineAsyncComponent(() =>
      import("../components/timesheets/ListTimeSheet.vue")
    ),

    ListMedicalOrganization: defineAsyncComponent(() =>
      import("../components/medicalorganizations/ListMedicalOrganization.vue")
    ),
    MedicalOrganizationCreate: defineAsyncComponent(() =>
      import(
        "../components/medicalorganizationform/MedicalOrganizationCreate.vue"
      )
    ),

    ListProfession: defineAsyncComponent(() =>
      import("../components/professions/ListProfession.vue")
    ),
    ProfessionCreate: defineAsyncComponent(() =>
      import("../components/professionform/ProfessionCreate.vue")
    ),
    VacationCreate: defineAsyncComponent(() =>
      import("../components/vacationform/VacationCreate.vue")
    ),
    ListVacation: defineAsyncComponent(() =>
      import("../components/vacations/ListVacation.vue")
    ),
    BusinessTripCreate: defineAsyncComponent(() =>
      import("../components/businesstripform/BusinessTripCreate.vue")
    ),
    ListBusinessTrip: defineAsyncComponent(() =>
      import("../components/businesstrips/ListBusinessTrip.vue")
    ),
    SickLeaveCreate: defineAsyncComponent(() =>
      import("../components/sickleaveform/SickLeaveCreate.vue")
    ),
    ListSickLeave: defineAsyncComponent(() =>
      import("../components/sickleaves/ListSickLeave.vue")
    ),
	ListTimesheetReport: defineAsyncComponent(() =>
      import("../components/timesheetreports/ListTimesheetReport.vue")
    ),
  },

  data: function () {
    let visibledata = reactive({
		showDivisions: false,
		createDivision: false,
		showWorkers: false,
		createWorker: false,
		showTimesheets: false,
		createTimesheet: false,
		showMedicalOrganizations: false,
		createMedicalOrganization: false,
		showProfessions: false,
		createProfession: false,
		showVacations: false,
		createVacation: false,
		showBusinessTrips: false,
		createBusinessTrip: false,
		showSickLeaves: false,
		createSickLeave: false,
		showTimesheetReport: false,
    });

    let visiblemenu = reactive({
      show: false,
      showReferneces: false,
      showCreate: false,
      showSickLeave: false,
      showBusinessTrip: false,
      showTimesheet: false,
      showWorker: false,
      showVacation: false,
    });

    const visibleComponent = (name) => {
      let result = reactive({});
      Object.entries(this.visibledata).forEach(([key]) => {
        if (key == name) {
          result[key] = true;
        } else {
          result[key] = false;
        }
      });
      this.visibledata = result;
    };

    const visibleCompMenu = (name) => {
      let result = reactive({});
      Object.entries(this.visiblemenu).forEach(([key, value]) => {
        if (key == name) {
          if (value == true) {
            result[key] = false;
          } else {
            result[key] = true;
          }
        } else {
          result[key] = false;
        }
      });
      result["show"] = true;
      console.log(result);
      this.visiblemenu = result;
    };

    return {
      visibledata,
      visiblemenu,
      visibleCompMenu,
      visibleComponent,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  methods: {
    checkRole: function (role) {
      console.log("роль " + role);
      console.log("есть право? " + hasRoles([role]));
      if (hasRoles([role])) {
        return true;
      } else {
        return false;
      }
    },
    dragMouseDown: function (event) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      document.onmousemove = this.elementDrag;
      document.onmouseup = this.closeDragElement;
    },
    elementDrag: function (event) {
      event.preventDefault();
      this.positions.movementX = this.positions.clientX - event.clientX;
      this.positions.movementY = this.positions.clientY - event.clientY;
      this.positions.clientX = event.clientX;
      this.positions.clientY = event.clientY;
      // set the element's new position:
      this.$refs.draggableContainer.style.top =
        this.$refs.draggableContainer.offsetTop -
        this.positions.movementY +
        "px";
      this.$refs.draggableContainer.style.left =
        this.$refs.draggableContainer.offsetLeft -
        this.positions.movementX +
        "px";
    },
    closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
  },
};
</script>

<style>
#draggable-container {
  position: absolute;
  z-index: 9;
}
#draggable-header {
  z-index: 10;
}
</style>