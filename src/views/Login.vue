<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit="login">
        <div
          v-if="ErrorMessage"
          class="flex items-center justify-between py-3 px-5 bg-red-400 text-white rounded"
        >
          {{ ErrorMessage }}
          <span
            @click="ErrorMessage = ''"
            class="w-8 h-8 flex items-center justify-center rounded-full transition-colors
             cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
          >
            X
          </span>
        </div>
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="username" class="sr-only">Username </label>
            <input
              id="username"
              name="username"
              type="username"
              autocomplete="username"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2
              border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              focus:z-10 sm:text-sm"
              placeholder="username"
              v-model="user.username"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="appearance-none rounded-none relative block w-full px-3 py-2
               border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
               focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
               focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="user.password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border
            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
             hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
             focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { LockClosedIcon } from '@heroicons/vue/solid';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import store from '../store';

const ErrorMessage = ref('');

const router = useRouter();

const user = {
  username: '',
  password: '',
};

function login(ev) {
  ev.preventDefault();

  store
    .dispatch('login', user)
    .then(() => {
      router.push({ name: 'Home' });
    })
    .catch(() => {
      ErrorMessage.value = 'Credenciais inválidas, tente novamente';
    });
}
</script>
