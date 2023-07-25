export default {
    "FooterAddress": "333 Douglas Road East, Oldsmar, FL 34677",
    "FooterHyperlink": "https://transcendent.ai",
    "FooterHyperlinkText": "Transcendent.ai",
    "FooterImagePath": "Assets/TR-Vertical.png",
    "HeaderImagePath": "Assets/TR-Horizontal.png",
    "SkipWorkItemsWithNoNotes": true,
    "FunctionContext": true,
    "OutputPath": "",
  
    "ReleaseInfo": {
      "Version": "26",
      "Date": "7/31/2023"
    },
    "AzureDevOps": {
      "Url": "https://dev.azure.com/transcendent",
      "Token": "ADO Token"
    },
    "WorkItemGroups": [
       {
         "Name": "Features",
         "Query": "Select [Id], [System.Tags] From WorkItems Where [System.TeamProject] = 'Mintek' And [System.Tags] Contains 'release/Marriott-26' And [System.WorkItemType] = 'Feature'",
         "Fields": "System.Id, System.Title, System.State, System.WorkItemType, TranscendentAgile.ReleaseNotes",
         "TitleField": "System.Title",
         "DescriptionField": "Custom.Notes"
      },
      {
         "Name": "Enhancements",
         "Query": "Select [Id], [System.Tags] From WorkItems Where [System.TeamProject] = 'Mintek' And [System.Tags] Contains 'release/Marriott-26' And [System.WorkItemType] = 'User Story'",
         "Fields": "System.Id, System.Title, System.State, System.WorkItemType, TranscendentAgile.ReleaseNotes",
         "TitleField": "Custom.ReleaseNoteTitle",
         "DescriptionField": "TranscendentAgile.ReleaseNotes"
      },
      {
        "Name": "Fixes",
        "Query": "Select [Id], [System.Tags] From WorkItems Where [System.TeamProject] = 'Mintek' And [System.Tags] Contains 'release/Marriott-26' And [System.WorkItemType] = 'Bug'",
        "Fields": "System.Id, System.Title, System.State, System.WorkItemType, Custom.ReleaseNotesNotes",
        "TitleField": "Custom.ReleaseTitle",
        "DescriptionField": "Custom.ReleaseNotesNotes"
      }
    ]
  }