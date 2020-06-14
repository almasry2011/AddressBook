using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;

namespace TamweelyTaskAPI.Model
{
    public class AddressBook
    {
        public int Id  { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime  Dob { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }

        public int DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public int TitleId { get; set; }
        public virtual Title Title { get; set; }

    }
}
