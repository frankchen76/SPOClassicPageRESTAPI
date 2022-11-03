declare interface IAzureFuncWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'AzureFuncWebPartStrings' {
  const strings: IAzureFuncWebPartStrings;
  export = strings;
}
