using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore.Design;
using ServiceFunc.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace ServiceFunc
{
    public class ServiceFunc
    {
        private readonly ProductDBContext _dbContext;
        public ServiceFunc(ProductDBContext dbContext)
        {
            this._dbContext = dbContext;
        }
        [FunctionName("ServiceFunc")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            name = name ?? data?.name;

            string responseMessage = string.IsNullOrEmpty(name)
                ? "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response."
                : $"Hello, {name}. This HTTP triggered function executed successfully.";

            var ret = new List<ProductItem>();
            var query = from p in this._dbContext.Products
                         where p.ListPrice > 0
                         select p;
            var result = await query.Take(10).ToListAsync();
            if(result !=null)
            {
                foreach(var item in result)
                {
                    ret.Add(new ProductItem()
                    { 
                        Id=item.ProductId,
                        Number=item.ProductNumber,
                        Price=item.ListPrice
                    });
                }
            }


            return new OkObjectResult(ret);
        }
    }
}
