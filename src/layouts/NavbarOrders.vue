<template>
  <div
    class="
      delay-75
      duration-500
      ease-in-out
      hover:bg-gray-200
      z-30
      bg-red-100
      uppercase
      font-semibold
      rounded-lg
      flex
      xl:flex-col
      shadow-lg
      border-gray-600
      justify-around
      xl:w-16
      fixed
      w-screen
      top-12

      mx-16
      my-20
    "
  >
    <span class="font-md"> Orders </span>
    <router-link
      to="/newOrder"
      class="
        hover:shadow-md
        p-3
        md:p-2
        rounded-full
        duration-1000
        ease-in-out
        transform
        hover:scale-125
        delay-200
        hover:bg-red-300 hover:text-3xl
        font-bold
        text-center
        cursor-pointer
      "
    >
      <span class="material-icons-outlined"> add_box </span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>






