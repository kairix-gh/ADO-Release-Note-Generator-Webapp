<template>
    <label class="relative inline-flex items-center cursor-pointer mb-4">
        <input type="checkbox" v-model="useAdvancedMode" class="sr-only peer">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 select-none">Advanced Mode</span>
    </label>
    <div v-if="!useAdvancedMode">
        <div>
            <div class="flex w-full space-x-4">
                <div class="mb-6 flex-grow">
                    <label for="releaseVersion" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Version</label>
                    <input v-model="userInput.Version" type="text" id="releaseVersion" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="26" required autocomplete="off">
                </div>
                <div class="mb-6 flex-grow">
                    <label for="releaseDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Date</label>
                    <input v-model="userInput.Date" type="text" id="releaseDate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="7/31/2023" required autocomplete="off">
                </div>
            </div>
            <div class="mb-6">
                <label for="adoToken" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Access Token</label>
                <input v-model="ado.Token" type="text" id="adoToken" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required autocomplete="off">
            </div>
        </div>

    </div>
    <div v-else>
        <p class="my-2">
            You can edit the JSON payload sent to the API below. If you're not sure what any of this does, you can look for documentation <a href="https://github.com/kairix-gh/ADO-Release-Note-Generator" class="text-blue-600 hover:underline transition-all">here</a>.
        </p>
        <JsonEditorVue v-model="config.currentConfig" mode="tree" class="jse-theme-dark" :mainMenuBar="false" />
    </div>
    <div class="" v-show="takingLongTime">
        <p>Hmmm.. this seems to be taking a while right? Might be the server is coming online from a cold start.</p>
    </div>
    <button @click.prevent="downloadNotes" type="button" class="mt-4 w-40 h-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:bg-gray-600" :disabled="processing">
        <div class="inline-flex items-center justify-center" v-if="processing">
            <div role="status">
                <svg aria-hidden="true" class="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <span>Downloading</span>
        </div>
        <span v-else>Download Notes</span>
    </button>
</template>


<script setup lang="ts">
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import JsonEditorVue from 'json-editor-vue'
import { useConfigStore } from '@/stores/releaseNoteConfigStore';
import { ref, type Ref } from 'vue';
import { apiClient } from "@/services/api"

const useAdvancedMode = ref(false);
const processing = ref(false);
const takingLongTime = ref(false);

const config = useConfigStore();

const ado: Ref<AzureDevOps> = ref(config.currentConfig!.AzureDevOps);
const userInput: Ref<ReleaseInfo> = ref(config.currentConfig!.ReleaseInfo);


function updateJSON() {
    config.updateToCurrentRelease(userInput.value, ado.value.Token);
}

async function downloadNotes() {
    processing.value = true;
    takingLongTime.value = false;
    updateJSON();

    await apiClient.setToken(config.functionKey);
    var timer;
    try {
        timer = setTimeout(() => {
            takingLongTime.value = true;
        }, 5000);

        const response = await apiClient.getReleaseNotes(config.currentConfig!);
        clearTimeout(timer);

        if (response.status >= 200 && response.status <= 299) {
            const file = window.URL.createObjectURL(new Blob([response.data]));

            const downloadLink = document.createElement("a");
            downloadLink.href = file;

            const date = new Date(config.currentConfig!.ReleaseInfo.Date).toLocaleDateString()
            downloadLink.download = `Transcendent Release ${config.currentConfig?.ReleaseInfo.Version} - ${date.replace(/\//gm, '.')}.pdf`
            downloadLink.click();
            downloadLink.remove();
        } else {
            console.log("Download failed", response);
        }
        
        processing.value = false;
    } catch {
        clearTimeout(timer);        
        processing.value = false;
    }
}
</script>


