using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Model;
using TamweelyTaskAPI.Repositories.RepositorieBase;

namespace TamweelyTaskAPI.Repositories.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private DataContext _context;
        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

     
        private IRepository<AddressBook> _AddressBooksRepo;
        private IRepository<Department> _DepartmentsRepo;
        private IRepository<Title> _TitleRepo;


        public IRepository<AddressBook> AddressBooks
        {
        get
            {
                if (_AddressBooksRepo == null)
                {
                    return new Repository<AddressBook>(_context);
                }
                return _AddressBooksRepo;
            }
        }
            
            
            

        public IRepository<Department> Departments
        {
            get
            {
                if (_DepartmentsRepo == null)
                {
                    return new Repository<Department>(_context);
                }
                return _DepartmentsRepo;
            }
        }
        public IRepository<Title> Titles
        {
            get
            {
                if (_TitleRepo == null)
                {
                    return new Repository<Title>(_context);
                }
                return _TitleRepo;
            }
        }
        public void Dispose()
        {
            _context.Dispose();
        }

        public async Task<bool> Save()
        {
            if (await _context.SaveChangesAsync()>0)
            {
                return true;
            }
            return false;
        }
    }
 

}
