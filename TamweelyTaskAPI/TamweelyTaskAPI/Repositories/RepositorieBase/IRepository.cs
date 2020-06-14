using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Repositories.RepositorieBase
{
  public  interface IRepository<T> where T : class
    {
   
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<T> GetById(int id);
        Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate);
    }
}
