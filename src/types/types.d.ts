interface ReleaseInfo {
    Version: string
    Date: string
}

interface AzureDevOps {
    Url: string
    Token: string
}

interface WorkItemGroup {
    [k: string]: any
}

interface APIPayload {
    ReleaseInfo: ReleaseInfo,
    AzureDevOps: AzureDevOps,
    WorkItemGroups: WorkItemGroup[]
}