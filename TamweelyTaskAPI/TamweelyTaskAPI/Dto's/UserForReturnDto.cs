using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Dto_s
{
    public class UserForReturnDto
    {
        public IEnumerable<IdentityError> ErrorList { get; set; }
        public UserLiteDto user { get; set; }
        public string Token { get; set; }
  
    }
}
