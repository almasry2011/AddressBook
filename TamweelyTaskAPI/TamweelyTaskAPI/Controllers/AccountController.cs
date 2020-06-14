using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Dto_s;
using TamweelyTaskAPI.Repositories;

namespace TamweelyTaskAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IAccountRepository _AccRepo;
        private readonly IMapper _Mapper;

        public AccountController(IAccountRepository acc, IMapper mapper)
        {
            this._AccRepo = acc;
            this._Mapper = mapper;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]UserDto user)
        {
            var _user = _Mapper.Map<AppUser>(user);
            var res = await _AccRepo.Register(_user, user.Password);
            if (res.user != null)
            {
                return Ok(new { status = true, Message = "You have successfully registered " });
            }
            return BadRequest(res.ErrorList);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserDto user)
        {
            var _user = _Mapper.Map<AppUser>(user);
            var res = await _AccRepo.login(_user, user.Password);
            if (res.Token != null)
            {
                return Ok(res);
            }
            return BadRequest(res.ErrorList);
        }
    }




 
}