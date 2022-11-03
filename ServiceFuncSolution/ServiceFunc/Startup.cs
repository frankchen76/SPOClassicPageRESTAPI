using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ServiceFunc.Models;
using System;

[assembly: FunctionsStartup(typeof(ServiceFunc.Startup))]

namespace ServiceFunc
{
    class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            string SqlConnection = Environment.GetEnvironmentVariable("SqlConnectionString");
            builder.Services.AddDbContext<ProductDBContext>(
                options => options.UseSqlServer(SqlConnection));
        }
    }
}