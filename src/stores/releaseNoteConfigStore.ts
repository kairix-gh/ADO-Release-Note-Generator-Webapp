import defaultConfig from "@/data/defaultConfig";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useConfigStore = defineStore("config", () => {    
    const currentConfig: Ref<APIPayload | null> = ref(null);
    const functionKey = "azTc67gr8wPJEdlQqbkSH7yyZZgquSdQMXpV6JVktDi8AzFuIh4htQ==";
    const defaultValues = defaultConfig;

    function updateToCurrentRelease(releaseInfo: ReleaseInfo, token: string) {
        if (currentConfig.value == null) return;

        // Update Release Info
        // currentConfig.value.ReleaseInfo = releaseInfo;
        // currentConfig.value.AzureDevOps.Token = token;

        // Update Queries
        currentConfig.value.WorkItemGroups.forEach((group) => {
            if (group.Query) {
                group.Query = group.Query.replace(/(release\/Marriott-[^']*)/g, `release/Marriott-${releaseInfo?.Version ?? '999'}`)
            }
        })
    }

    currentConfig.value = defaultValues;

    return { currentConfig, defaultValues, functionKey, updateToCurrentRelease}
})