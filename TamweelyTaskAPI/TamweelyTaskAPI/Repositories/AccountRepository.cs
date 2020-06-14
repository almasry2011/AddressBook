using AutoMapper;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Dto_s;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace TamweelyTaskAPI.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IConfiguration configuration;
        private readonly IMapper _Mapper;

        public AccountRepository(UserManager<AppUser> userManager, IConfiguration configuration, IMapper mapper)
        {
            _userManager = userManager;
            this.configuration = configuration;
            this._Mapper = mapper;
        }
        public async Task<UserForReturnDto> login(AppUser _user, string password)
        {
            var userFromRepo = await _userManager.FindByNameAsync(_user.UserName);
            if (userFromRepo != null && await _userManager.CheckPasswordAsync(userFromRepo, password))
            { 
                var tokenHandler = new JwtSecurityTokenHandler();

                var key = Encoding.ASCII.GetBytes(configuration.GetSection("AppSettings:Secret").Value);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                  {


                      new Claim(JwtRegisteredClaimNames.Sub, _user.UserName),
                      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                      new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                      new Claim(ClaimTypes.Name, userFromRepo.UserName), //error gets fixed
                      new Claim("LoggedOn", DateTime.Now.ToString()),
         
                  }),
                    Issuer = configuration.GetSection("AppSettings:Site").Value,
                    IssuedAt = DateTime.Now,
                    Audience = configuration.GetSection("AppSettings:Audience").Value,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToInt32(configuration.GetSection("AppSettings:ExpireTime").Value)),///   DateTime.UtcNow.AddMinutes(120),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature),
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                return new UserForReturnDto
                {
                    Token = tokenHandler.WriteToken(token),
                    user = _Mapper.Map<UserLiteDto>(userFromRepo),
                  
                 
                };
            }

            return new UserForReturnDto { Token = null };
        }
        public async Task<UserForReturnDto> Register(AppUser _user, string _password)
        {
            var UserForReturn = new UserForReturnDto();
            var res = await _userManager.CreateAsync(_user, _password);
            if (res.Succeeded)
            {
               
                    UserForReturn.user = _Mapper.Map<UserLiteDto>(_user);
                    return UserForReturn;
            }
            UserForReturn.ErrorList = res.Errors;
            return UserForReturn;
        }


    }
}
