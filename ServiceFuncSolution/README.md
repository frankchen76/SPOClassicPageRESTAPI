# ServiceFunctionSolution

## Summary

This is sample to showcase Azure Function connect to on-premise Sql DB via Azure Hybrid connection

## Instruction
 * add local.settings.json
 * add the following connection to local.settings.json
   * db-server: this needs to be same as Azure Hybrid connection name
 ```json
 {
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "SqlConnectionString": "Data Source=[db-server];Database=[db-name];User ID=[sql-username];Password=[sql-password];Trust Server Certificate=true"
  }
}
 ```
