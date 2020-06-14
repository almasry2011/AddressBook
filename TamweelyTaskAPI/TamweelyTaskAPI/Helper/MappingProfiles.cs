using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TamweelyTaskAPI.Data;
using TamweelyTaskAPI.Dto_s;
using TamweelyTaskAPI.Model;

namespace TamweelyTaskAPI.Helper
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<UserDto, AppUser>();
            CreateMap<AppUser, UserLiteDto>().ForMember(dest => dest.UserPicture, src => src.MapFrom(s => s.UserPhoto));
            CreateMap<AddressBook, AddressBookForReturnDto>()
                  .ForMember(dest => dest.DepartmentName, src => src.MapFrom(s => s.Department.DepartmentName))
                  .ForMember(dest => dest.Dob, src => src.MapFrom(s => s.Dob !=null ? s.Dob.ToShortDateString()  : ""   ))
                  .ForMember(dest => dest.Age, src => src.MapFrom(s => DateTime.Now.Year - s.Dob.Year ))
                  .ForMember(dest => dest.TitleName, src => src.MapFrom(s => s.Title.TitleName));
            CreateMap<AddressBookDto, AddressBook>();
            CreateMap<TitleDto, Title>();
            CreateMap<DepartmentDto, Department>();
            CreateMap<Department,DepartmentDto>();
            CreateMap<Title, TitleDto>();

        }
    }

     
}
