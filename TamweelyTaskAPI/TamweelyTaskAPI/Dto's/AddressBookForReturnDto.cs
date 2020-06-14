using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Dto_s
{
    public class AddressBookForReturnDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public string Dob { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int TitleId { get; set; }
        public string TitleName { get; set; }
 
    }
}
