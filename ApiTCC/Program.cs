using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ApiTCC.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApiTCCContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ApiTCCContext") ?? throw new InvalidOperationException("Connection string 'ApiTCCContext' not found.")));

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd"));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(option =>
{
    option.AddPolicy("PolicyApi", olifrans =>
    {
        olifrans.AllowAnyMethod();
        olifrans.AllowAnyHeader();
        olifrans.AllowAnyOrigin();

    });
}
);




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("PolicyApi");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
