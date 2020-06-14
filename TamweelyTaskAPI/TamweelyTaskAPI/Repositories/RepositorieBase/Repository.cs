using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TamweelyTaskAPI.Data;

namespace TamweelyTaskAPI.Repositories.RepositorieBase
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DataContext db;

        public Repository(DataContext _db)
        {
            db = _db;
        }

        public void Add(T entity)
        {
            db.Set<T>().Add(entity);
        }

        public async Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate)
        {
            return await db.Set<T>().AsNoTracking(). Where(predicate).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await db.Set<T>() .ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await  db.Set<T>().FindAsync(id);

        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate)
        {
            return await db.Set<T>().Where(predicate).ToListAsync();
        }

        public async void Remove(T entity)
        {
            db.Set<T>().Remove(entity);
        }

        public void Update(T entity)
        {
            db.Attach(entity);
           db.Entry(entity).State = EntityState.Modified;
         
        }
    }
}
