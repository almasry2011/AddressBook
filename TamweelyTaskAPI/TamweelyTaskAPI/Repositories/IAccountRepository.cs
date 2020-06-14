using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Dto_s;

namespace TamweelyTaskAPI.Repositories
{
 public  interface IAccountRepository
    {
        Task<UserForReturnDto> Register(AppUser _user, string _password);
        Task<UserForReturnDto> login(AppUser _user, string password);
    }
}
