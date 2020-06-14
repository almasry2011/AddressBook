using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamweelyTaskAPI.Model;
using TamweelyTaskAPI.Repositories.RepositorieBase;

namespace TamweelyTaskAPI.Repositories.UnitOfWork
{
   public interface IUnitOfWork:IDisposable
    {
        IRepository<AddressBook> AddressBooks { get; }
        IRepository<Department> Departments { get; }
        IRepository<Title> Titles { get; }

         Task <bool> Save();

    }
}
