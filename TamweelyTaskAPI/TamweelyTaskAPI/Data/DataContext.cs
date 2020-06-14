using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamweelyTaskAPI.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace TamweelyTaskAPI.Data
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {  }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
            builder.Entity<Department>().HasData(
                   new { Id = 1, DepartmentName = "Department 1" },
                   new { Id = 2, DepartmentName = "Department 2" },
                   new { Id = 3, DepartmentName = "Department 3" }
               );
            builder.Entity<Title>().HasData(
                 new { Id = 1, TitleName = "Title 1" },
                 new { Id = 2, TitleName = "Title 2" },
                 new { Id = 3, TitleName = "Title 3" }
             );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
        public DbSet<AddressBook> AddressBooks { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Title> Titles { get; set; }



    }






}
