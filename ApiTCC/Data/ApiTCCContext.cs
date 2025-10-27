using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiTCC.Modelos;

namespace ApiTCC.Data
{
    public class ApiTCCContext : DbContext
    {
        public ApiTCCContext (DbContextOptions<ApiTCCContext> options)
            : base(options)
        {
        }

        public DbSet<ApiTCC.Modelos.Aluno> Aluno { get; set; } = default!;
    }
}
